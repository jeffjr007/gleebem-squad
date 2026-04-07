// src/screens/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Svg, { Path, Circle, Rect, Line } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { Colors, cardShadow } from '../theme';
import StatusBarRow from '../components/StatusBarRow';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBarRow time="16:56" />

      {/* Header Gleebem azul */}
      <View style={styles.gHeader}>
        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.75}>
          <Svg width={22} height={16} viewBox="0 0 22 16" fill="none">
            <Rect x={0} y={0} width={22} height={2.5} rx={1.25} fill="white" />
            <Rect x={0} y={6.75} width={22} height={2.5} rx={1.25} fill="white" />
            <Rect x={0} y={13.5} width={22} height={2.5} rx={1.25} fill="white" />
          </Svg>
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          {/* Logo Gleebem */}
          <Svg width={26} height={26} viewBox="0 0 26 26" fill="none">
            <Path d="M13 3C8 3 4 7 4 12c0 3 1.5 5.5 3.8 7L13 23l5.2-4c2.3-1.5 3.8-4 3.8-7 0-5-4-9-9-9z" fill="white" opacity={0.9} />
            <Path d="M10 11c0-1.7 1.3-3 3-3s3 1.3 3 3" stroke="rgba(75,164,206,0.8)" strokeWidth={1.5} strokeLinecap="round" fill="none" />
          </Svg>
          <Text style={styles.logoText}>Gleebem</Text>
        </View>
        <TouchableOpacity style={styles.menuBtn} activeOpacity={0.75} onPress={() => navigation.navigate('Intro')}>
          <Svg width={24} height={24} viewBox="0 0 36 36" fill="none">
            <Path d="M18 6C18 6 8 10 8 19a10 10 0 0020 0C28 10 18 6 18 6z" stroke="white" strokeWidth={2.5} fill="none" strokeLinejoin="round" />
            <Path d="M12 20h3l2-5 3 8 2-5 2 2h2" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </Svg>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Saudação */}
        <View style={styles.greetingBlock}>
          <Text style={styles.greetingName}>Olá, João!</Text>
          <Text style={styles.greetingSub}>
            Seja atendido agora por um médico da{'\n'}
            <Text style={styles.greetingBold}>Telemedicina Gleebem</Text>
          </Text>
        </View>

        {/* Lista de cards */}
        <View style={styles.cardList}>

          {/* Card 1: Atendimento imediato digital */}
          <TouchableOpacity style={styles.homeCard} activeOpacity={0.75}>
            <View style={styles.homeCardLeft}>
              <Text style={styles.homeCardTitle}>Atendimento imediato digital</Text>
              <Text style={styles.homeCardSub}>
                Orientação médica on-line com os profissionais do{'\n'}
                <Text style={styles.homeCardBold}>Hospital Israelita Albert Einstein</Text>
              </Text>
            </View>
            <View style={styles.cardIcon}>
              <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
                <Circle cx={22} cy={22} r={19} stroke="#2A5A9F" strokeWidth={2.2} />
                <Circle cx={22} cy={22} r={12} stroke="#2A5A9F" strokeWidth={1.5} />
                <Circle cx={22} cy={22} r={5} stroke="#2A5A9F" strokeWidth={1.5} />
                <Line x1={3} y1={22} x2={41} y2={22} stroke="#2A5A9F" strokeWidth={1.5} />
                <Path d="M11 9.5C14 15 16.5 18.5 22 22s11 7 14.5 12.5" stroke="#2A5A9F" strokeWidth={1.5} strokeLinecap="round" />
                <Path d="M33 9.5C30 15 27.5 18.5 22 22S11 29 7.5 34.5" stroke="#2A5A9F" strokeWidth={1.5} strokeLinecap="round" />
              </Svg>
            </View>
          </TouchableOpacity>

          {/* Card 2: Atendimento imediato */}
          <TouchableOpacity style={styles.homeCard} activeOpacity={0.75}>
            <View style={styles.homeCardLeft}>
              <Text style={styles.homeCardTitle}>Atendimento imediato</Text>
              <Text style={styles.homeCardSub}>Seja atendido agora por um médico.</Text>
            </View>
            <View style={styles.cardIcon}>
              <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
                <Line x1={18} y1={4} x2={18} y2={32} stroke={Colors.blue} strokeWidth={3} strokeLinecap="round" />
                <Line x1={4} y1={18} x2={32} y2={18} stroke={Colors.blue} strokeWidth={3} strokeLinecap="round" />
              </Svg>
            </View>
          </TouchableOpacity>


          {/* Card 3: Agende sua consulta */}
          <TouchableOpacity style={styles.homeCard} activeOpacity={0.75}>
            <View style={styles.homeCardLeft}>
              <Text style={styles.homeCardTitle}>Agende sua consulta</Text>
              <Text style={styles.homeCardSub}>Faça seu agendamento para o melhor horário do seu dia.</Text>
            </View>
            <View style={styles.cardIcon}>
              <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
                <Rect x={4} y={7} width={28} height={25} rx={3} stroke={Colors.blue} strokeWidth={2} />
                <Path d="M4 14h28" stroke={Colors.blue} strokeWidth={2} />
                <Path d="M12 4v6M24 4v6" stroke={Colors.blue} strokeWidth={2} strokeLinecap="round" />
              </Svg>
            </View>
          </TouchableOpacity>

          {/* Card 4: Atendimento Presencial (azul) */}
          <TouchableOpacity style={[styles.homeCard, styles.blueCard]} activeOpacity={0.75}>
            <View style={styles.homeCardLeft}>
              <Text style={[styles.homeCardTitle, styles.blueCardTitle]}>Atendimento Presencial</Text>
              <Text style={[styles.homeCardSub, styles.blueCardSub]}>Consultas e exames presenciais + desconto em farmácias</Text>
            </View>
            <View style={styles.cardIcon}>
              <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
                <Path d="M18 4C13 4 9 8 9 13c0 7 9 19 9 19s9-12 9-19c0-5-4-9-9-9z" stroke="white" strokeWidth={2} fill="none" />
                <Circle cx={18} cy={13} r={3.5} stroke="white" strokeWidth={2} />
                <Line x1={18} y1={9.5} x2={18} y2={11} stroke="white" strokeWidth={1.5} strokeLinecap="round" />
              </Svg>
            </View>
          </TouchableOpacity>

          {/* Card 5: Histórico */}
          <TouchableOpacity style={[styles.homeCard, { paddingVertical: 14 }]} activeOpacity={0.75}>
            <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center', marginRight: 4 }}>
              <Svg width={26} height={26} viewBox="0 0 26 26" fill="none">
                <Circle cx={13} cy={13} r={10} stroke={Colors.blue} strokeWidth={1.8} />
                <Path d="M13 7v7l4 2" stroke={Colors.blue} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                <Path d="M4 13H2M8 5.5l-1-1.5M18 5.5l1-1.5" stroke={Colors.blue} strokeWidth={1.5} strokeLinecap="round" />
              </Svg>
            </View>
            <View style={[styles.homeCardLeft, { padding: 0 }]}>
              <Text style={styles.homeCardTitle}>Histórico de consultas</Text>
            </View>
          </TouchableOpacity>

        </View>
        <View style={{ height: 16 }} />
      </ScrollView>

      {/* FAB Chat */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
          <Path d="M19 3H3a1 1 0 00-1 1v11a1 1 0 001 1h4l4 4 4-4h4a1 1 0 001-1V4a1 1 0 00-1-1z" stroke="white" strokeWidth={1.8} strokeLinejoin="round" />
          <Path d="M6 9h10M6 13h6" stroke="white" strokeWidth={1.6} strokeLinecap="round" />
        </Svg>
      </TouchableOpacity>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path d="M3 10.5L12 3l9 7.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1v-9.5z" stroke={Colors.blue} strokeWidth={2} fill="none" />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Rect x={3} y={4} width={18} height={18} rx={2} stroke={Colors.textMuted} strokeWidth={2} />
            <Path d="M3 10h18M8 2v4M16 2v4" stroke={Colors.textMuted} strokeWidth={2} strokeLinecap="round" />
          </Svg>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Circle cx={12} cy={12} r={9} stroke={Colors.textMuted} strokeWidth={2} />
            <Path d="M12 6v7l3 2" stroke={Colors.textMuted} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  gHeader: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 18,
    paddingVertical: 10,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuBtn: {
    padding: 4,
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
  logoText: {
    color: 'white',
    fontWeight: '900',
    fontSize: 22,
    letterSpacing: -0.5,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 90,
  },
  greetingBlock: {
    padding: 22,
    paddingBottom: 14,
  },
  greetingName: {
    fontWeight: '900',
    fontSize: 24,
    color: Colors.text,
    marginBottom: 2,
  },
  greetingSub: {
    fontSize: 14,
    color: Colors.textSub,
    lineHeight: 20,
  },
  greetingBold: {
    fontWeight: '800',
    color: Colors.text,
  },
  cardList: {
    paddingHorizontal: 14,
    gap: 10,
  },
  homeCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    ...cardShadow,
    padding: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  homeCardLeft: {
    flex: 1,
    paddingRight: 14,
  },
  homeCardTitle: {
    fontWeight: '800',
    fontSize: 15,
    color: Colors.text,
    marginBottom: 4,
    lineHeight: 19,
  },
  homeCardSub: {
    fontSize: 13,
    color: Colors.textSub,
    lineHeight: 19,
  },
  homeCardBold: {
    fontWeight: '800',
    color: Colors.text,
  },
  blueCard: {
    backgroundColor: Colors.blue,
  },
  blueCardTitle: {
    color: 'white',
  },
  blueCardSub: {
    color: 'rgba(255,255,255,0.88)',
  },
  cardIcon: {
    width: 46,
    height: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 74,
    right: 16,
    width: 52,
    height: 52,
    backgroundColor: Colors.blue,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.blue,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 8,
  },
  bottomNav: {
    height: 64,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 6,
  },
  navItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
});
