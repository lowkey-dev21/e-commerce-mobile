import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../hooks/useTheme';

type Props = { message?: string; onRetry?: () => void };

export const ErrorState = ({ message = 'Something went wrong', onRetry }: Props) => {
  const colors = useTheme();
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>⚠️</Text>
      <Text style={[styles.title, { color: colors.text }]}>Oops!</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{message}</Text>
      {onRetry && (
        <Pressable
          onPress={onRetry}
          style={[styles.button, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.buttonText}>Try Again</Text>
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
  icon: { fontSize: 48, marginBottom: 12 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8 },
  subtitle: { fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 24 },
  button: { paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
});
