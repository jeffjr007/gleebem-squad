// src/screens/ResultScreen.tsx — TELA 6: Resultado
import React, { useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, Animated } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors, cardShadow } from '../theme';
import StatusBarRow from '../components/StatusBarRow';
import CTABar from '../components/CTABar';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

function MetricCard({
  title,
  value,
  unit,
  status,
  statusType,
}: {
  title: string;
  value: string;
  unit?: string;
  status: string;
  statusType: 'ok' | 'warn';
}) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricTitle}>{title}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
        <Text style={[styles.metricVal, !unit && { fontSize: 18 }]}>{value}</Text>
        {unit && <Text style={styles.metricUnit}>{unit}</Text>}
      </View>
      <View style={[styles.statusPill, statusType === 'ok' ? styles.pillOk : styles.pillWarn]}>
        <Text style={[styles.pillTxt, statusType === 'ok' ? styles.pillTxtOk : styles.pillTxtWarn]}>
          {status}
        </Text>
      </View>
    </View>
  );
}

export default function ResultScreen({ navigation, route }: Props) {
  const { results } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarRow time="16:59" />
      {/* Result header (azul) */}
      <View style={styles.resultHeader}>
        <Text style={styles.resultH2}>Seu Resultado</Text>
        <Text style={styles.resultSub}>Teste realizado hoje</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Wellness Score */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Wellness Score</Text>
          <Text style={styles.scoreSubLabel}>Pontuação de Bem-Estar Geral</Text>
          <View style={styles.scoreRingArea}>
            <Svg width={130} height={130} viewBox="0 0 130 130">
              <Circle cx={65} cy={65} r={56} fill="none" stroke="#EBF4FA" strokeWidth={9} />
              <Circle
                cx={65}
                cy={65}
                r={56}
                fill="none"
                stroke={Colors.blue}
                strokeWidth={9}
                strokeLinecap="round"
                strokeDasharray={352}
                strokeDashoffset={68}
                transform="rotate(-90 65 65)"
              />
            </Svg>
            <View style={styles.scoreNumArea}>
              <Text style={styles.scoreBig}>82</Text>
              <Text style={styles.scoreOf}>/100</Text>
            </View>
          </View>
          <View style={styles.scoreBadge}>
            <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <Path d="M7 1l1.5 3.5L13 5l-3 3 .7 4L7 10l-3.7 2 .7-4L1 5l4.5-.5L7 1z" stroke="#3DA870" strokeWidth={1.2} strokeLinejoin="round" fill="none" />
            </Svg>
            <Text style={styles.scoreBadgeTxt}>Bom estado de saúde</Text>
          </View>
        </View>

        {/* Métricas 2×2 */}
        <View style={styles.metricsRow}>
          <MetricCard title="Freq. Cardíaca" value={results.heartRate.toString()} unit="bpm" status="Normal" statusType="ok" />
          <MetricCard title="Variab. Cardíaca" value={results.hrvTotal.toString()} unit="ms" status="Normal" statusType="ok" />
          <MetricCard title="Nível de Estresse" value={results.stressScore > 55 ? 'Alto' : results.stressScore > 35 ? 'Médio' : 'Baixo'} status={results.stressScore > 55 ? 'Atenção' : 'Normal'} statusType={results.stressScore > 55 ? 'warn' : 'ok'} />
          <MetricCard title="Respiração" value={results.respiratoryRate.toString()} unit="rpm" status="Normal" statusType="ok" />
        </View>

        {/* Gauge estresse */}
        <View style={styles.gaugeCard}>
          <Text style={styles.gaugeTitle}>Nível de Estresse</Text>
          <View style={styles.gaugeTrack}>
            <View style={[styles.gaugeFill, { width: `${results.stressScore}%` }]} />
          </View>
          <View style={styles.gaugeFooter}>
            <Text style={styles.gaugeLbl}>Baixo</Text>
            <Text style={[styles.gaugeLbl, { color: Colors.blueDark, fontWeight: '800' }]}>Moderado</Text>
            <Text style={styles.gaugeLbl}>Alto</Text>
          </View>
        </View>

        <View style={{ height: 72 }} />
      </ScrollView>

      <CTABar
        mainLabel="Ver Recomendações"
        onMain={() => navigation.navigate('Recommendations', { results })}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  resultHeader: {
    backgroundColor: Colors.blue,
    padding: 16,
    paddingHorizontal: 18,
    paddingBottom: 18,
  },
  resultH2: { color: 'white', fontWeight: '900', fontSize: 19 },
  resultSub: { color: 'rgba(255,255,255,0.75)', fontSize: 13, marginTop: 2 },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  // Score card
  scoreCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    ...cardShadow,
    margin: 14,
    marginBottom: 10,
    padding: 20,
    paddingHorizontal: 18,
    alignItems: 'center',
  },
  scoreLabel: { fontWeight: '800', fontSize: 15, color: Colors.text, marginBottom: 2 },
  scoreSubLabel: { fontSize: 12, color: Colors.textMuted, marginBottom: 14 },
  scoreRingArea: {
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  scoreNumArea: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
  } as any,
  scoreBig: { fontWeight: '900', fontSize: 38, color: Colors.text, lineHeight: 42 },
  scoreOf: { fontSize: 13, color: Colors.textMuted, fontWeight: '700' },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(76,175,130,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(76,175,130,0.2)',
    paddingVertical: 5,
    paddingHorizontal: 13,
    borderRadius: 99,
    marginTop: 10,
  },
  scoreBadgeTxt: { fontWeight: '800', fontSize: 12, color: '#3DA870' },

  // Metrics grid
  metricsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginHorizontal: 14,
    marginBottom: 10,
  },
  metricCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    ...cardShadow,
    padding: 14,
    paddingHorizontal: 16,
    width: '47%',
  },
  metricTitle: { fontWeight: '700', fontSize: 11, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  metricVal: { fontWeight: '900', fontSize: 22, color: Colors.text, lineHeight: 24 },
  metricUnit: { fontSize: 11, color: Colors.textMuted, fontWeight: '700' },
  statusPill: { marginTop: 6, alignSelf: 'flex-start', paddingVertical: 3, paddingHorizontal: 8, borderRadius: 99 },
  pillOk: { backgroundColor: 'rgba(76,175,130,0.1)' },
  pillWarn: { backgroundColor: 'rgba(245,166,35,0.1)' },
  pillTxt: { fontWeight: '800', fontSize: 11 },
  pillTxtOk: { color: '#3DA870' },
  pillTxtWarn: { color: '#C88800' },

  // Gauge
  gaugeCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    ...cardShadow,
    marginHorizontal: 14,
    marginBottom: 10,
    padding: 16,
    paddingHorizontal: 18,
  },
  gaugeTitle: { fontWeight: '800', fontSize: 14, color: Colors.text, marginBottom: 12 },
  gaugeTrack: { height: 10, backgroundColor: Colors.bg, borderRadius: 99, overflow: 'hidden', marginBottom: 6 },
  gaugeFill: {
    width: '55%',
    height: '100%',
    borderRadius: 99,
    backgroundColor: Colors.orange,
  },
  gaugeFooter: { flexDirection: 'row', justifyContent: 'space-between' },
  gaugeLbl: { fontSize: 11, color: Colors.textMuted, fontWeight: '700' },
});
