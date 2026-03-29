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

export const MOCK_ARRIVALS: DealProduct[] = [
  { id: '1',  name: 'Gucci Travel Bag',          price: 85000, rating: 4.9, discount: '5%',  image: require('../../assets/bag.png') },
  { id: '2',  name: 'Wooden Side Table',          price: 8500,  rating: 4.5,                  image: require('../../assets/bookself.png') },
  { id: '3',  name: 'Canon EOS 250D',             price: 45000, rating: 4.8, discount: '10%', image: require('../../assets/camera.png') },
  { id: '4',  name: 'Kids Electric Car',          price: 12500, rating: 4.6,                  image: require('../../assets/car-toy.png') },
  { id: '5',  name: 'Luxury Wing Chair',          price: 15999, rating: 4.8, discount: '15%', image: require('../../assets/chair.png') },
  { id: '6',  name: 'Modern Dining Chair',        price: 4999,  rating: 4.4,                  image: require('../../assets/chair2.png') },
  { id: '7',  name: 'Potato Chips Snack',         price: 299,   rating: 4.2,                  image: require('../../assets/chips.png') },
  { id: '8',  name: 'Hooded Rain Coat',           price: 3999,  rating: 4.5, discount: '20%', image: require('../../assets/coat.png') },
  { id: '9',  name: 'Curology Skincare Set',      price: 2500,  rating: 4.7,                  image: require('../../assets/cream.png') },
  { id: '10', name: 'Cesar Dog Dry Food',         price: 1800,  rating: 4.3,                  image: require('../../assets/dryfood.png') },
  { id: '11', name: 'Bomber Jacket',              price: 4500,  rating: 4.6, discount: '8%',  image: require('../../assets/jacket2.png') },
  { id: '12', name: 'Lenovo Gaming Laptop',       price: 85000, rating: 4.8,                  image: require('../../assets/laptop.png') },
  { id: '13', name: 'Wired Gaming Controller',    price: 1500,  rating: 4.3,                  image: require('../../assets/pad.png') },
  { id: '14', name: 'Fantech Wireless Gamepad',   price: 2800,  rating: 4.5,                  image: require('../../assets/pad2.png') },
  { id: '15', name: 'PS5 DualSense Controller',   price: 5500,  rating: 4.9, discount: '5%',  image: require('../../assets/pad3.png') },
  { id: '16', name: 'RGB CPU Liquid Cooler',      price: 9500,  rating: 4.7,                  image: require('../../assets/rgb.png') },
  { id: '17', name: 'Adidas Copa Cleats',         price: 8500,  rating: 4.8, discount: '12%', image: require('../../assets/soccer.png') },
  { id: '18', name: 'Fresh Strawberries 500g',    price: 350,   rating: 4.5,                  image: require('../../assets/strawberry.png') },
  { id: '19', name: 'MSI 27" Curved Monitor',     price: 35000, rating: 4.7,                  image: require('../../assets/tv.png') },
  { id: '20', name: 'Front Load Washer 8kg',      price: 48000, rating: 4.6, discount: '7%',  image: require('../../assets/washing-machine.png') },
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
