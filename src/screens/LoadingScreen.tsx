import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView, Platform, DeviceEventEmitter, NativeEventEmitter, NativeModules, ActivityIndicator, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { ShenaiSdkView, getMeasurementResults } from 'react-native-shenai-sdk';
import { initializeShenAI, saveShenaiResultToFirebase } from '../services/shenai.service';
import { Colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

const { ShenaiSdkNativeModule } = NativeModules;
const shenaiEmitter = Platform.OS === 'ios' ? new NativeEventEmitter(ShenaiSdkNativeModule) : DeviceEventEmitter;

export default function LoadingScreen({ navigation }: Props) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // 1. Inicializar o Motor da Shen.ai
    initializeShenAI().then((success) => {
      if (success) {
        setIsReady(true);
      } else {
        setError('Falha ao inicializar a câmera inteligente.');
      }
    });

    // 2. Escutar eventos do motor Nativo (C++)
    const subscription = shenaiEmitter.addListener('ShenAIEvent', async (event) => {
      if (event.EventName === 'MEASUREMENT_FINISHED') {
        console.log('Shen.ai: Medição Finalizada!');
        
        // Puxar os resultados da memória nativa
        const results = await getMeasurementResults();
        
        if (results) {
          // Salvar no Firebase
          const savedData = await saveShenaiResultToFirebase(results);
          if (savedData) {
            // Ir para tela de resultado
            navigation.navigate('Result', { results: savedData });
          }
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </SafeAreaView>
    );
  }

  if (!isReady) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color={Colors.blue} />
        <Text style={{ marginTop: 10 }}>Carregando motor de Inteligência Artificial...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* O Componente Nativo que roda a Câmera e o Algoritmo */}
      <ShenaiSdkView style={StyleSheet.absoluteFillObject} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg
  }
});

