// src/screens/LoadingScreen.tsx — TELA 5: Processamento / Loading
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors } from '../theme';
import StatusBarRow from '../components/StatusBarRow';
import InnerHeader from '../components/InnerHeader';

type Props = NativeStackScreenProps<RootStackParamList, 'Loading'>;

type StepStatus = 'done' | 'active' | 'wait';

interface Step {
  label: string;
  status: StepStatus;
}

export default function LoadingScreen({ navigation, route }: Props) {
  const spinAnim = useRef(new Animated.Value(0)).current;
  const birdAnim = useRef(new Animated.Value(0)).current;

  const [steps, setSteps] = useState<Step[]>([
    { label: 'Sinais capturados', status: 'done' },
    { label: 'Processamento rPPG', status: 'done' },
    { label: 'Calculando indicadores...', status: 'active' },
    { label: 'Gerando relatório', status: 'wait' },
  ]);

  useEffect(() => {
    // Spinner animation
    const spin = Animated.loop(
      Animated.timing(spinAnim, { toValue: 1, duration: 1100, useNativeDriver: true, easing: Easing.linear })
    );
    spin.start();

    // Bird bob
    const bob = Animated.loop(
      Animated.sequence([
        Animated.timing(birdAnim, { toValue: 1, duration: 850, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(birdAnim, { toValue: 0, duration: 850, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
      ])
    );
    bob.start();

    // Progress steps simulation
    const t1 = setTimeout(() => {
      setSteps(prev => prev.map((s, i) =>
        i === 2 ? { ...s, status: 'done' } :
        i === 3 ? { ...s, status: 'active', label: 'Gerando relatório...' } :
        s
      ));
    }, 1500);

    // Navigate to result
    const t2 = setTimeout(() => {
      spin.stop();
      bob.stop();
      navigation.navigate('Result', { results: route.params.results });
    }, 3500);

    return () => { clearTimeout(t1); clearTimeout(t2); spin.stop(); bob.stop(); };
  }, []);

  const spinDeg = spinAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const birdY = birdAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -6] });
  const birdRot = birdAnim.interpolate({ inputRange: [0, 1], outputRange: ['-4deg', '4deg'] });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarRow time="16:58" />
      <View style={styles.header}>
        <View style={{ width: 36 }} />
        <Text style={styles.headerTitle}>Processando</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.center}>
        {/* Bird + spinner ring */}
        <View style={styles.birdWrap}>
          <Animated.View style={[StyleSheet.absoluteFill, styles.spinnerRing, { transform: [{ rotate: spinDeg }] }]} />
          <Animated.View style={{ transform: [{ translateY: birdY }, { rotate: birdRot }] }}>
            <Svg width={52} height={52} viewBox="0 0 52 52" fill="none">
              <Path d="M26 8C26 8 10 14 10 26a16 16 0 0032 0C42 14 26 8 26 8z" fill={Colors.blue} opacity={0.15} />
              <Path d="M26 8C26 8 10 14 10 26a16 16 0 0032 0C42 14 26 8 26 8z" stroke={Colors.blue} strokeWidth={1.8} fill="none" />
              <Path d="M18 28c2-4 4-6 8-6s6 2 8 6" stroke={Colors.blue} strokeWidth={1.8} strokeLinecap="round" fill="none" />
              <Path d="M10 16C6 12 4 8 8 6s8 0 10 4" stroke={Colors.blue} strokeWidth={1.8} strokeLinecap="round" fill="none" />
              <Path d="M42 16c4-4 6-8 2-10s-8 0-10 4" stroke={Colors.blue} strokeWidth={1.8} strokeLinecap="round" fill="none" />
            </Svg>
          </Animated.View>
        </View>

        <Text style={styles.loadingTitle}>Analisando seus dados</Text>
        <Text style={styles.loadingSub}>
          Calculando seus indicadores de saúde.{'\n'}Isso levará apenas alguns segundos.
        </Text>

        {/* Steps */}
        <View style={styles.stepsList}>
          {steps.map((step, i) => {
            const rowStyle = step.status === 'done' ? styles.stepRow_done
              : step.status === 'active' ? styles.stepRow_active
              : styles.stepRow_wait;
            return (
              <View key={i} style={[styles.stepRow, rowStyle]}>
                <View style={styles.stepIconW}>
                  {step.status === 'done' && (
                    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                      <Circle cx={10} cy={10} r={8} stroke={Colors.green} strokeWidth={1.5} />
                      <Path d="M7 10l2 2 4-4" stroke={Colors.green} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                    </Svg>
                  )}
                  {step.status === 'active' && (
                    <Animated.View style={[styles.miniSpinner, { transform: [{ rotate: spinDeg }] }]} />
                  )}
                  {step.status === 'wait' && (
                    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
                      <Circle cx={10} cy={10} r={8} stroke="#C8C8C8" strokeWidth={1.5} />
                    </Svg>
                  )}
                </View>
                <Text
                  style={[
                    styles.stepTxt,
                    step.status === 'done' && styles.stepTxtDone,
                    step.status === 'active' && styles.stepTxtActive,
                    step.status === 'wait' && styles.stepTxtWait,
                  ]}
                >
                  {step.label}
                </Text>
              </View>
            );
          })}
        </View>

        {/* DYK */}
        <View style={styles.dykBox}>
          <Text style={styles.dykLabel}>VOCÊ SABIA?</Text>
          <Text style={styles.dykText}>
            O estresse elevado pode aumentar o risco cardiovascular. Monitorar regularmente ajuda na prevenção.
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.demoBtn}
        onPress={() => navigation.navigate('Result', { results: route.params.results })}
        activeOpacity={0.8}
      >
        <Text style={styles.demoBtnTxt}>Ver resultado (demo)</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.white },
  header: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 18,
    paddingVertical: 10,
    paddingBottom: 14,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
  },
  headerTitle: { color: 'white', fontWeight: '800' as const, fontSize: 17, flex: 1, textAlign: 'center' as const },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 0,
  },
  birdWrap: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 26,
  },
  spinnerRing: {
    borderRadius: 45,
    borderWidth: 2,
    borderColor: 'rgba(75,164,206,0.18)',
    borderTopColor: Colors.blue,
  },
  loadingTitle: { fontWeight: '900', fontSize: 20, color: Colors.text, marginBottom: 8, textAlign: 'center' },
  loadingSub: { fontSize: 14, color: Colors.textMuted, lineHeight: 22, marginBottom: 24, textAlign: 'center' },
  stepsList: { width: '100%', gap: 8, marginBottom: 22 },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 10,
    padding: 12,
    paddingHorizontal: 16,
  },
  stepRow_done: { backgroundColor: 'rgba(76,175,130,0.08)', borderWidth: 1, borderColor: 'rgba(76,175,130,0.18)' },
  stepRow_active: { backgroundColor: Colors.techNote, borderWidth: 1, borderColor: 'rgba(75,164,206,0.2)' },
  stepRow_wait: { backgroundColor: '#F6F6F8', opacity: 0.45 },
  stepIconW: { width: 28, height: 28, alignItems: 'center', justifyContent: 'center' },
  miniSpinner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgba(75,164,206,0.3)',
    borderTopColor: Colors.blue,
  },
  stepTxt: { flex: 1, fontWeight: '700', fontSize: 13, color: Colors.text },
  stepTxtDone: { color: Colors.green },
  stepTxtActive: { color: Colors.blueDark },
  stepTxtWait: { color: Colors.textMuted },
  dykBox: {
    width: '100%',
    backgroundColor: '#F6F6F8',
    borderRadius: 10,
    padding: 14,
    paddingHorizontal: 16,
    borderLeftWidth: 3,
    borderLeftColor: Colors.blue,
  },
  dykLabel: { fontWeight: '800', fontSize: 11, color: Colors.blue, letterSpacing: 0.8, marginBottom: 5 },
  dykText: { fontSize: 13, color: Colors.textSub, lineHeight: 21 },
  demoBtn: {
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center',
    backgroundColor: Colors.bg,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 99,
  },
  demoBtnTxt: { fontSize: 12, fontWeight: '700', color: Colors.textMuted },
});
