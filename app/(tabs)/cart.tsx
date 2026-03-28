import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCartStore } from '../../store/cartStore';
import { EmptyState } from '../../components/EmptyState';
import { useTheme } from '../../hooks/useTheme';

export default function CartScreen() {
  const colors = useTheme();
  const router = useRouter();
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  const handleRemove = (productId: string, name: string) => {
    Alert.alert('Remove Item', `Remove "${name}" from cart?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeItem(productId) },
    ]);
  };

  if (items.length === 0) {
    return (
      <EmptyState
        icon="🛒"
        title="Your cart is empty"
        subtitle="Browse products and add items to your cart"
        actionLabel="Browse Products"
        onAction={() => router.push('/')}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.product._id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View>
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Image source={{ uri: item.product.image }} style={styles.image} resizeMode="cover" />
              <View style={styles.details}>
                <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
                  {item.product.name}
                </Text>
                <Text style={[styles.price, { color: colors.primary }]}>
                  ${item.product.price.toFixed(2)}
                </Text>
                <View style={styles.qtyRow}>
                  <Pressable
                    onPress={() => updateQuantity(item.product._id, item.quantity - 1)}
                    style={[styles.qtyBtn, { borderColor: colors.border }]}
                  >
                    <Text style={[styles.qtyBtnText, { color: colors.text }]}>−</Text>
                  </Pressable>
                  <Text style={[styles.qty, { color: colors.text }]}>{item.quantity}</Text>
                  <Pressable
                    onPress={() => updateQuantity(item.product._id, item.quantity + 1)}
                    style={[styles.qtyBtn, { borderColor: colors.border }]}
                  >
                    <Text style={[styles.qtyBtnText, { color: colors.text }]}>+</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => handleRemove(item.product._id, item.product.name)}
                    style={styles.removeBtn}
                  >
                    <Text style={styles.removeBtnText}>🗑</Text>
                  </Pressable>
                </View>
              </View>
              <Text style={[styles.lineTotal, { color: colors.text }]}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View style={[styles.summary, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </Text>
              <Text style={[styles.summaryTotal, { color: colors.text }]}>
                ${totalPrice().toFixed(2)}
              </Text>
            </View>
            <Pressable
              onPress={() => router.push('/checkout')}
              style={[styles.checkoutBtn, { backgroundColor: colors.primary }]}
            >
              <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16, gap: 12 },
  card: {
    flexDirection: 'row',
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    padding: 12,
    gap: 12,
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 10 },
  details: { flex: 1 },
  name: { fontSize: 14, fontFamily: 'DMSans_500Medium', marginBottom: 4 },
  price: { fontSize: 15, fontFamily: 'DMSans_700Bold', marginBottom: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 16, fontFamily: 'DMSans_500Medium' },
  qty: { fontSize: 16, fontFamily: 'DMSans_700Bold', minWidth: 20, textAlign: 'center' },
  removeBtn: { marginLeft: 'auto' },
  removeBtnText: { fontSize: 18 },
  lineTotal: { fontSize: 15, fontFamily: 'DMSans_700Bold', alignSelf: 'flex-start' },
  summary: {
    marginTop: 8,
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryLabel: { fontSize: 14, fontFamily: 'DMSans_400Regular' },
  summaryTotal: { fontSize: 22, fontFamily: 'DMSans_700Bold' },
  checkoutBtn: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
  },
  checkoutBtnText: { color: '#fff', fontSize: 16, fontFamily: 'DMSans_700Bold' },
});
