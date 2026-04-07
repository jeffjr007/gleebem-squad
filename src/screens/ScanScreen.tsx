// src/screens/ScanScreen.tsx — TELA 4: Câmera / Scan
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
import Svg, { Path, Ellipse } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors } from '../theme';
import { executeWellnessScan } from '../services/shenai.service';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Scan'>;
};

export default function ScanScreen({ navigation }: Props) {
  const [secondsLeft, setSecondsLeft] = useState(30);
  const [progress, setProgress] = useState(0);
  const scanLineAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let isCancelled = false;

    // Scan line animation
    const loopAnim = Animated.loop(
      Animated.sequence([
        Animated.timing(scanLineAnim, { toValue: 1, duration: 2200, useNativeDriver: true, easing: Easing.inOut(Easing.ease) }),
        Animated.timing(scanLineAnim, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    );
    loopAnim.start();

    // Inicia integração com Shen.ai 
    async function startShenai() {
      const result = await executeWellnessScan();
      if (isCancelled) return;
      if (result) {
        // Envia para loading
        navigation.replace('Loading');
      } else {
        // Fallback em caso de falha da permissao/câmera
        navigation.goBack();
      }
    }

    startShenai();

    // Timer visual apenas para a UI
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
      setProgress(prev => Math.min(prev + (1 / 30), 1));
    }, 1000);

    return () => {
      isCancelled = true;
      clearInterval(interval);
      loopAnim.stop();
    };
  }, []);

  const scanLineY = scanLineAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [16, 260],
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Status bar */}
      <View style={styles.sb}>
        <Text style={styles.sbTime}>16:58</Text>
      </View>

      {/* Back / title row */}
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()} activeOpacity={0.75}>
          <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
            <Path d="M11 4L6 9l5 5" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Captura em andamento</Text>
      </View>

      {/* Scan area */}
      <View style={styles.scanArea}>
        {/* Oval frame */}
        <View style={styles.ovalWrap}>
          <View style={styles.ovalFrame}>
            <Svg width={100} height={100} viewBox="0 0 100 100" fill="none">
              <Ellipse cx={50} cy={38} rx={22} ry={26} stroke="rgba(255,255,255,0.35)" strokeWidth={1.5} />
              <Path d="M16 90c0-18 15-30 34-30s34 12 34 30" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} strokeLinecap="round" />
            </Svg>
            {/* Animated scan line */}
            <Animated.View
              style={[
                styles.scanLine,
                { transform: [{ translateY: scanLineY }] },
              ]}
            />
          </View>
          {/* Corner marks */}
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
        </View>

        {/* Label */}
        <View style={styles.scanLabel}>
          <Text style={styles.scanLabelH}>Posicione seu rosto aqui</Text>
          <Text style={styles.scanLabelP}>Mantenha-se imóvel durante o scan</Text>
        </View>

        {/* Progress */}
        <View style={styles.progressWrap}>
          <View style={styles.progRow}>
            <Text style={styles.progLabel}>Progresso</Text>
            <Text style={styles.progTime}>{secondsLeft}s</Text>
          </View>
          <View style={styles.progBg}>
            <View style={[styles.progFill, { width: `${progress * 100}%` as any }]} />
          </View>
        </View>

        {/* Chips */}
        <View style={styles.chipsRow}>
          <View style={[styles.chip, styles.chipOk]}>
            <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
              <Path d="M2 6l3 3 5-5" stroke="#5DD6A0" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
            <Text style={styles.chipOkTxt}>Rosto detectado</Text>
          </View>
          <View style={[styles.chip, styles.chipOk]}>
            <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
              <Path d="M2 6l3 3 5-5" stroke="#5DD6A0" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
            <Text style={styles.chipOkTxt}>Boa iluminação</Text>
          </View>
          <View style={[styles.chip, styles.chipWarn]}>
            <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
              <Path d="M6 2v5M6 9v1" stroke="#F5A623" strokeWidth={1.5} strokeLinecap="round" />
            </Svg>
            <Text style={styles.chipWarnTxt}>Fique imóvel</Text>
          </View>
        </View>
      </View>

      {/* Cancel */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Text style={styles.cancelTxt}>Cancelar scan</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0C1820' },
  sb: {
    height: 44,
    paddingTop: 10,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sbTime: { fontWeight: '800', fontSize: 15, color: 'rgba(255,255,255,0.8)' },
  headerRow: {
    paddingHorizontal: 18,
    paddingVertical: 6,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { color: 'white', fontWeight: '800', fontSize: 16 },
  scanArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 22,
  },
  ovalWrap: { position: 'relative', width: 220, height: 280 },
  ovalFrame: {
    width: 220,
    height: 280,
    borderRadius: 110,
    borderWidth: 2.5,
    borderColor: Colors.blue,
    backgroundColor: '#0F2030',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  scanLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: 'transparent',
    borderRadius: 1,
    // gradient effect via shadow
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 6,
    opacity: 0.85,
    // Use a solid color as fallback
    borderTopWidth: 2,
    borderTopColor: Colors.blue,
  },
  corner: {
    position: 'absolute',
    width: 18,
    height: 18,
  },
  cornerTL: { top: 6, left: 6, borderTopWidth: 2.5, borderLeftWidth: 2.5, borderColor: Colors.blue, borderRadius: 3 },
  cornerTR: { top: 6, right: 6, borderTopWidth: 2.5, borderRightWidth: 2.5, borderColor: Colors.blue, borderRadius: 3 },
  cornerBL: { bottom: 6, left: 6, borderBottomWidth: 2.5, borderLeftWidth: 2.5, borderColor: Colors.blue, borderRadius: 3 },
  cornerBR: { bottom: 6, right: 6, borderBottomWidth: 2.5, borderRightWidth: 2.5, borderColor: Colors.blue, borderRadius: 3 },
  scanLabel: { alignItems: 'center' },
  scanLabelH: { color: 'white', fontWeight: '800', fontSize: 16, marginBottom: 4 },
  scanLabelP: { color: 'rgba(255,255,255,0.5)', fontSize: 13 },
  progressWrap: { width: '100%' },
  progRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 7 },
  progLabel: { fontWeight: '700', fontSize: 12, color: 'rgba(255,255,255,0.45)' },
  progTime: { color: Colors.blue, fontSize: 14, fontWeight: '800' },
  progBg: { height: 5, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 99, overflow: 'hidden' },
  progFill: { height: '100%', backgroundColor: Colors.blue, borderRadius: 99 },
  chipsRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap', justifyContent: 'center' },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 13,
    borderRadius: 99,
    fontWeight: '700',
    fontSize: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  chipOk: { backgroundColor: 'rgba(76,175,130,0.14)', borderWidth: 1, borderColor: 'rgba(76,175,130,0.25)' },
  chipOkTxt: { color: '#5DD6A0', fontWeight: '700', fontSize: 12 },
  chipWarn: { backgroundColor: 'rgba(245,166,35,0.14)', borderWidth: 1, borderColor: 'rgba(245,166,35,0.25)' },
  chipWarnTxt: { color: '#F5A623', fontWeight: '700', fontSize: 12 },
  footer: { paddingBottom: 30, alignItems: 'center' },
  cancelTxt: { color: 'rgba(255,255,255,0.3)', fontWeight: '700', fontSize: 13, textDecorationLine: 'underline' },
});
