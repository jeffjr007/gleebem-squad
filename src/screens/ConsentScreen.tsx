// src/screens/ConsentScreen.tsx — TELA 2: Consentimento LGPD
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors, cardShadow } from '../theme';
import StatusBarRow from '../components/StatusBarRow';
import InnerHeader from '../components/InnerHeader';
import CTABar from '../components/CTABar';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Consent'>;
};

function CheckIcon() {
  return (
    <Svg width={13} height={10} viewBox="0 0 13 10" fill="none">
      <Path d="M1 5l4 4 7-8" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function ConsentScreen({ navigation }: Props) {
  const [cb1, setCb1] = useState(true);
  const [cb2, setCb2] = useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarRow time="16:57" />
      <InnerHeader title="Privacidade e Dados" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.pageIntro}>
          <Text style={styles.pageTitle}>Antes de continuar</Text>
          <Text style={styles.pageDesc}>
            Seus dados de saúde são sensíveis. Leia o que será coletado e como será usado.
          </Text>
        </View>

        {/* Itens de consentimento */}
        <View style={styles.consentSection}>
          <View style={styles.consentCard}>
            {/* Item 1: Câmera */}
            <View style={styles.consentItem}>
              <View style={styles.consentIcon}>
                <Svg width={26} height={26} viewBox="0 0 26 26" fill="none">
                  <Rect x={2} y={6} width={22} height={16} rx={3} stroke={Colors.blue} strokeWidth={1.8} />
                  <Circle cx={13} cy={14} r={3.5} stroke={Colors.blue} strokeWidth={1.6} />
                  <Circle cx={13} cy={14} r={1} fill={Colors.blue} />
                </Svg>
              </View>
              <View style={styles.consentText}>
                <Text style={styles.consentTitle}>Acesso à câmera</Text>
                <Text style={styles.consentDesc}>
                  Usamos a câmera frontal apenas durante o scan para detectar variações de cor da pele causadas pelo fluxo sanguíneo.
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Item 2: Processamento */}
            <View style={styles.consentItem}>
              <View style={styles.consentIcon}>
                <Svg width={26} height={26} viewBox="0 0 26 26" fill="none">
                  <Path d="M13 2l9 4v8c0 5-4 9-9 11C8 23 4 19 4 14V6l9-4z" stroke={Colors.blue} strokeWidth={1.8} fill="none" />
                  <Path d="M9 13l3 3 5-5" stroke={Colors.blue} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </View>
              <View style={styles.consentText}>
                <Text style={styles.consentTitle}>Processamento seguro</Text>
                <Text style={styles.consentDesc}>
                  Os dados são processados pelo parceiro tecnológico da Gleebem. Nenhum vídeo é armazenado no dispositivo ou servidor.
                </Text>
              </View>
            </View>

            <View style={styles.divider} />

            {/* Item 3: Sem reconhecimento facial */}
            <View style={styles.consentItem}>
              <View style={styles.consentIcon}>
                <Svg width={26} height={26} viewBox="0 0 26 26" fill="none">
                  <Circle cx={13} cy={10} r={4} stroke={Colors.blue} strokeWidth={1.8} />
                  <Path d="M5 22c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke={Colors.blue} strokeWidth={1.8} strokeLinecap="round" />
                  <Line x1={19} y1={4} x2={23} y2={4} stroke="#EA7552" strokeWidth={2} strokeLinecap="round" />
                  <Line x1={21} y1={2} x2={21} y2={6} stroke="#EA7552" strokeWidth={2} strokeLinecap="round" />
                </Svg>
              </View>
              <View style={styles.consentText}>
                <Text style={styles.consentTitle}>Sem reconhecimento facial</Text>
                <Text style={styles.consentDesc}>
                  A tecnologia detecta apenas variações de luz. Nenhuma identificação facial é realizada.
                </Text>
              </View>
            </View>
          </View>

          {/* Tech Note */}
          <View style={styles.techNote}>
            <Text style={styles.techNoteText}>
              A câmera detecta pequenas variações de cor da pele causadas pelo fluxo sanguíneo (técnica rPPG). Nenhum dado biométrico de identificação é coletado.
            </Text>
          </View>

          {/* Checkboxes */}
          <View style={styles.checkboxCard}>
            <TouchableOpacity style={styles.cbRow} onPress={() => setCb1(!cb1)} activeOpacity={0.8}>
              <View style={[styles.cbBox, cb1 && styles.cbBoxOn]}>
                {cb1 && <CheckIcon />}
              </View>
              <Text style={styles.cbLabel}>
                Li e concordo com os{' '}
                <Text style={styles.cbLink}>Termos de Uso</Text>
                {' '}e{' '}
                <Text style={styles.cbLink}>Política de Privacidade</Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cbRow} onPress={() => setCb2(!cb2)} activeOpacity={0.8}>
              <View style={[styles.cbBox, cb2 && styles.cbBoxOn]}>
                {cb2 && <CheckIcon />}
              </View>
              <Text style={styles.cbLabel}>Autorizo o uso da câmera para este teste de saúde</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <CTABar
        mainLabel="Aceito e Continuar"
        onMain={() => navigation.navigate('Preparation')}
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
  consentSection: { paddingHorizontal: 14 },
  consentCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    ...cardShadow,
    overflow: 'hidden',
  },
  consentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    padding: 16,
    paddingHorizontal: 18,
  },
  divider: { height: 1, backgroundColor: Colors.border, marginHorizontal: 0 },
  consentIcon: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  consentText: { flex: 1 },
  consentTitle: { fontWeight: '800', fontSize: 14, color: Colors.text, marginBottom: 3 },
  consentDesc: { fontSize: 13, color: Colors.textSub, lineHeight: 19 },
  techNote: {
    marginTop: 10,
    backgroundColor: Colors.techNote,
    borderRadius: 10,
    padding: 13,
    paddingHorizontal: 16,
    borderLeftWidth: 3,
    borderLeftColor: Colors.blue,
  },
  techNoteText: { fontSize: 12, color: Colors.techNoteText, lineHeight: 19 },
  checkboxCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    ...cardShadow,
    padding: 14,
    paddingHorizontal: 18,
    marginTop: 10,
    gap: 8,
  },
  cbRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 12, paddingVertical: 8 },
  cbBox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.blue,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  cbBoxOn: { backgroundColor: Colors.blue, borderColor: Colors.blue },
  cbLabel: { flex: 1, fontSize: 13, color: Colors.textSub, lineHeight: 19 },
  cbLink: { color: Colors.blue, fontWeight: '700' },
});
