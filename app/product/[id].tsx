import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, ScrollView, StyleSheet, Pressable,
  Dimensions, ActivityIndicator, FlatList,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useTheme } from '../../hooks/useTheme';
import { useThemeStore } from '../../store/themeStore';
import { productService, Product } from '../../services/api';
import { BackIcon } from '../../components/icons/BackIcon';
import { HeartIcon } from '../../components/icons/HeartIcon';
import { ShoppingBagIcon } from '../../components/icons/ShoppingBagIcon';
import { StarIcon } from '../../components/icons/StarIcon';

const { width, height } = Dimensions.get('window');
const TEAL = '#4AB7B6';
const IMAGE_HEIGHT = height * 0.48;

// Map of product IDs to their available colors (add entries when a product has color variants)
const PRODUCT_COLORS: Record<string, string[]> = {
  // example: '1': ['#A0522D', '#1A1A1A', TEAL, '#4CAF50'],
};

interface Review {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  rating: number;
  date: string;
  text: string;
}

const MOCK_REVIEWS: Review[] = [
  { id: '1', name: 'Sarah M.', initials: 'SM', avatarColor: TEAL, rating: 5, date: '12 Jan 2024', text: 'Absolutely love it! The quality exceeded my expectations. Very sturdy and looks great in my living room.' },
  { id: '2', name: 'James T.', initials: 'JT', avatarColor: '#6B9BF2', rating: 4, date: '8 Jan 2024', text: 'Great product overall. Delivery was fast and packaging was excellent. Would buy again.' },
  { id: '3', name: 'Priya K.', initials: 'PK', avatarColor: '#C77DFF', rating: 5, date: '2 Jan 2024', text: 'Perfect! Exactly as described. The material feels premium and it was easy to set up.' },
  { id: '4', name: 'David R.', initials: 'DR', avatarColor: '#A594F9', rating: 4, date: '28 Dec 2023', text: 'Very satisfied with this purchase. Good value for money. Highly recommend to everyone.' },
];

function ReviewCard({ review, colors }: { review: Review; colors: any }) {
  return (
    <View style={[reviewStyles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={reviewStyles.top}>
        <View style={[reviewStyles.avatar, { backgroundColor: review.avatarColor }]}>
          <Text style={reviewStyles.initials}>{review.initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[reviewStyles.name, { color: colors.text }]}>{review.name}</Text>
          <Text style={[reviewStyles.date, { color: colors.textSecondary }]}>{review.date}</Text>
        </View>
        <View style={reviewStyles.starsRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Text key={i} style={{ fontSize: 11, color: i < review.rating ? '#FBBF24' : colors.border }}>★</Text>
          ))}
        </View>
      </View>
      <Text style={[reviewStyles.text, { color: colors.textSecondary }]} numberOfLines={3}>
        {review.text}
      </Text>
    </View>
  );
}

const reviewStyles = StyleSheet.create({
  card: {
    width: 240,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    marginRight: 12,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 13,
    fontFamily: 'DMSans_700Bold',
    color: '#fff',
  },
  name: {
    fontSize: 13,
    fontFamily: 'DMSans_700Bold',
  },
  date: {
    fontSize: 11,
    fontFamily: 'DMSans_400Regular',
    marginTop: 1,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 1,
  },
  text: {
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
    lineHeight: 18,
  },
});

