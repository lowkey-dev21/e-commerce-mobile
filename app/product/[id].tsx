import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
  Dimensions,
  Animated,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { productService, Product } from '../../services/api';
import { useCartStore } from '../../store/cartStore';
import { ErrorState } from '../../components/ErrorState';
import { useTheme } from '../../hooks/useTheme';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useTheme();
  const navigation = useNavigation();
  const { addItem, items } = useCartStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const scale = useRef(new Animated.Value(1)).current;

  const cartItem = product ? items.find((i) => i.product._id === product._id) : null;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await productService.getById(id!);
        setProduct(res.data.data);
        navigation.setOptions({ title: res.data.data.name });
      } catch (e: any) {
        setError(e.message || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product, quantity);
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.2, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
    ]).start();
    Alert.alert('Added to Cart!', `${quantity}x ${product.name} added to your cart.`);
  };

  if (loading) {
    return (
      <View style={[styles.loading, { backgroundColor: colors.background }]}>
        <Text style={{ fontSize: 32 }}>⏳</Text>
      </View>
    );
  }

  if (error || !product) {
    return <ErrorState message={error || 'Product not found'} />;
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Product Image */}
      <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />

      <View style={styles.content}>
        {/* Category + Rating */}
        <View style={styles.metaRow}>
          <View style={[styles.categoryBadge, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.categoryText, { color: colors.primary }]}>
              {product.category}
            </Text>
          </View>
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Text
                key={star}
                style={{ fontSize: 14, color: star <= Math.round(product.rating) ? colors.star : colors.border }}
              >
                ★
              </Text>
            ))}
            <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
              {product.rating.toFixed(1)} ({product.reviewCount.toLocaleString()})
            </Text>
          </View>
        </View>

        {/* Name */}
        <Text style={[styles.name, { color: colors.text }]}>
          {product.name}
        </Text>

        {/* Price */}
        <Text style={[styles.price, { color: colors.primary }]}>
          ${product.price.toFixed(2)}
        </Text>

        {/* Stock */}
        <Text
          style={[
            styles.stock,
            { color: product.stock > 0 ? colors.success : colors.error },
          ]}
        >
          {product.stock > 0 ? `✓ In stock (${product.stock} available)` : '✗ Out of stock'}
        </Text>

        {/* Description */}
        <View>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {product.description}
          </Text>
        </View>

        {/* Quantity Selector */}
        {product.stock > 0 && (
          <View style={styles.qtySection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Quantity</Text>
            <View style={styles.qtyRow}>
              <Pressable
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                style={[styles.qtyBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
              >
                <Text style={[styles.qtyBtnText, { color: colors.text }]}>−</Text>
              </Pressable>
              <Text style={[styles.qty, { color: colors.text }]}>{quantity}</Text>
              <Pressable
                onPress={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                style={[styles.qtyBtn, { borderColor: colors.border, backgroundColor: colors.card }]}
              >
                <Text style={[styles.qtyBtnText, { color: colors.text }]}>+</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* Add to Cart */}
        <Animated.View style={{ transform: [{ scale }] }}>
          <Pressable
            onPress={handleAddToCart}
            disabled={product.stock === 0}
            style={[
              styles.addBtn,
              { backgroundColor: product.stock === 0 ? colors.border : colors.primary },
            ]}
          >
            <Text style={styles.addBtnText}>
              {product.stock === 0
                ? 'Out of Stock'
                : cartItem
                ? `Update Cart (${cartItem.quantity} in cart)`
                : 'Add to Cart 🛒'}
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: { width, height: 320 },
  content: { padding: 20 },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  categoryBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 20 },
  categoryText: { fontSize: 12, fontWeight: '700', textTransform: 'uppercase' },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: 13, marginLeft: 4 },
  name: { fontSize: 24, fontWeight: '800', lineHeight: 32, marginBottom: 10 },
  price: { fontSize: 28, fontWeight: '800', marginBottom: 8 },
  stock: { fontSize: 13, fontWeight: '600', marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  description: { fontSize: 15, lineHeight: 24, marginBottom: 24 },
  qtySection: { marginBottom: 24 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', gap: 20 },
  qtyBtn: {
    width: 42,
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: { fontSize: 20, fontWeight: '600' },
  qty: { fontSize: 20, fontWeight: '700', minWidth: 28, textAlign: 'center' },
  addBtn: {
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 32,
  },
  addBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
