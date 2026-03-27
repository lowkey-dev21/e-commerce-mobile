import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../hooks/useTheme';

type Props = {
  icon: string;
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const EmptyState = ({ icon, title, subtitle, actionLabel, onAction }: Props) => {
  const colors = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {subtitle && (
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{subtitle}</Text>
      )}
      {actionLabel && onAction && (
        <Pressable
          onPress={onAction}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.buttonText}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  icon: { fontSize: 56, marginBottom: 16 },
  title: { fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
