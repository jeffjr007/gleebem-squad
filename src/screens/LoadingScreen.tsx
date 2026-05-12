import React, { useEffect } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

export default function LoadingScreen({ navigation, route }: Props) {
  const { results } = route.params;

  useEffect(() => {
    // Apenas simula um tempo de processamento para melhor experiência do usuário (UX)
    // Uma vez que a captura e o salvamento já foram feitos pela ScanScreen
    const timer = setTimeout(() => {
      navigation.replace('Result', { results });
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation, results]);

  return (
    <SafeAreaView style={styles.center}>
      <ActivityIndicator size="large" color={Colors.blue} />
      <Text style={styles.text}>Processando seus sinais vitais...</Text>
      <Text style={styles.subText}>Isto pode levar alguns segundos</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.bg,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
  },
  subText: {
    marginTop: 6,
    fontSize: 13,
    color: Colors.textMuted,
  }
});
