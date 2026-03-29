import React, { useState, useRef } from 'react';
import {
  ScrollView, View, StyleSheet, Text, Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { HomeHeader } from '../../components/home/HomeHeader';
import { BannerCarousel } from '../../components/home/BannerCarousel';
import { CategorySection } from '../../components/home/CategorySection';
import { SectionHeader } from '../../components/SectionHeader';
import { AppHeader } from '../../components/AppHeader';
import { DealProductCard, DealProduct } from '../../components/DealProductCard';

const TEAL = '#4AB7B6';
const TABS = ['Home', 'Category'] as const;

const DJ = 'https://cdn.dummyjson.com/products/images';

export const MOCK_ARRIVALS: DealProduct[] = [
  { id: '1',  name: 'Luxury Wing Chair',    price: 3599,   rating: 4.8, discount: '10%', image: { uri: `${DJ}/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/1.webp` } },
  { id: '2',  name: 'LG Washing Machine',  price: 45999,  rating: 4.6, discount: '5%',  image: { uri: 'https://loremflickr.com/300/300/washing,machine,appliance?lock=202' } },
  { id: '3',  name: 'Accent Armchair',     price: 2899,   rating: 4.5,                  image: { uri: `${DJ}/furniture/Annibale%20Colombo%20Sofa/1.webp` } },
  { id: '4',  name: 'Front Load Washer',   price: 38999,  rating: 4.7,                  image: { uri: 'https://loremflickr.com/300/300/laundry,front,loader?lock=204' } },
  { id: '5',  name: 'Classic Wingback',    price: 4299,   rating: 4.9, discount: '15%', image: { uri: 'https://loremflickr.com/300/300/armchair,velvet,wingback?lock=205' } },
  { id: '6',  name: 'Samsung Washer 8kg',  price: 52000,  rating: 4.8,                  image: { uri: 'https://loremflickr.com/300/300/washing,machine?lock=206' } },
  { id: '7',  name: 'Sony 65" OLED TV',    price: 89999,  rating: 4.9, discount: '8%',  image: { uri: 'https://loremflickr.com/300/300/smart,tv,television?lock=207' } },
  { id: '8',  name: 'MacBook Pro M3',      price: 124999, rating: 4.8,                  image: { uri: `${DJ}/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/1.webp` } },
  { id: '9',  name: 'Samsung Galaxy S25',  price: 74999,  rating: 4.7, discount: '5%',  image: { uri: `${DJ}/smartphones/Samsung%20Galaxy%20S23%20Ultra/1.webp` } },
  { id: '10', name: 'AirPods Pro 2',       price: 24999,  rating: 4.6,                  image: { uri: 'https://loremflickr.com/300/300/airpods,earbuds,wireless?lock=210' } },
  { id: '11', name: 'Dyson V15 Vacuum',    price: 42999,  rating: 4.7, discount: '12%', image: { uri: 'https://loremflickr.com/300/300/vacuum,dyson,cleaner?lock=211' } },
  { id: '12', name: 'Bosch Dishwasher',    price: 35999,  rating: 4.5,                  image: { uri: 'https://loremflickr.com/300/300/dishwasher,bosch?lock=212' } },
  { id: '13', name: 'L-Shape Sofa Set',    price: 28999,  rating: 4.8, discount: '10%', image: { uri: `${DJ}/furniture/Annibale%20Colombo%20Sofa/2.webp` } },
  { id: '14', name: 'King Size Bed Frame', price: 18999,  rating: 4.6,                  image: { uri: `${DJ}/furniture/Annibale%20Colombo%20Bed/1.webp` } },
  { id: '15', name: 'Coffee Table Oak',    price: 6499,   rating: 4.4, discount: '7%',  image: { uri: `${DJ}/furniture/Bedside%20Table%20African%20Cherry/1.webp` } },
  { id: '16', name: 'Floor Standing Lamp', price: 3299,   rating: 4.5,                  image: { uri: 'https://loremflickr.com/300/300/floor,lamp,light?lock=216' } },
  { id: '17', name: 'Scented Candle Set',  price: 1299,   rating: 4.3,                  image: { uri: 'https://loremflickr.com/300/300/candle,scented,wax?lock=217' } },
  { id: '18', name: 'Ceramic Vase Set',    price: 2199,   rating: 4.4, discount: '20%', image: { uri: 'https://loremflickr.com/300/300/vase,ceramic,flower?lock=218' } },
  { id: '19', name: 'Wall Mirror Arch',    price: 5499,   rating: 4.7,                  image: { uri: 'https://loremflickr.com/300/300/mirror,wall,arch?lock=219' } },
  { id: '20', name: 'Kitchen Knife Set',   price: 4299,   rating: 4.6, discount: '18%', image: { uri: 'https://loremflickr.com/300/300/knife,kitchen,chef?lock=220' } },
];

type TabType = typeof TABS[number];

export default function HomeScreen() {
  const router = useRouter();
  const colors = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [searchVisible, setSearchVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<DealProduct[]>([]);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filterProducts = (text: string) => {
    if (!text.trim()) { setSearchResults([]); return; }
    const q = text.toLowerCase();
    setSearchResults(MOCK_ARRIVALS.filter((p) => p.name.toLowerCase().includes(q)));
  };

  const handleQueryChange = (text: string) => {
    setQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => filterProducts(text), 300);
  };

  const handleSearchClose = () => {
    setSearchVisible(false);
    setQuery('');
    setSearchResults([]);
  };

  const isSearching = query.trim().length > 0;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>

      {/* Header */}
      {searchVisible ? (
        <AppHeader
          placeholder="Search Anything..."
          withBackground={false}
          value={query}
          onChangeText={handleQueryChange}
          showClose
          onClose={handleSearchClose}
        />
      ) : (
        <HomeHeader onSearchPress={() => setSearchVisible(true)} />
      )}

      {/* In-page tab bar */}
      {!searchVisible && (
        <View style={[styles.tabBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
          {TABS.map((tab) => (
            <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.tabItem}>
              <Text style={[styles.tabLabel, { color: activeTab === tab ? TEAL : colors.textSecondary }]}>
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.tabUnderline} />}
            </Pressable>
          ))}
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.background }}
        keyboardShouldPersistTaps="handled"
      >
        {searchVisible ? (
          isSearching ? (
            searchResults.length === 0 ? (
              <View style={styles.loader}>
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  No results for "{query}"
                </Text>
              </View>
            ) : (
              <View style={styles.grid}>
                {searchResults.map((item) => (
                  <DealProductCard key={item.id} product={item} onPress={() => router.push(`/product/${item.id}`)} />
                ))}
              </View>
            )
          ) : (
            <View style={styles.loader}>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Type to search products...
              </Text>
            </View>
          )
        ) : activeTab === 'Home' ? (
          <>
            <View style={styles.section}>
              <BannerCarousel />
            </View>

            <View style={styles.section}>
              <SectionHeader title="New Arrivals 🔥" onSeeAll={() => {}} />
              <View style={styles.grid}>
                {MOCK_ARRIVALS.map((product) => (
                  <DealProductCard key={product.id} product={product} onPress={() => router.push(`/product/${product.id}`)} />
                ))}
              </View>
            </View>

            <View style={{ height: 100 }} />
          </>
        ) : (
          <View style={styles.section}>
            <SectionHeader title="Categories" />
            <CategorySection />
            <View style={{ height: 100 }} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  tabItem: {
    marginRight: 28,
    paddingBottom: 12,
    paddingTop: 8,
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 15,
    fontFamily: 'DMSans_500Medium',
  },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: TEAL,
  },
  section: { marginTop: 20 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    marginTop: 4,
  },
  loader: { paddingTop: 60, alignItems: 'center' },
  emptyText: { fontSize: 15, fontFamily: 'DMSans_400Regular' },
});
