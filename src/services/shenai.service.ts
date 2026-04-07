// src/services/shenai.service.ts
import { Alert } from 'react-native';

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
 * Em um cenário real, você importará de '@shen-ai/react-native-sdk' (ou similar)
 */
export const ShenaiSDK = {
  /**
   * Inicializa o SDK do Shen.ai com a API KEY
   */
  initialize: async (apiKey: string): Promise<boolean> => {
    try {
      console.log('Shen.ai: Inicializando com a chave', apiKey);
      // await ShenaiNativeModule.initialize(apiKey);
      return true;
    } catch (e) {
      console.error('Falha ao inicializar Shen.ai', e);
      return false;
    }
  },

  /**
   * Dispara a tela nativa ou o componente de câmera do Shen.ai
   * para uma captura de 30 segundos.
   */
  startScan: async (): Promise<ShenaiScanResult | null> => {
    return new Promise((resolve) => {
      console.log('Shen.ai: Iniciando scan de 30s...');
      
      // MOCK: Simulando o tempo de scan (30s na vida real, acelerado aqui)
      setTimeout(() => {
        // Simulando um resultado positivo de saúde
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
 * Função utilitária que será chamada pela Launch Screen
 */
export async function executeWellnessScan(): Promise<ShenaiScanResult | null> {
  const isReady = await ShenaiSDK.initialize('SUA_SHENAI_API_KEY_AQUI');
  if (!isReady) {
    Alert.alert('Erro', 'Não foi possível inicializar a câmera.');
    return null;
  }
  
  const results = await ShenaiSDK.startScan();
  return results;
}
