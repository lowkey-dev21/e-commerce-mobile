import React from 'react';
import { View, Text, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from '../services/api';
import { useTheme } from '../hooks/useTheme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

type Props = { product: Product };

export const ProductCard = ({ product }: Props) => {
  const colors = useTheme();
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/product/${product._id}`)}
      style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}
    >
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.info}>
        <Text style={[styles.category, { color: colors.primary }]} numberOfLines={1}>
          {product.category}
        </Text>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
          {product.name}
        </Text>
        <View style={styles.footer}>
          <Text style={[styles.price, { color: colors.primary }]}>
            ${product.price.toFixed(2)}
          </Text>
          <View style={styles.ratingRow}>
            <Text style={[styles.star, { color: colors.star }]}>★</Text>
            <Text style={[styles.rating, { color: colors.textSecondary }]}>
              {product.rating.toFixed(1)}
            </Text>
          </View>
        </View>
        {product.stock === 0 && (
          <Text style={styles.outOfStock}>Out of stock</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#F3F4F6',
  },
  info: {
    padding: 12,
  },
  category: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  star: { fontSize: 12 },
  rating: { fontSize: 12 },
  outOfStock: {
    marginTop: 4,
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '500',
  },
});
