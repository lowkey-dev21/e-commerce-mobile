import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  Pressable,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { productService, Product } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { AppHeader } from '../../components/AppHeader';
import { useTheme } from '../../hooks/useTheme';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home', 'Sports', 'Books'];
const SORT_OPTIONS = [
  { label: 'Newest', value: '' },
  { label: 'Price ↑', value: 'price_asc' },
  { label: 'Price ↓', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'A–Z', value: 'name' },
];

function SearchIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={8} stroke="#AFAFAF" strokeWidth={2} />
      <Path d="M21 21L16.65 16.65" stroke="#AFAFAF" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

export default function SearchScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<TextInput>(null);

  useFocusEffect(
    useCallback(() => {
      setTimeout(() => inputRef.current?.focus(), 100);
    }, [])
  );

  const doSearch = useCallback(async (q: string, cat: string, s: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await productService.getAll({
        search: q || undefined,
        category: cat !== 'All' ? cat : undefined,
        sort: s || undefined,
      });
      setProducts(res.data.data);
      setSearched(true);
    } catch (e: any) {
      setError(e.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleQueryChange = (text: string) => {
    setQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(text, category, sort), 400);
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <AppHeader
        placeholder="Search Anything..."
        value={query}
        onChangeText={handleQueryChange}
        inputRef={inputRef}
      />

      {/* ── Category chips ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => { setCategory(cat); doSearch(query, cat, sort); }}
            style={[
              styles.chip,
              {
                backgroundColor: category === cat ? colors.primary : colors.card,
                borderColor: category === cat ? colors.primary : colors.border,
              },
            ]}
          >
            <Text style={{ color: category === cat ? '#fff' : colors.textSecondary, fontSize: 13, fontFamily: 'DMSans_500Medium' }}>
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* ── Sort chips ── */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {SORT_OPTIONS.map((opt) => (
          <Pressable
            key={opt.value}
            onPress={() => { setSort(opt.value); doSearch(query, category, opt.value); }}
            style={[
              styles.chip,
              {
                backgroundColor: sort === opt.value ? colors.primaryLight : colors.card,
                borderColor: sort === opt.value ? colors.primary : colors.border,
              },
            ]}
          >
            <Text style={{ color: sort === opt.value ? colors.primary : colors.textSecondary, fontSize: 13, fontFamily: 'DMSans_500Medium' }}>
              {opt.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* ── Results ── */}
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <ErrorState message={error} onRetry={() => doSearch(query, category, sort)} />
      ) : !searched ? (
        <EmptyState icon="🔍" title="Search for products" subtitle="Type a product name or select a category to browse" />
      ) : products.length === 0 ? (
        <EmptyState icon="😔" title="No results found" subtitle="Try different keywords or remove filters" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <ProductCard product={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  chips: { paddingHorizontal: 16, gap: 8, paddingVertical: 12 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  list: { paddingHorizontal: 16, paddingTop: 8 },
  row: { justifyContent: 'space-between' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
