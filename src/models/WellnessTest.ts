export interface MetricStatus<T> {
  value: T;
  status: 'normal' | 'attention' | 'warning';
}

export interface WellnessMetrics {
  heartRate: MetricStatus<number>; // value: bpm
  hrv: MetricStatus<number>;       // sdnn: milissegundos
  stressLevel: MetricStatus<number>; // score: 0-100
  respiratoryRate: MetricStatus<number>; // value: rpm
}

export interface WellnessTest {
  id?: string;            // Gerado pelo Firestore
  userId: string;         // Referência ao User
  status: 'pending' | 'completed' | 'failed';
  createdAt: any;         // serverTimestamp() do Firestore ou Date local
  provider: 'shenai' | 'other';
  shenai: {
    measurementId: string;
  };
  rawMetrics: WellnessMetrics;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  createdAt: any;
}
