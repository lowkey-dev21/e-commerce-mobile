import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Pressable, Animated } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useTheme } from '../hooks/useTheme';

export default function ConfirmationScreen() {
  const colors = useTheme();
  const router = useRouter();
  const { orderNumber } = useLocalSearchParams<{ orderNumber: string }>();

  const iconScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(iconScale, {
      toValue: 1,
      delay: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Animated.View style={[styles.iconWrapper, { transform: [{ scale: iconScale }] }]}>
        <View style={[styles.iconCircle, { backgroundColor: colors.success + '20' }]}>
          <Text style={styles.icon}>✅</Text>
        </View>
      </Animated.View>

      <Text style={[styles.title, { color: colors.text }]}>
        Order Placed!
      </Text>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Thank you for your purchase. Your order is being processed.
      </Text>

      {orderNumber && (
        <View
          style={[styles.orderBox, { backgroundColor: colors.primaryLight, borderColor: colors.primary + '40' }]}
        >
          <Text style={[styles.orderLabel, { color: colors.textSecondary }]}>Order Number</Text>
          <Text style={[styles.orderNumber, { color: colors.primary }]}>{orderNumber}</Text>
        </View>
      )}

      <View style={styles.steps}>
        {[
          { icon: '📦', label: 'Order Confirmed' },
          { icon: '🏭', label: 'Being Prepared' },
          { icon: '🚚', label: 'On the Way' },
          { icon: '🏠', label: 'Delivered' },
        ].map((step, i) => (
          <View key={step.label} style={styles.step}>
            <Text style={styles.stepIcon}>{step.icon}</Text>
            <Text style={[styles.stepLabel, { color: i === 0 ? colors.success : colors.textSecondary }]}>
              {step.label}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <Pressable
          onPress={() => router.replace('/')}
          style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.primaryBtnText}>Continue Shopping</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  iconWrapper: { marginBottom: 24 },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { fontSize: 48 },
  title: { fontSize: 28, fontWeight: '800', marginBottom: 12, textAlign: 'center' },
  subtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  orderBox: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 24,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 32,
  },
  orderLabel: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', marginBottom: 4 },
  orderNumber: { fontSize: 22, fontWeight: '800' },
  steps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  step: { alignItems: 'center', flex: 1 },
  stepIcon: { fontSize: 22, marginBottom: 6 },
  stepLabel: { fontSize: 10, fontWeight: '600', textAlign: 'center' },
  actions: { width: '100%' },
  primaryBtn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
