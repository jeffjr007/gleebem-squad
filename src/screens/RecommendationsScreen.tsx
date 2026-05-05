// src/screens/RecommendationsScreen.tsx — TELA 7: Recomendações
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors, cardShadow } from '../theme';
import StatusBarRow from '../components/StatusBarRow';
import InnerHeader from '../components/InnerHeader';
import CTABar from '../components/CTABar';

type Props = NativeStackScreenProps<RootStackParamList, 'Recommendations'>;

export default function RecommendationsScreen({ navigation, route }: Props) {
  const { results } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarRow time="16:59" />
      <InnerHeader title="Recomendações" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.pageIntro}>
          <Text style={styles.pageDesc}>Com base no seu resultado de hoje</Text>
        </View>

        {/* Alert strip - apenas se o estresse for moderado/alto */}
        {results.stressScore >= 50 && (
          <View style={styles.alertStrip}>
            <Svg width={22} height={22} viewBox="0 0 22 22" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <Path d="M11 2L2 19h18L11 2z" stroke="#EA7552" strokeWidth={1.8} strokeLinejoin="round" fill="none" />
              <Path d="M11 9v5M11 16v1" stroke="#EA7552" strokeWidth={1.8} strokeLinecap="round" />
            </Svg>
            <View style={{ flex: 1 }}>
              <Text style={styles.alertTitle}>Nível de Estresse Elevado</Text>
              <Text style={styles.alertDesc}>
                Seu HRV indica estresse moderado ({results.hrvTotal}ms). Considere as ações abaixo para melhorar seu bem-estar.
              </Text>
            </View>
          </View>
        )}



        {/* Rec Card 2: Exercícios respiratórios */}
        <View style={styles.recCard}>
          <View style={styles.recCardHeader}>
            <View style={[styles.recCardIconWrap, { backgroundColor: '#F0FBF5' }]}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Circle cx={12} cy={12} r={9} stroke={Colors.green} strokeWidth={1.8} />
                <Path d="M12 7v6l3 2" stroke={Colors.green} strokeWidth={1.8} strokeLinecap="round" />
                <Path d="M7 12c0-2.8 2.2-5 5-5" stroke={Colors.green} strokeWidth={1.4} strokeLinecap="round" strokeDasharray="2 2" />
              </Svg>
            </View>
            <Text style={styles.recCardTitle}>Exercícios Respiratórios</Text>
            <View style={[styles.recTag, styles.tagGreen]}>
              <Text style={styles.tagGreenTxt}>Gratuito</Text>
            </View>
          </View>
          <View style={styles.recCardBody}>
            <Text style={styles.recCardDesc}>
              Técnicas de respiração reduzem o estresse em minutos e melhoram a variabilidade cardíaca progressivamente.
            </Text>
            <TouchableOpacity style={[styles.recBtn, styles.recBtnOutline]} activeOpacity={0.8}>
              <Text style={styles.recBtnOutlineTxt}>Ver Exercícios</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rec Card 3: Dicas de Saúde */}
        <View style={styles.recCard}>
          <View style={styles.recCardHeader}>
            <View style={[styles.recCardIconWrap, { backgroundColor: '#FFF8EE' }]}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Rect x={3} y={3} width={18} height={18} rx={3} stroke={Colors.orange} strokeWidth={1.8} />
                <Path d="M7 13l3-5 3 4 2-3 2 2" stroke={Colors.orange} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </View>
            <Text style={styles.recCardTitle}>Dicas de Saúde</Text>
          </View>
          <View style={styles.recCardBody}>
            <Text style={styles.recCardDesc}>
              Seu score cardíaco está ótimo. Continue com hábitos saudáveis como exercícios regulares e boa hidratação.
            </Text>
            <TouchableOpacity style={[styles.recBtn, styles.recBtnOutline]} activeOpacity={0.8}>
              <Text style={styles.recBtnOutlineTxt}>Ver Dicas de Saúde</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Histórico link */}
        <TouchableOpacity
          style={styles.histLink}
          activeOpacity={0.75}
          onPress={() => navigation.navigate('Home')}
        >
          <View style={styles.histLinkIcon}>
            <Svg width={26} height={26} viewBox="0 0 26 26" fill="none">
              <Circle cx={13} cy={13} r={10} stroke={Colors.blue} strokeWidth={1.6} />
              <Path d="M13 7v7l4 2" stroke={Colors.blue} strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
              <Path d="M4 13H2" stroke={Colors.blue} strokeWidth={1.5} strokeLinecap="round" />
            </Svg>
          </View>
          <View style={styles.histLinkText}>
            <Text style={styles.histLinkTitle}>Histórico de Testes</Text>
            <Text style={styles.histLinkSub}>Ver todos os resultados anteriores</Text>
          </View>
          <Text style={styles.histArrow}>›</Text>
        </TouchableOpacity>

      </ScrollView>

      <CTABar
        mainLabel="Voltar para Home"
        onMain={() => navigation.navigate('Home')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.bg },
  scroll: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  pageIntro: { padding: 20, paddingBottom: 6, paddingTop: 20 },
  pageDesc: { fontSize: 14, color: Colors.textSub },

  // Alert
  alertStrip: {
    marginHorizontal: 14,
    marginTop: 14,
    backgroundColor: Colors.alertBg,
    borderRadius: 10,
    padding: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    borderLeftWidth: 3,
    borderLeftColor: Colors.alertBorder,
  },
  alertTitle: { fontWeight: '800', fontSize: 14, color: Colors.alertText, marginBottom: 3 },
  alertDesc: { fontSize: 13, color: Colors.alertSub, lineHeight: 19 },

  // Rec cards
  recCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    ...cardShadow,
    marginHorizontal: 14,
    marginTop: 10,
    overflow: 'hidden',
  },
  recCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    paddingHorizontal: 18,
    paddingBottom: 10,
  },
  recCardIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recCardTitle: { fontWeight: '800', fontSize: 15, color: Colors.text, flex: 1 },
  recTag: { paddingVertical: 4, paddingHorizontal: 9, borderRadius: 99 },
  tagBlue: { backgroundColor: 'rgba(75,164,206,0.1)' },
  tagBlueTxt: { fontWeight: '800', fontSize: 11, color: Colors.blueDark },
  tagGreen: { backgroundColor: 'rgba(76,175,130,0.1)' },
  tagGreenTxt: { fontWeight: '800', fontSize: 11, color: '#3DA870' },
  recCardBody: { padding: 0, paddingHorizontal: 18, paddingBottom: 16 },
  recCardDesc: { fontSize: 13, color: Colors.textSub, lineHeight: 21, marginBottom: 12 },
  recBtn: {
    width: '100%',
    paddingVertical: 13,
    borderRadius: 99,
    alignItems: 'center',
  },
  recBtnSolid: { backgroundColor: Colors.blue },
  recBtnSolidTxt: { color: 'white', fontWeight: '800', fontSize: 14 },
  recBtnOutline: { backgroundColor: Colors.techNote },
  recBtnOutlineTxt: { color: Colors.blueDark, fontWeight: '800', fontSize: 14 },

  // Historic link
  histLink: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    ...cardShadow,
    marginHorizontal: 14,
    marginTop: 10,
    padding: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  histLinkIcon: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },
  histLinkText: { flex: 1 },
  histLinkTitle: { fontWeight: '800', fontSize: 14, color: Colors.text },
  histLinkSub: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  histArrow: { marginLeft: 'auto', color: Colors.textMuted, fontSize: 22, lineHeight: 24 },
});
