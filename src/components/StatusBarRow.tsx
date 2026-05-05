// src/components/StatusBarRow.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme';
import Svg, { Path, Rect } from 'react-native-svg';

interface Props {
  time?: string;
  dark?: boolean; // dark background (scan screen)
}

export default function StatusBarRow({ time = '16:56', dark = false }: Props) {
  const color = dark ? 'rgba(255,255,255,0.8)' : Colors.text;
  const iconColor = dark ? 'rgba(255,255,255,0.8)' : Colors.text;

  return (
    <View style={styles.sb}>
      <Text style={[styles.time, { color }]}>{time}</Text>
      <View style={styles.icons}>
        {/* Signal */}
        <Svg width={15} height={15} viewBox="0 0 16 16" fill="none">
          <Path d="M1 4l4 4 4-4 4 4" stroke={iconColor} strokeWidth={1.5} strokeLinecap="round" />
        </Svg>
        {/* Battery */}
        <Svg width={15} height={15} viewBox="0 0 16 16" fill="none">
          <Rect x={1} y={4} width={12} height={8} rx={1.5} stroke={iconColor} strokeWidth={1.5} />
          <Path d="M13 7v2" stroke={iconColor} strokeWidth={1.5} strokeLinecap="round" />
          <Rect x={2.5} y={5.5} width={8} height={5} rx={0.5} fill={iconColor} />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sb: {
    height: 44,
    paddingTop: 10,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    fontWeight: '800',
    fontSize: 15,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
