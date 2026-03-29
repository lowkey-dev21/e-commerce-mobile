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
    { id: 'm1', name: 'Luxury Wing Chair', price: 3599, rating: 4.8, discount: '10%', image: require('../../assets/chair.png') },
    { id: 'm2', name: 'LG Washing Machine', price: 45999, rating: 4.6, discount: '5%', image: require('../../assets/washing-machine.png') },
    { id: 'm3', name: 'Accent Armchair', price: 2899, rating: 4.5, image: require('../../assets/chair.png') },
    { id: 'm4', name: 'Front Load Washer', price: 38999, rating: 4.7, image: require('../../assets/washing-machine.png') },
    { id: 'm5', name: 'Classic Wingback', price: 4299, rating: 4.9, discount: '15%', image: require('../../assets/chair.png') },
    { id: 'm6', name: 'Samsung Washer 8kg', price: 52000, rating: 4.8, image: require('../../assets/washing-machine.png') },
  ],
  'Furniture': [
    { id: 'm1', name: 'Luxury Wing Chair', price: 3599, rating: 4.8, discount: '10%', image: require('../../assets/chair.png') },
    { id: 'm2', name: 'Accent Armchair', price: 2899, rating: 4.5, image: require('../../assets/chair.png') },
    { id: 'm3', name: 'Classic Wingback', price: 4299, rating: 4.9, discount: '15%', image: require('../../assets/chair.png') },
    { id: 'm4', name: 'Lounge Chair Pro', price: 5199, rating: 4.7, image: require('../../assets/chair.png') },
  ],
  'Appliances': [
    { id: 'm1', name: 'LG Washing Machine', price: 45999, rating: 4.6, discount: '5%', image: require('../../assets/washing-machine.png') },
    { id: 'm2', name: 'Front Load Washer', price: 38999, rating: 4.7, image: require('../../assets/washing-machine.png') },
    { id: 'm3', name: 'Samsung Washer 8kg', price: 52000, rating: 4.8, image: require('../../assets/washing-machine.png') },
    { id: 'm4', name: 'IFB Fully Automatic', price: 34999, rating: 4.5, discount: '8%', image: require('../../assets/washing-machine.png') },
  ],
  'Electronics': [
    { id: 'm1', name: 'LG Washing Machine', price: 45999, rating: 4.6, image: require('../../assets/washing-machine.png') },
    { id: 'm2', name: 'Samsung Washer 8kg', price: 52000, rating: 4.8, discount: '10%', image: require('../../assets/washing-machine.png') },
    { id: 'm3', name: 'Front Load Washer', price: 38999, rating: 4.7, image: require('../../assets/washing-machine.png') },
  ],
  'Home & Living': [
    { id: 'm1', name: 'Luxury Wing Chair', price: 3599, rating: 4.8, image: require('../../assets/chair.png') },
    { id: 'm2', name: 'LG Washing Machine', price: 45999, rating: 4.6, discount: '5%', image: require('../../assets/washing-machine.png') },
    { id: 'm3', name: 'Classic Wingback', price: 4299, rating: 4.9, image: require('../../assets/chair.png') },
    { id: 'm4', name: 'IFB Fully Automatic', price: 34999, rating: 4.5, image: require('../../assets/washing-machine.png') },
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
