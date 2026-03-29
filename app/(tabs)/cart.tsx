import React from 'react';
import {
  View, Text, FlatList, StyleSheet, Pressable, Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useCartStore } from '../../store/cartStore';
import { useTheme } from '../../hooks/useTheme';
import { TrashIcon } from '../../components/icons/TrashIcon';

const TEAL = '#4AB7B6';

const LOCAL_IMAGES: Record<string, any> = {
  '1': require('../../assets/chair.png'),
  '2': require('../../assets/washing-machine.png'),
  '3': require('../../assets/chair.png'),
  '4': require('../../assets/washing-machine.png'),
  '5': require('../../assets/chair.png'),
  '6': require('../../assets/washing-machine.png'),
};

export default function CartScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  const getImage = (productId: string, imageUri: string) => {
    if (LOCAL_IMAGES[productId]) return LOCAL_IMAGES[productId];
    if (imageUri) return { uri: imageUri };
    return require('../../assets/chair.png');
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>My Cart</Text>
        {items.length > 0 && (
          <Pressable onPress={clearCart}>
            <Text style={{ color: '#EF4444', fontSize: 13, fontFamily: 'DMSans_500Medium' }}>Clear All</Text>
          </Pressable>
        )}
      </View>

      {items.length === 0 ? (
        <View style={styles.empty}>
          <View style={[styles.emptyRingOuter, { backgroundColor: TEAL + '12' }]}>
            <View style={[styles.emptyRingInner, { backgroundColor: TEAL + '22' }]}>
              <View style={[styles.emptyIconCircle, { backgroundColor: TEAL }]}>
                <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
                  <Path d="M6 2L3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6L18 2H6Z" stroke="#fff" strokeWidth={1.8} strokeLinejoin="round" />
                  <Path d="M3 6H21" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" />
                  <Path d="M16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" />
                </Svg>
              </View>
            </View>
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Your cart is empty</Text>
          <Text style={styles.emptyDesc}>
            Looks like you haven't added{'\n'}anything to your cart yet.
          </Text>
          <Pressable onPress={() => router.push('/')} style={[styles.shopBtn, { backgroundColor: TEAL }]}>
            <Text style={styles.shopBtnText}>Start Shopping</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.product._id}
            contentContainerStyle={[styles.list, { paddingBottom: 160 }]}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={[styles.card, { borderColor: colors.border }]}>
                <View style={[styles.imageWrap, { backgroundColor: colors.skeleton }]}>
                  <Image
                    source={getImage(item.product._id, item.product.image)}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.details}>
                  <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
                    {item.product.name}
                  </Text>
                  <Text style={[styles.category, { color: colors.textSecondary }]}>
                    {item.product.category}
                  </Text>
                  <Text style={[styles.price, { color: TEAL }]}>
                    ₹{(item.product.price * item.quantity).toLocaleString()}
                  </Text>

                  <View style={styles.qtyRow}>
                    <Pressable
                      onPress={() => updateQuantity(item.product._id, item.quantity - 1)}
                      style={[styles.qtyBtn, { backgroundColor: colors.text }]}
                    >
                      <Text style={[styles.qtySymbol, { color: colors.background }]}>−</Text>
                    </Pressable>
                    <Text style={[styles.qty, { color: colors.text }]}>{item.quantity}</Text>
                    <Pressable
                      onPress={() => updateQuantity(item.product._id, item.quantity + 1)}
                      style={[styles.qtyBtn, { backgroundColor: TEAL }]}
                    >
                      <Text style={styles.qtySymbol}>+</Text>
                    </Pressable>
                  </View>
                </View>

                <Pressable onPress={() => removeItem(item.product._id)} style={styles.removeBtn}>
                  <TrashIcon color={colors.textSecondary} size={18} />
                </Pressable>
              </View>
            )}
          />

          <View style={[styles.bottom, { backgroundColor: colors.background, paddingBottom: insets.bottom + 12, borderTopColor: colors.border }]}>
            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>
                Total ({items.reduce((s, i) => s + i.quantity, 0)} items)
              </Text>
              <Text style={[styles.totalPrice, { color: colors.text }]}>
                ₹{totalPrice().toLocaleString()}
              </Text>
            </View>
            <Pressable
              onPress={() => router.push('/checkout')}
              style={[styles.checkoutBtn, { backgroundColor: TEAL }]}
            >
              <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
            </Pressable>
          </View>
        </>
      )}
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
  title: { fontSize: 22, fontFamily: 'DMSans_700Bold' },
  list: { padding: 16, gap: 12 },
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 0.8,
    padding: 12,
    gap: 12,
    alignItems: 'center',
  },
  imageWrap: { width: 80, height: 80, borderRadius: 12, overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  details: { flex: 1 },
  name: { fontSize: 14, fontFamily: 'DMSans_500Medium', marginBottom: 2, lineHeight: 20 },
  category: { fontSize: 11, fontFamily: 'DMSans_400Regular', marginBottom: 4, textTransform: 'uppercase' },
  price: { fontSize: 15, fontFamily: 'DMSans_700Bold', marginBottom: 8 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  qtyBtn: { width: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  qtySymbol: { fontSize: 16, color: '#fff', lineHeight: 20, fontFamily: 'DMSans_700Bold' },
  qty: { fontSize: 15, fontFamily: 'DMSans_700Bold', minWidth: 20, textAlign: 'center' },
  removeBtn: { padding: 6 },
  bottom: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalLabel: { fontSize: 13, fontFamily: 'DMSans_400Regular' },
  totalPrice: { fontSize: 20, fontFamily: 'DMSans_700Bold' },
  checkoutBtn: { paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  checkoutBtnText: { color: '#fff', fontSize: 16, fontFamily: 'DMSans_700Bold' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, paddingBottom: 80, paddingHorizontal: 32 },
  emptyRingOuter: { width: 160, height: 160, borderRadius: 80, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  emptyRingInner: { width: 124, height: 124, borderRadius: 62, alignItems: 'center', justifyContent: 'center' },
  emptyIconCircle: { width: 90, height: 90, borderRadius: 45, alignItems: 'center', justifyContent: 'center' },
  emptyTitle: { fontSize: 20, fontFamily: 'DMSans_700Bold', textAlign: 'center' },
  emptyDesc: { fontSize: 14, fontFamily: 'DMSans_400Regular', textAlign: 'center', lineHeight: 22, color: '#999' },
  shopBtn: { paddingHorizontal: 40, paddingVertical: 14, borderRadius: 14, marginTop: 4 },
  shopBtnText: { color: '#fff', fontSize: 15, fontFamily: 'DMSans_700Bold' },
});