// Mock product for local IDs (no API)
function getMockProduct(id: string): Product {
  const isWasher = id === '2' || id === '4' || id === '6';
  return {
    _id: id,
    name: isWasher ? 'LG Washing Machine 8kg' : 'Luxury Wing Chair',
    description: 'Premium quality product designed for comfort and durability. This item combines modern aesthetics with practical functionality, making it a perfect addition to your home. Built with high-grade materials to ensure long-lasting performance.',
    price: isWasher ? 45999 : 3599,
    category: isWasher ? 'Appliances' : 'Furniture',
    image: '',
    stock: 12,
    rating: isWasher ? 4.6 : 4.8,
    reviewCount: isWasher ? 320 : 214,
    createdAt: new Date().toISOString(),
  };
}

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useTheme();
  const { isDark } = useThemeStore();
  const { addItem, items } = useCartStore();

  const { toggle: toggleWishlist, isWishlisted } = useWishlistStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const cartItem = product ? items.find((i) => i.product._id === product._id) : null;
  const productColors = PRODUCT_COLORS[id!] ?? [];
  const wishlisted = product ? isWishlisted(product._id) : false;
  const deliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    .toLocaleDateString('en-GB', { day: 'numeric', month: 'long' });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await productService.getById(id!);
        setProduct(res.data.data);
      } catch {
        // Fall back to mock for local IDs
        setProduct(getMockProduct(id!));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.skeleton }]}>
        <ActivityIndicator size="large" color={TEAL} />
      </View>
    );
  }

  if (!product) return null;

  const localImages: Record<string, any> = {
    '1': require('../../assets/chair.png'),
    '2': require('../../assets/washing-machine.png'),
    '3': require('../../assets/chair.png'),
    '4': require('../../assets/washing-machine.png'),
    '5': require('../../assets/chair.png'),
    '6': require('../../assets/washing-machine.png'),
  };
  const localImage = localImages[id!];
  const imageSource = localImage ? localImage : (product.image ? { uri: product.image } : null);

  const shortDesc = product.description.length > 140
    ? product.description.slice(0, 140) + '...'
    : product.description;

  return (
    <View style={[styles.screen, { backgroundColor: colors.skeleton }]}>

      {/* Floating header */}
      <View style={[styles.header, { top: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()} style={[styles.headerBtn, { backgroundColor: colors.card }]}>
          <BackIcon color={colors.text} />
        </Pressable>
        <Pressable
          onPress={() => product && toggleWishlist({ id: product._id, name: product.name, price: product.price, rating: product.rating, image: { uri: product.image } })}
          style={[styles.headerBtn, { backgroundColor: colors.card }]}
        >
          <HeartIcon filled={wishlisted} color={TEAL} size={20} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>

        {/* Product image */}
        <View style={[styles.imageContainer, { height: IMAGE_HEIGHT }]}>
          {imageSource && (
            <Image source={imageSource} style={styles.image} resizeMode="contain" />
          )}
        </View>

        {/* Bottom sheet card */}
        <View style={[styles.sheet, { backgroundColor: colors.background }]}>

          {/* Name + qty */}
          <View style={styles.nameRow}>
            <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
              {product.name}
            </Text>
            <View style={styles.qtyRow}>
              <Pressable
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                style={[styles.qtyBtn, { backgroundColor: '#1A1A1A' }]}
              >
                <Text style={[styles.qtySymbol, { color: '#fff' }]}>−</Text>
              </Pressable>
              <Text style={[styles.qtyNum, { color: colors.text }]}>{quantity}</Text>
              <Pressable
                onPress={() => setQuantity(quantity + 1)}
                style={[styles.qtyBtn, { backgroundColor: TEAL }]}
              >
                <Text style={[styles.qtySymbol, { color: '#fff' }]}>+</Text>
              </Pressable>
            </View>
          </View>

          {/* Rating + stock */}
          <View style={styles.ratingRow}>
            <StarIcon size={14} />
            <Text style={[styles.rating, { color: colors.text }]}>{product.rating.toFixed(1)}</Text>
            <Text style={[styles.reviews, { color: colors.textSecondary }]}>
              ({product.reviewCount} Review)
            </Text>
            <View style={styles.dot} />
            <Text style={[styles.stock, { color: product.stock > 0 ? TEAL : colors.error }]}>
              {product.stock > 0 ? 'Available in stock' : 'Out of stock'}
            </Text>
          </View>

          {/* Color picker — only shown when product has color variants */}
          {productColors.length > 0 && (
            <>
              <Text style={[styles.sectionLabel, { color: colors.text }]}>Color</Text>
              <View style={styles.colorRow}>
                {productColors.map((c, i) => (
                  <Pressable
                    key={c}
                    onPress={() => setSelectedColor(i)}
                    style={[
                      styles.colorCircle,
                      { backgroundColor: c },
                      selectedColor === i && styles.colorSelected,
                    ]}
                  >
                    {selectedColor === i && (
                      <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
                        <Path d="M20 6L9 17L4 12" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
                      </Svg>
                    )}
                  </Pressable>
                ))}
              </View>
            </>
          )}

          {/* Description */}
          <Text style={[styles.sectionLabel, { color: colors.text }]}>Description</Text>
          <Text style={[styles.desc, { color: colors.textSecondary }]}>
            {expanded ? product.description : shortDesc}
            {product.description.length > 140 && (
              <Text onPress={() => setExpanded(!expanded)} style={{ color: TEAL, fontFamily: 'DMSans_700Bold' }}>
                {expanded ? ' Read Less' : ' Read More'}
              </Text>
            )}
          </Text>

          {/* Reviews */}
          <View style={styles.reviewsHeader}>
            <Text style={[styles.sectionLabel, { color: colors.text, marginBottom: 0 }]}>
              Reviews ({product.reviewCount})
            </Text>
            <Pressable onPress={() => router.push(`/reviews/${id}`)}>
              <Text style={{ color: TEAL, fontSize: 13, fontFamily: 'DMSans_500Medium' }}>See All</Text>
            </Pressable>
          </View>
          <FlatList
            data={MOCK_REVIEWS}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 4 }}
            renderItem={({ item }) => <ReviewCard review={item} colors={colors} />}
            style={{ marginTop: 12 }}
          />

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Sticky bottom */}
      <View style={[styles.bottom, { backgroundColor: colors.background, paddingBottom: insets.bottom + 12, borderTopColor: colors.border }]}>
        <View>
          <Text style={[styles.priceLabel, { color: colors.textSecondary }]}>Total Price</Text>
          <Text style={[styles.price, { color: colors.text }]}>
            ₹{(product.price * quantity).toLocaleString()}
          </Text>
        </View>
        <Pressable
          onPress={() => product && addItem(product, quantity)}
          disabled={product.stock === 0}
          style={[styles.addBtn, { backgroundColor: product.stock === 0 ? colors.border : TEAL }]}
        >
          <ShoppingBagIcon color="#fff" size={22} />
          <Text style={styles.addBtnText}>
            {cartItem ? 'Update Cart' : 'Add to Cart'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
  },
  imageContainer: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.8,
    height: '85%',
  },
  sheet: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingTop: 28,
    marginTop: -28,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  name: {
    flex: 1,
    fontSize: 20,
    fontFamily: 'DMSans_700Bold',
    lineHeight: 28,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtySymbol: {
    fontSize: 18,
    lineHeight: 22,
    fontFamily: 'DMSans_500Medium',
  },
  qtyNum: {
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
    minWidth: 20,
    textAlign: 'center',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 20,
  },
  rating: {
    fontSize: 13,
    fontFamily: 'DMSans_700Bold',
  },
  reviews: {
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CCC',
  },
  stock: {
    fontSize: 13,
    fontFamily: 'DMSans_500Medium',
  },
  sectionLabel: {
    fontSize: 15,
    fontFamily: 'DMSans_700Bold',
    marginBottom: 12,
  },
  colorRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  colorCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorSelected: {
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  desc: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'DMSans_400Regular',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    borderTopWidth: 1,
  },
  priceLabel: {
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
    marginBottom: 2,
  },
  price: {
    fontSize: 22,
    fontFamily: 'DMSans_700Bold',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 20,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 15,
    fontFamily: 'DMSans_700Bold',
  },
});
