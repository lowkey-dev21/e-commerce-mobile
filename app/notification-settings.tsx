import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';

const TEAL = '#4AB7B6';

function BackIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function DotsIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={5} r={1.2} fill={color} />
      <Circle cx={12} cy={12} r={1.2} fill={color} />
      <Circle cx={12} cy={19} r={1.2} fill={color} />
    </Svg>
  );
}

function Toggle({ value, onToggle }: { value: boolean; onToggle: () => void }) {
  const colors = useTheme();
  return (
    <Pressable
      onPress={onToggle}
      style={[
        styles.toggleTrack,
        { backgroundColor: value ? TEAL : colors.border },
      ]}
    >
      <View
        style={[
          styles.toggleThumb,
          { transform: [{ translateX: value ? 20 : 2 }] },
        ]}
      />
    </Pressable>
  );
}

const ROWS = [
  { key: 'payment', label: 'Payment' },
  { key: 'tracking', label: 'Tracking' },
  { key: 'complete', label: 'Complete Order' },
  { key: 'notification', label: 'Notification' },
];

export default function NotificationSettingsScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [toggles, setToggles] = useState<Record<string, boolean>>({
    payment: true,
    tracking: true,
    complete: true,
    notification: true,
  });

  const handleToggle = (key: string) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.background }]}>
          <BackIcon color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
        <Pressable style={styles.dotsBtn}>
          <DotsIcon color={colors.text} />
        </Pressable>
      </View>

      <View style={{ paddingHorizontal: 20, paddingTop: 20, gap: 10 }}>
        {ROWS.map((row) => (
          <View key={row.key} style={[styles.rowCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.rowLabel, { color: colors.text }]}>{row.label}</Text>
            <Toggle value={toggles[row.key]} onToggle={() => handleToggle(row.key)} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  dotsBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 17, fontFamily: 'DMSans_700Bold' },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  rowLabel: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
  },
  toggleTrack: {
    width: 48,
    height: 28,
    borderRadius: 14,
    padding: 3,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#fff',
  },
});
