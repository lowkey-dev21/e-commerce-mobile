import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const TEAL = '#4AB7B6';
const ORANGE = '#F4A94E';

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
  onWishlist?: (id: string) => void;
  onAddToCart?: (id: string) => void;
}

export function DealProductCard({ product, onWishlist, onAddToCart }: DealProductCardProps) {
  const [qty, setQty] = useState(0);
  const [wishlisted, setWishlisted] = useState(product.wishlisted ?? false);

  const inCart = qty > 0;

  return (
    <View style={styles.card}>
      {/* Heart */}
      <Pressable onPress={() => { setWishlisted(!wishlisted); onWishlist?.(product.id); }} style={styles.heart}>
        <Text style={{ fontSize: 16, color: wishlisted ? '#F4A94E' : '#DDD' }}>♥</Text>
      </Pressable>

      {/* Discount badge */}
      {product.discount && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{product.discount}</Text>
          <Text style={styles.badgeText}>OFF</Text>
        </View>
      )}

      {/* Image */}
      <Image source={product.image} style={styles.image} resizeMode="contain" />

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>{product.name}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>₹ {product.price.toLocaleString()}</Text>
          {product.rating && (
            <View style={styles.ratingRow}>
              <Text style={styles.star}>★</Text>
              <Text style={styles.rating}>{product.rating}</Text>
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
            <Text style={styles.qtyNum}>{qty}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
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
    backgroundColor: '#F4A94E',
    paddingHorizontal: 6,
    paddingVertical: 4,
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
    backgroundColor: '#F8F8F8',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 13,
    fontFamily: 'DMSans_500Medium',
    color: '#1A1A1A',
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
    color: '#1A1A1A',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  star: { fontSize: 12, color: ORANGE },
  rating: { fontSize: 12, fontFamily: 'DMSans_400Regular', color: '#888' },
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
    backgroundColor: '#F4A94E',
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
    color: '#1A1A1A',
  },
});
