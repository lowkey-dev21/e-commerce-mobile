import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { Product } from '../../services/api';
import { useTheme } from '../../hooks/useTheme';
import { useWishlistStore } from '../../store/wishlistStore';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 52) / 2;
const ORANGE = '#4AB7B6';

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill={filled ? ORANGE : 'none'}>
      <Path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
        stroke={ORANGE}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface ArrivalCardProps {
  product: Product;
}

export function ArrivalCard({ product }: ArrivalCardProps) {
  const router = useRouter();
  const colors = useTheme();
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product._id);

  return (
    <Pressable
      onPress={() => router.push(`/product/${product._id}`)}
      style={[styles.card, { backgroundColor: colors.card }]}
    >
      {/* Image area */}
      <View style={[styles.imageWrap, { backgroundColor: colors.skeleton }]}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
        <Pressable
          onPress={() => toggle({ id: product._id, name: product.name, price: product.price, rating: product.rating, image: { uri: product.image } })}
          style={[styles.heartBtn, { backgroundColor: colors.background }]}
        >
          <HeartIcon filled={wishlisted} />
        </Pressable>
      </View>

      {/* Info */}
      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>{product.name}</Text>
        <Text style={[styles.brand, { color: colors.textSecondary }]} numberOfLines={1}>{product.category}</Text>
        <Text style={[styles.price, { color: colors.text }]}>₹{product.price.toLocaleString()}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageWrap: {
    width: '100%',
    height: CARD_WIDTH,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  info: {
    padding: 10,
    paddingTop: 8,
  },
  name: {
    fontSize: 13,
    fontFamily: 'DMSans_700Bold',
    lineHeight: 18,
    marginBottom: 2,
  },
  brand: {
    fontSize: 11,
    fontFamily: 'DMSans_400Regular',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    fontFamily: 'DMSans_700Bold',
  },
});
