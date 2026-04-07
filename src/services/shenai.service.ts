import { Alert } from 'react-native';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Interface simulando os resultados que o Shen.ai retorna
 */
export interface ShenaiScanResult {
  heartRate: number;
  hrvTotal: number; // Variabilidade cardíaca (ms)
  stressScore: number; // 0-100
  respiratoryRate: number;
  measurementId: string;
}

/**
 * Interface simulando o módulo nativo do Shen.ai SDK
 */
export const ShenaiSDK = {
  initialize: async (apiKey: string): Promise<boolean> => {
    try {
      console.log('Shen.ai: Inicializando com a chave', apiKey);
      return true;
    } catch (e) {
      console.error('Falha ao inicializar Shen.ai', e);
      return false;
    }
  },

  startScan: async (): Promise<ShenaiScanResult | null> => {
    return new Promise((resolve) => {
      console.log('Shen.ai: Iniciando scan de 30s...');
      setTimeout(() => {
        resolve({
          heartRate: 72,
          hrvTotal: 48,
          stressScore: 55, // Nível médio
          respiratoryRate: 16,
          measurementId: `shenai_meas_${Date.now()}`
        });
      }, 3000); 
    });
  }
};

/**
 * Executa o Scan e já salva o resultado real no Firebase
 */
export async function executeWellnessScan(): Promise<ShenaiScanResult | null> {
  const apiKey = process.env.EXPO_PUBLIC_SHENAI_API_KEY || 'SUA_SHENAI_API_KEY_AQUI';
  const isReady = await ShenaiSDK.initialize(apiKey);
  if (!isReady) {
    Alert.alert('Erro', 'Não foi possível inicializar a câmera.');
    return null;
  }
  
  const results = await ShenaiSDK.startScan();

  if (results) {
    try {
      // Cria a coleção em runtime caso ela não exista ainda, ligada a um usuário Hardcoded (demo)
      const userId = 'user_demo_gleebem_123';
      
      const testsCollectionRef = collection(db, 'users', userId, 'wellness_tests');
      
      const newDoc = await addDoc(testsCollectionRef, {
        userId,
        status: 'completed',
        createdAt: serverTimestamp(),
        provider: 'shenai',
        shenai: {
          measurementId: results.measurementId,
        },
        rawMetrics: {
          heartRate: { value: results.heartRate, status: 'normal' },
          hrv: { sdnn: results.hrvTotal, status: 'attention' },
          stressLevel: { score: results.stressScore, status: 'attention' },
          respiratoryRate: { value: results.respiratoryRate, status: 'normal' }
        }
      });
      console.log('✅ Resultado salvo com SUCESSO no Firestore! ID Documento:', newDoc.id);
    } catch (err: any) {
      console.error('Erro ao salvar no Firestore:', err.message);
    }
  }

  return results;
}
