// src/screens/IntroScreen.tsx — TELA 1: Introdução Wellness Test
import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors, cardShadow } from '../theme';
import StatusBarRow from '../components/StatusBarRow';
import InnerHeader from '../components/InnerHeader';
import CTABar from '../components/CTABar';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Intro'>;
};

function BenefitCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <View style={styles.simpleCard}>
      <View style={styles.simpleCardRow}>
        <View style={styles.simpleCardIcon}>{icon}</View>
        <View style={styles.simpleCardText}>
          <Text style={styles.simpleCardTitle}>{title}</Text>
          <Text style={styles.simpleCardDesc}>{desc}</Text>
        </View>
      </View>
    </View>
  );
}

export default function IntroScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarRow time="16:56" />
      <InnerHeader title="Teste de Saúde Rápido" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.pageIntro}>
          <Text style={styles.pageTitle}>Em 30 segundos você descobre</Text>
          <Text style={styles.pageDesc}>
            Utilize a câmera do celular para verificar seus indicadores de saúde. Sem equipamentos, sem contato.
          </Text>
        </View>

        <View style={{ gap: 0 }}>
          <BenefitCard
            icon={
              <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
                <Path d="M15 5C15 5 6 9 6 17a9 9 0 0018 0C24 9 15 5 15 5z" stroke={Colors.blue} strokeWidth={1.8} fill="none" />
                <Path d="M9 18h3l2-5 3 8 2-5 2 2h2" stroke={Colors.blue} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </Svg>
            }
            title="Frequência Cardíaca"
            desc="Medida em batimentos por minuto via câmera frontal"
          />

          <BenefitCard
            icon={
              <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
                <Path d="M15 4a11 11 0 100 22A11 11 0 0015 4z" stroke={Colors.blue} strokeWidth={1.8} fill="none" />
                <Path d="M10 17s1-4 5-4 5 4 5 4" stroke={Colors.blue} strokeWidth={1.6} strokeLinecap="round" fill="none" />
                <Circle cx={11.5} cy={13} r={1.2} fill={Colors.blue} />
                <Circle cx={18.5} cy={13} r={1.2} fill={Colors.blue} />
              </Svg>
            }
            title="Nível de Estresse"
            desc="Análise da variabilidade da frequência cardíaca (HRV)"
          />

          <BenefitCard
            icon={
              <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
                <Rect x={4} y={4} width={22} height={22} rx={3} stroke={Colors.blue} strokeWidth={1.8} fill="none" />
                <Path d="M8 20l4-7 4 4 3-5 3 3" stroke={Colors.blue} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </Svg>
            }
            title="Indicadores Gerais"
            desc="Wellness Score e painel completo de bem-estar"
          />
        </View>

        {/* Badge de tempo */}
        <View style={styles.timeBadge}>
          <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
            <Circle cx={11} cy={11} r={9} stroke={Colors.blue} strokeWidth={1.8} />
            <Path d="M11 5v7l3 2" stroke={Colors.blue} strokeWidth={1.8} strokeLinecap="round" />
          </Svg>
          <Text style={styles.timeBadgeText}>
            Tempo médio: <Text style={styles.timeBadgeBold}>30 segundos</Text>
          </Text>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <CTABar
        mainLabel="Começar Teste"
        onMain={() => navigation.navigate('Consent')}
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
  simpleCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    ...cardShadow,
    padding: 16,
    paddingHorizontal: 18,
    marginHorizontal: 14,
    marginBottom: 10,
  },
  simpleCardRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  simpleCardIcon: { width: 42, height: 42, alignItems: 'center', justifyContent: 'center' },
  simpleCardText: { flex: 1 },
  simpleCardTitle: { fontWeight: '800', fontSize: 15, color: Colors.text, marginBottom: 3 },
  simpleCardDesc: { fontSize: 13, color: Colors.textSub, lineHeight: 18 },
  timeBadge: {
    marginHorizontal: 14,
    marginTop: 6,
    backgroundColor: Colors.white,
    borderRadius: 10,
    ...cardShadow,
    padding: 13,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeBadgeText: { fontWeight: '700', fontSize: 14, color: Colors.textSub },
  timeBadgeBold: { fontWeight: '800', color: Colors.text },
});
