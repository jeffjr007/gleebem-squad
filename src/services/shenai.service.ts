import { Alert } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

import { initialize, InitializationResult, getMeasurementResults, ShenaiSdkView } from 'react-native-shenai-sdk';

/**
 * Interface padronizada do resultado do Shen.ai
 */
export interface ShenaiScanResult {
  heartRate: number;
  hrvTotal: number;
  stressScore: number;
  respiratoryRate: number;
  measurementId: string;
}

/**
 * Inicializa o SDK usando a API Key configurada no .env
 */
export async function initializeShenAI(): Promise<boolean> {
  const apiKey = process.env.EXPO_PUBLIC_SHENAI_API_KEY || '';
  if (!apiKey) {
    console.error('API Key da Shen.ai não encontrada no .env');
    return false;
  }

  const userId = 'user_demo_gleebem_123';
  
  try {
    const result = await initialize(apiKey, userId, {
      showUserInterface: true, // Mostra a interface embutida (A máscara e os botões de controle)
      enableStartAfterSuccess: true,
      enableSummaryScreen: false // Não mostra o summary deles, nós temos nossa própria tela de Resultado
    });

    if (result === InitializationResult.OK) {
      console.log('✅ Shen.ai SDK Inicializado com Sucesso!');
      const { setLanguage, setCustomColorTheme } = require('react-native-shenai-sdk');
      
      try {
        await setLanguage('pt');
        await setCustomColorTheme({
          themeColor: '#4BA4CE',
          textColor: '#FFFFFF',
          backgroundColor: '#0C1820',
          tileColor: '#0F2030',
          buttonMainColor: '#FFFFFF',
          buttonSecondaryColor: '#0F2030'
        });
      } catch (e) {
        console.warn('Erro ao aplicar tema/idioma:', e);
      }

      return true;
    } else {
      console.error('Falha ao inicializar o SDK. Código de Erro:', result);
      return false;
    }
  } catch (err) {
    console.error('Erro na chamada nativa do SDK:', err);
    return false;
  }
}

import { PermissionsAndroid, Platform } from 'react-native';

/**
 * Pede permissão e inicia a medição (executeWellnessScan)
 */
export async function executeWellnessScan(): Promise<ShenaiScanResult | null> {
  // 1. Pedir permissão de Câmera (Android)
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Permissão de Câmera",
        message: "O aplicativo precisa de acesso à câmera para medir seus sinais vitais.",
        buttonNeutral: "Perguntar depois",
        buttonNegative: "Cancelar",
        buttonPositive: "OK"
      }
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.warn("Permissão de câmera negada");
      return null;
    }
  }

  // 2. Inicializar o SDK
  const isInit = await initializeShenAI();
  if (!isInit) return null;

  // Chama o SDK nativo
  const { startMeasurement, getMeasurementResults, getMeasurementState } = require('react-native-shenai-sdk');
  await startMeasurement();

  // Polling para aguardar o fim da medição com dados 100% reais do SDK
  return new Promise(resolve => {
    const interval = setInterval(async () => {
      try {
        const state = await getMeasurementState();
        
        // MeasurementState.FINISHED = 7
        if (state === 7) {
          clearInterval(interval);
          const results = await getMeasurementResults();
          if (results) {
            const final = await saveShenaiResultToFirebase(results);
            resolve(final);
          } else {
            resolve(null); // Falha ao ler resultados
          }
        } 
        // MeasurementState.FAILED = 8
        else if (state === 8) {
          clearInterval(interval);
          resolve(null); // Medição falhou ou foi cancelada
        }
      } catch (e) {
        clearInterval(interval);
        resolve(null);
      }
    }, 1000);
  });
}

/**
 * Salva o resultado final no Firebase após a captura
 */
export async function saveShenaiResultToFirebase(results: any): Promise<ShenaiScanResult | null> {
  try {
    const userId = 'user_demo_gleebem_123';
    const testsCollectionRef = collection(db, 'users', userId, 'wellness_tests');
    
    // Convertendo os dados que vêm do SDK nativo para nossa interface
    const hr = results.heartRateBpm || 0;
    const hrv = results.hrvSdnnMs || 0;
    const stress = results.stressIndex || 0;
    const br = results.breathingRateBpm || 0;

    const newDoc = await addDoc(testsCollectionRef, {
      userId,
      status: 'completed',
      createdAt: serverTimestamp(),
      provider: 'shenai',
      shenai: {
        measurementId: 'real_scan',
      },
      rawMetrics: {
        heartRate: { value: hr, status: hr > 60 && hr < 100 ? 'normal' : 'attention' },
        hrv: { sdnn: hrv, status: 'normal' },
        stressLevel: { score: stress, status: stress > 70 ? 'attention' : 'normal' },
        respiratoryRate: { value: br, status: 'normal' }
      }
    });

    console.log('✅ Resultado salvo com SUCESSO no Firestore! ID Documento:', newDoc.id);
    return {
      heartRate: hr,
      hrvTotal: hrv,
      stressScore: stress,
      respiratoryRate: br,
      measurementId: newDoc.id
    };
  } catch (err: any) {
    console.error('Erro ao salvar no Firestore:', err.message);
    // Retorna os dados localmente mesmo se o Firebase falhar
    const hr = results.heartRateBpm || 0;
    const hrv = results.hrvSdnnMs || 0;
    const stress = results.stressIndex || 0;
    const br = results.breathingRateBpm || 0;
    
    return {
      heartRate: hr,
      hrvTotal: hrv,
      stressScore: stress,
      respiratoryRate: br,
      measurementId: 'offline_scan'
    };
  }
}

