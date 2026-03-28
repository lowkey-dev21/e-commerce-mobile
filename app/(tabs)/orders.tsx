import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

const TEAL = '#4AB7B6';

export default function OrdersScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background, paddingTop: insets.top + 16 }]}>
      <Text style={[styles.title, { color: colors.text }]}>My Orders</Text>

      <View style={styles.empty}>
        <Text style={styles.icon}>📦</Text>
        <Text style={[styles.emptyTitle, { color: colors.text }]}>No orders yet</Text>
        <Text style={[styles.emptyDesc, { color: colors.textSecondary }]}>
          Your order history will appear here once you place an order.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, paddingHorizontal: 20 },
  title: {
    fontSize: 22,
    fontFamily: 'DMSans_700Bold',
    marginBottom: 24,
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingBottom: 80,
  },
  icon: { fontSize: 52 },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'DMSans_700Bold',
  },
  emptyDesc: {
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
});
