// src/screens/ScanScreen.tsx — TELA 4: Câmera / Scan
import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { executeWellnessScan } from '../services/shenai.service';
import { ShenaiSdkView } from 'react-native-shenai-sdk';
import Svg, { Path } from 'react-native-svg';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Scan'>;
};

export default function ScanScreen({ navigation }: Props) {
  useEffect(() => {
    let isCancelled = false;

    async function startShenai() {
      const result = await executeWellnessScan();
      if (isCancelled) return;
      if (result) {
        navigation.replace('Loading', { results: result });
      } else {
        // Fallback or cancelled
        navigation.goBack();
      }
    }

    startShenai();

    return () => {
      isCancelled = true;
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 
        A própria ShenaiSdkView vai desenhar o rosto, a máscara e os botões 
        já que showUserInterface = true na inicialização.
      */}
      <ShenaiSdkView style={StyleSheet.absoluteFillObject} />

      {/* Apenas um botão de voltar caso o usuário queira cancelar manualmente antes do SDK */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.75}>
          <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
            <Path d="M11 4L6 9l5 5" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#0C1820' 
  },
  headerRow: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 999,
  },
  backBtn: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
