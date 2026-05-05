// src/components/InnerHeader.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../theme';
import Svg, { Path } from 'react-native-svg';

interface Props {
  title: string;
  onBack?: () => void;
  rightSlot?: React.ReactNode;
}

export default function InnerHeader({ title, onBack, rightSlot }: Props) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.75}>
          <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
            <Path d="M11 4L6 9l5 5" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
      ) : (
        <View style={{ width: 36 }} />
      )}
      <Text style={styles.title}>{title}</Text>
      {rightSlot ?? <View style={{ width: 36 }} />}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.blue,
    paddingHorizontal: 18,
    paddingVertical: 10,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backBtn: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: '800',
    fontSize: 17,
    flex: 1,
  },
});
