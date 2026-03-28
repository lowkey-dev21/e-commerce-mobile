import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../hooks/useTheme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const TEAL = '#4AB7B6';
const ORANGE = '#4AB7B6';

export interface DealProduct {
  id: string;
  name: string;
  price: number;
  rating?: number;
  discount?: string;
  image: any;
  wishlisted?: boolean;
}

interface DealProductCardProps {
  product: DealProduct;
  onPress?: () => void;
  onWishlist?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

export function DealProductCard({ product, onPress, onWishlist, onAddToCart }: DealProductCardProps) {
  const [qty, setQty] = useState(0);
  const [wishlisted, setWishlisted] = useState(product.wishlisted ?? false);
  const colors = useTheme();

  const inCart = qty > 0;

  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {/* Heart */}
      <Pressable onPress={() => { setWishlisted(!wishlisted); onWishlist?.(product.id); }} style={styles.heart}>
        <Text style={{ fontSize: 16, color: wishlisted ? '#4AB7B6' : '#DDD' }}>♥</Text>
      </Pressable>

      {/* Discount badge */}
      {product.discount && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{product.discount}</Text>
          <Text style={styles.badgeText}>OFF</Text>
        </View>
      )}

      {/* Image */}
      <Image source={product.image} style={[styles.image, { backgroundColor: colors.skeleton }]} resizeMode="contain" />

      {/* Info */}
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>{product.name}</Text>

        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: colors.text }]}>₹ {product.price.toLocaleString()}</Text>
          {product.rating && (
            <View style={styles.ratingRow}>
              <Text style={styles.star}>★</Text>
              <Text style={[styles.rating, { color: colors.textSecondary }]}>{product.rating}</Text>
            </View>
          )}
        </View>

        {/* Action */}
        {inCart ? (
          <View style={styles.qtyRow}>
            <Pressable
              onPress={() => setQty(Math.max(0, qty - 1))}
              style={styles.qtyBtn}
            >
              <Text style={styles.qtyBtnText}>−</Text>
            </Pressable>
            <Text style={[styles.qtyNum, { color: colors.text }]}>{qty}</Text>
            <Pressable
              onPress={() => setQty(qty + 1)}
              style={[styles.qtyBtn, styles.qtyBtnPlus]}
            >
              <Text style={[styles.qtyBtnText, { color: '#fff' }]}>+</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={() => { setQty(1); onAddToCart?.(product.id); }}
            style={styles.addBtn}
          >
            <Text style={styles.addBtnText}>Add to cart</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 0.8,
  },
  heart: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 2,
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#4AB7B6',
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 10,
    zIndex: 2,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 9,
    fontFamily: 'DMSans_700Bold',
    color: '#fff',
    lineHeight: 12,
  },
  image: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 13,
    fontFamily: 'DMSans_500Medium',
    marginBottom: 4,
    lineHeight: 17,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontFamily: 'DMSans_700Bold',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  star: { fontSize: 12, color: ORANGE },
  rating: { fontSize: 12, fontFamily: 'DMSans_400Regular' },
  addBtn: {
    borderWidth: 1.5,
    borderColor: ORANGE,
    borderRadius: 10,
    paddingVertical: 7,
    alignItems: 'center',
  },
  addBtnText: {
    fontSize: 12,
    fontFamily: 'DMSans_500Medium',
    color: ORANGE,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnPlus: {
    backgroundColor: TEAL,
  },
  qtyBtnText: {
    fontSize: 18,
    color: '#fff',
    lineHeight: 22,
    fontFamily: 'DMSans_700Bold',
  },
  qtyNum: {
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
  },
});
