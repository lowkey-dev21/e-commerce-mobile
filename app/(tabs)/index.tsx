import React, { useState, useCallback, useRef } from 'react';
import {
  ScrollView, View, StyleSheet, ActivityIndicator, Text, Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../../hooks/useTheme';
import { HomeHeader } from '../../components/home/HomeHeader';
import { BannerCarousel } from '../../components/home/BannerCarousel';
import { CategorySection } from '../../components/home/CategorySection';
import { SectionHeader } from '../../components/SectionHeader';
import { AppHeader } from '../../components/AppHeader';
import { DealProductCard, DealProduct } from '../../components/DealProductCard';
import { ProductCard } from '../../components/ProductCard';
import { productService, Product } from '../../services/api';

const TEAL = '#4AB7B6';
const TABS = ['Home', 'Category'] as const;

const MOCK_ARRIVALS: DealProduct[] = [
  { id: '1', name: 'Luxury Wing Chair', price: 3599, rating: 4.8, image: require('../../assets/chair.png'), discount: '10%' },
  { id: '2', name: 'LG Washing Machine', price: 45999, rating: 4.6, image: require('../../assets/washing-machine.png'), discount: '5%' },
  { id: '3', name: 'Accent Armchair', price: 2899, rating: 4.5, image: require('../../assets/chair.png') },
  { id: '4', name: 'Front Load Washer', price: 38999, rating: 4.7, image: require('../../assets/washing-machine.png') },
  { id: '5', name: 'Classic Wingback', price: 4299, rating: 4.9, image: require('../../assets/chair.png'), discount: '15%' },
  { id: '6', name: 'Samsung Washer 8kg', price: 52000, rating: 4.8, image: require('../../assets/washing-machine.png') },
];
type TabType = typeof TABS[number];

export default function HomeScreen() {
  const router = useRouter();
  const colors = useTheme();
  const [activeTab, setActiveTab] = useState<TabType>('Home');
  const [searchVisible, setSearchVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback(async (text: string) => {
    if (!text.trim()) { setSearchResults([]); return; }
    setSearchLoading(true);
    try {
      const res = await productService.getAll({ search: text });
      setSearchResults(res.data.data);
    } catch {
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const handleQueryChange = (text: string) => {
    setQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(text), 400);
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
          /* ── Search results ── */
          isSearching ? (
            searchLoading ? (
              <View style={styles.loader}>
                <ActivityIndicator size="large" color={TEAL} />
              </View>
            ) : searchResults.length === 0 ? (
              <View style={styles.loader}>
                <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                  No results for "{query}"
                </Text>
              </View>
            ) : (
              <View style={styles.grid}>
                {searchResults.map((item) => (
                  <ProductCard key={item._id} product={item} />
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
          /* ── Home tab ── */
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
          /* ── Category tab ── */
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
