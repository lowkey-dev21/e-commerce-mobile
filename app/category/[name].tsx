import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { productService, Product } from '../../services/api';
import { DealProductCard, DealProduct } from '../../components/DealProductCard';
import { useTheme } from '../../hooks/useTheme';
import { BackIcon } from '../../components/icons/BackIcon';

const TEAL = '#4AB7B6';

const MOCK_BY_CATEGORY: Record<string, DealProduct[]> = {
  'New Arrivals': [
    { id: '1',  name: 'Gucci Travel Bag',        price: 85000, rating: 4.9, discount: '5%',  image: require('../../assets/bag.png') },
    { id: '2',  name: 'Wooden Side Table',        price: 8500,  rating: 4.5,                  image: require('../../assets/bookself.png') },
    { id: '3',  name: 'Canon EOS 250D',           price: 45000, rating: 4.8, discount: '10%', image: require('../../assets/camera.png') },
    { id: '4',  name: 'Kids Electric Car',        price: 12500, rating: 4.6,                  image: require('../../assets/car-toy.png') },
    { id: '5',  name: 'Luxury Wing Chair',        price: 15999, rating: 4.8, discount: '15%', image: require('../../assets/chair.png') },
    { id: '6',  name: 'Modern Dining Chair',      price: 4999,  rating: 4.4,                  image: require('../../assets/chair2.png') },
  ],
  'Furniture': [
    { id: '5',  name: 'Luxury Wing Chair',        price: 15999, rating: 4.8, discount: '15%', image: require('../../assets/chair.png') },
    { id: '6',  name: 'Modern Dining Chair',      price: 4999,  rating: 4.4,                  image: require('../../assets/chair2.png') },
    { id: '2',  name: 'Wooden Side Table',        price: 8500,  rating: 4.5,                  image: require('../../assets/bookself.png') },
  ],
  'Appliances': [
    { id: '20', name: 'Front Load Washer 8kg',    price: 48000, rating: 4.6, discount: '7%',  image: require('../../assets/washing-machine.png') },
  ],
  'Electronics': [
    { id: '12', name: 'Lenovo Gaming Laptop',     price: 85000, rating: 4.8,                  image: require('../../assets/laptop.png') },
    { id: '19', name: 'MSI 27" Curved Monitor',   price: 35000, rating: 4.7,                  image: require('../../assets/tv.png') },
    { id: '3',  name: 'Canon EOS 250D',           price: 45000, rating: 4.8, discount: '10%', image: require('../../assets/camera.png') },
    { id: '13', name: 'Wired Gaming Controller',  price: 1500,  rating: 4.3,                  image: require('../../assets/pad.png') },
    { id: '14', name: 'Fantech Wireless Gamepad', price: 2800,  rating: 4.5,                  image: require('../../assets/pad2.png') },
    { id: '15', name: 'PS5 DualSense Controller', price: 5500,  rating: 4.9, discount: '5%',  image: require('../../assets/pad3.png') },
    { id: '16', name: 'RGB CPU Liquid Cooler',    price: 9500,  rating: 4.7,                  image: require('../../assets/rgb.png') },
  ],
  'Home & Living': [
    { id: '9',  name: 'Curology Skincare Set',    price: 2500,  rating: 4.7,                  image: require('../../assets/cream.png') },
    { id: '7',  name: 'Potato Chips Snack',       price: 299,   rating: 4.2,                  image: require('../../assets/chips.png') },
    { id: '18', name: 'Fresh Strawberries 500g',  price: 350,   rating: 4.5,                  image: require('../../assets/strawberry.png') },
    { id: '10', name: 'Cesar Dog Dry Food',       price: 1800,  rating: 4.3,                  image: require('../../assets/dryfood.png') },
  ],
};


export default function CategoryScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useTheme();

  const [products, setProducts] = useState<Product[]>([]);
  const [mockProducts, setMockProducts] = useState<DealProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const isNewArrivals = name === 'New Arrivals';
        const res = await productService.getAll({
          category: isNewArrivals ? undefined : name,
          sort: isNewArrivals ? '' : undefined,
        });
        setProducts(res.data.data);
      } catch {
        setMockProducts(MOCK_BY_CATEGORY[name!] ?? MOCK_BY_CATEGORY['New Arrivals']);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [name]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <BackIcon color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>{name}</Text>
        <View style={{ width: 40 }} />
      </View>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={TEAL} />
        </View>
      ) : products.length > 0 ? (
        /* API products */
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <DealProductCard product={{ id: item._id, name: item.name, price: item.price, rating: item.rating, image: { uri: item.image } }} />
          )}
        />
      ) : mockProducts.length > 0 ? (
        /* Mock fallback */
        <FlatList
          data={mockProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <DealProductCard product={item} />}
        />
      ) : (
        <View style={styles.loader}>
          <Text style={{ fontSize: 40 }}>📦</Text>
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>No products found</Text>
        </View>
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
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontFamily: 'DMSans_700Bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    fontFamily: 'DMSans_400Regular',
  },
  list: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
});
