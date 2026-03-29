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

const DJ = 'https://cdn.dummyjson.com/products/images';

const MOCK_BY_CATEGORY: Record<string, DealProduct[]> = {
  'New Arrivals': [
    { id: '1',  name: 'Luxury Wing Chair',    price: 3599,   rating: 4.8, discount: '10%', image: { uri: `${DJ}/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/1.webp` } },
    { id: '2',  name: 'LG Washing Machine',   price: 45999,  rating: 4.6, discount: '5%',  image: { uri: 'https://loremflickr.com/300/300/washing,machine,appliance?lock=202' } },
    { id: '3',  name: 'Accent Armchair',      price: 2899,   rating: 4.5,                  image: { uri: `${DJ}/furniture/Annibale%20Colombo%20Sofa/1.webp` } },
    { id: '4',  name: 'Front Load Washer',    price: 38999,  rating: 4.7,                  image: { uri: 'https://loremflickr.com/300/300/laundry,front,loader?lock=204' } },
    { id: '5',  name: 'Classic Wingback',     price: 4299,   rating: 4.9, discount: '15%', image: { uri: 'https://loremflickr.com/300/300/armchair,velvet,wingback?lock=205' } },
    { id: '6',  name: 'Samsung Washer 8kg',   price: 52000,  rating: 4.8,                  image: { uri: 'https://loremflickr.com/300/300/washing,machine?lock=206' } },
  ],
  'Furniture': [
    { id: '1',  name: 'Luxury Wing Chair',    price: 3599,   rating: 4.8, discount: '10%', image: { uri: `${DJ}/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/1.webp` } },
    { id: '3',  name: 'Accent Armchair',      price: 2899,   rating: 4.5,                  image: { uri: `${DJ}/furniture/Annibale%20Colombo%20Sofa/1.webp` } },
    { id: '5',  name: 'Classic Wingback',     price: 4299,   rating: 4.9, discount: '15%', image: { uri: 'https://loremflickr.com/300/300/armchair,velvet,wingback?lock=205' } },
    { id: '13', name: 'L-Shape Sofa Set',     price: 28999,  rating: 4.8, discount: '10%', image: { uri: `${DJ}/furniture/Annibale%20Colombo%20Sofa/2.webp` } },
    { id: '14', name: 'King Size Bed Frame',  price: 18999,  rating: 4.6,                  image: { uri: `${DJ}/furniture/Annibale%20Colombo%20Bed/1.webp` } },
    { id: '15', name: 'Coffee Table Oak',     price: 6499,   rating: 4.4, discount: '7%',  image: { uri: `${DJ}/furniture/Bedside%20Table%20African%20Cherry/1.webp` } },
  ],
  'Appliances': [
    { id: '2',  name: 'LG Washing Machine',   price: 45999,  rating: 4.6, discount: '5%',  image: { uri: 'https://loremflickr.com/300/300/washing,machine,appliance?lock=202' } },
    { id: '4',  name: 'Front Load Washer',    price: 38999,  rating: 4.7,                  image: { uri: 'https://loremflickr.com/300/300/laundry,front,loader?lock=204' } },
    { id: '6',  name: 'Samsung Washer 8kg',   price: 52000,  rating: 4.8,                  image: { uri: 'https://loremflickr.com/300/300/washing,machine?lock=206' } },
    { id: '11', name: 'Dyson V15 Vacuum',     price: 42999,  rating: 4.7, discount: '12%', image: { uri: 'https://loremflickr.com/300/300/vacuum,dyson,cleaner?lock=211' } },
    { id: '12', name: 'Bosch Dishwasher',     price: 35999,  rating: 4.5,                  image: { uri: 'https://loremflickr.com/300/300/dishwasher,bosch?lock=212' } },
  ],
  'Electronics': [
    { id: '7',  name: 'Sony 65" OLED TV',     price: 89999,  rating: 4.9, discount: '8%',  image: { uri: 'https://loremflickr.com/300/300/smart,tv,television?lock=207' } },
    { id: '8',  name: 'MacBook Pro M3',       price: 124999, rating: 4.8,                   image: { uri: `${DJ}/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/1.webp` } },
    { id: '9',  name: 'Samsung Galaxy S25',   price: 74999,  rating: 4.7, discount: '5%',   image: { uri: `${DJ}/smartphones/Samsung%20Galaxy%20S23%20Ultra/1.webp` } },
    { id: '10', name: 'AirPods Pro 2',        price: 24999,  rating: 4.6,                   image: { uri: 'https://loremflickr.com/300/300/airpods,earbuds,wireless?lock=210' } },
  ],
  'Home & Living': [
    { id: '16', name: 'Floor Standing Lamp',  price: 3299,   rating: 4.5,                  image: { uri: 'https://loremflickr.com/300/300/floor,lamp,light?lock=216' } },
    { id: '17', name: 'Scented Candle Set',   price: 1299,   rating: 4.3,                  image: { uri: 'https://loremflickr.com/300/300/candle,scented,wax?lock=217' } },
    { id: '18', name: 'Ceramic Vase Set',     price: 2199,   rating: 4.4, discount: '20%', image: { uri: 'https://loremflickr.com/300/300/vase,ceramic,flower?lock=218' } },
    { id: '19', name: 'Wall Mirror Arch',     price: 5499,   rating: 4.7,                  image: { uri: 'https://loremflickr.com/300/300/mirror,wall,arch?lock=219' } },
    { id: '20', name: 'Kitchen Knife Set',    price: 4299,   rating: 4.6, discount: '18%', image: { uri: 'https://loremflickr.com/300/300/knife,kitchen,chef?lock=220' } },
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
