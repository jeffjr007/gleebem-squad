// src/components/CTABar.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme';

interface Props {
  mainLabel: string;
  onMain: () => void;
  ghostLabel?: string;
  onGhost?: () => void;
}

export default function CTABar({ mainLabel, onMain, ghostLabel, onGhost }: Props) {
  return (
    <View style={styles.bar}>
      <TouchableOpacity style={styles.mainBtn} onPress={onMain} activeOpacity={0.8}>
        <Text style={styles.mainTxt}>{mainLabel}</Text>
      </TouchableOpacity>
      {ghostLabel && (
        <TouchableOpacity style={styles.ghostBtn} onPress={onGhost} activeOpacity={0.8}>
          <Text style={styles.ghostTxt}>{ghostLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 22,
    gap: 8,
  },
  mainBtn: {
    backgroundColor: Colors.blue,
    borderRadius: 99,
    paddingVertical: 15,
    alignItems: 'center',
  },
  mainTxt: {
    color: 'white',
    fontWeight: '800',
    fontSize: 15,
  },
  ghostBtn: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  ghostTxt: {
    color: Colors.textMuted,
    fontWeight: '700',
    fontSize: 13,
  },
});
