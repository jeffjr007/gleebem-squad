// src/screens/PreparationScreen.tsx — TELA 3: Preparação do Ambiente
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Animated } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors, cardShadow } from '../theme';
import StatusBarRow from '../components/StatusBarRow';
import InnerHeader from '../components/InnerHeader';
import CTABar from '../components/CTABar';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Preparation'>;
};

function OkIcon({ color = Colors.green }: { color?: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Circle cx={10} cy={10} r={8} stroke={color} strokeWidth={1.6} />
      <Path d="M7 10l2 2 4-4" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PendingIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
      <Circle cx={10} cy={10} r={8} stroke="#C8C8C8" strokeWidth={1.6} />
      <Path d="M10 6v5l3 2" stroke="#C8C8C8" strokeWidth={1.6} strokeLinecap="round" />
    </Svg>
  );
}

interface CheckItemProps {
  ok: boolean;
  title: string;
  desc: string;
}

function CheckItem({ ok, title, desc }: CheckItemProps) {
  return (
    <View
      style={[
        styles.checkItem,
        ok ? styles.checkItemOk : styles.checkItemPending,
      ]}
    >
      <View style={[styles.checkDot, ok ? styles.dotOk : styles.dotPending]}>
        {ok ? <OkIcon /> : <PendingIcon />}
      </View>
      <View style={styles.checkBody}>
        <Text style={styles.checkTitle}>{title}</Text>
        <Text style={styles.checkDesc}>{desc}</Text>
      </View>
      <View style={styles.checkTail}>
        {ok ? <OkIcon /> : <Svg width={20} height={20} viewBox="0 0 20 20" fill="none"><Circle cx={10} cy={10} r={8} stroke="#C8C8C8" strokeWidth={1.5} /></Svg>}
      </View>
    </View>
  );
}

export default function PreparationScreen({ navigation }: Props) {
  const [faceDetected, setFaceDetected] = useState(false);
  const [stable, setStable] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFaceDetected(true), 1800);
    const t2 = setTimeout(() => setStable(true), 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarRow time="16:57" />
      <InnerHeader title="Preparar Ambiente" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.pageIntro}>
          <Text style={styles.pageTitle}>Verificando condições</Text>
          <Text style={styles.pageDesc}>Confirme os itens abaixo antes de iniciar o scan.</Text>
        </View>

        <View style={styles.checkCard}>
          <CheckItem ok title="Iluminação" desc="Ambiente bem iluminado detectado" />
          <View style={styles.divider} />
          <CheckItem ok title="Conexão" desc="Internet estável disponível" />
          <View style={styles.divider} />
          <CheckItem
            ok={faceDetected}
            title="Detecção de rosto"
            desc={faceDetected ? 'Rosto detectado e centralizado' : 'Posicione seu rosto no centro da tela'}
          />
          <View style={styles.divider} />
          <CheckItem
            ok={stable}
            title="Estabilidade"
            desc={stable ? 'Dispositivo estável' : 'Segure o celular firme e fique imóvel'}
          />
        </View>

        {/* Dicas */}
        <View style={styles.tipsCard}>
          <Text style={styles.tipsTitle}>Dicas para um bom resultado</Text>
          <Text style={styles.tipsText}>
            {'• Olhe diretamente para a câmera\n• Mantenha o rosto centralizado\n• Fique imóvel por 30 segundos\n• Evite luz direta nos olhos'}
          </Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <CTABar
        mainLabel="Tudo Pronto — Iniciar Scan"
        onMain={() => navigation.navigate('Scan')}
        ghostLabel="Cancelar"
        onGhost={() => navigation.navigate('Home')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  pageIntro: { padding: 20, paddingBottom: 10 },
  pageTitle: { fontWeight: '900', fontSize: 20, color: Colors.text, marginBottom: 6 },
  pageDesc: { fontSize: 14, color: Colors.textSub, lineHeight: 22 },
  checkCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    ...cardShadow,
    marginHorizontal: 14,
    overflow: 'hidden',
  },
  checkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 15,
    paddingHorizontal: 18,
  },
  checkItemOk: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.green,
  },
  checkItemPending: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.border,
  },
  checkDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dotOk: { backgroundColor: 'rgba(76,175,130,0.12)' },
  dotPending: { backgroundColor: Colors.bg },
  checkBody: { flex: 1 },
  checkTitle: { fontWeight: '800', fontSize: 14, color: Colors.text, marginBottom: 2 },
  checkDesc: { fontSize: 12, color: Colors.textMuted },
  checkTail: { marginLeft: 'auto' },
  divider: { height: 1, backgroundColor: Colors.border },
  tipsCard: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...cardShadow,
    padding: 14,
    paddingHorizontal: 18,
    marginHorizontal: 14,
    marginTop: 10,
  },
  tipsTitle: { fontWeight: '800', fontSize: 13, color: Colors.text, marginBottom: 8 },
  tipsText: { fontSize: 13, color: Colors.textSub, lineHeight: 24 },
});
