import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from 'expo-router';
import { productService, Product } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { EmptyState } from '../../components/EmptyState';
import { ErrorState } from '../../components/ErrorState';
import { useTheme } from '../../hooks/useTheme';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home', 'Sports', 'Books'];
const SORT_OPTIONS = [
  { label: 'Newest', value: '' },
  { label: 'Price ↑', value: 'price_asc' },
  { label: 'Price ↓', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
  { label: 'A–Z', value: 'name' },
];

export default function SearchScreen() {
  const colors = useTheme();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback(
    async (q: string, cat: string, s: string) => {
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
    },
    []
  );

  const handleQueryChange = (text: string) => {
    setQuery(text);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(text, category, sort), 400);
  };

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    doSearch(query, cat, sort);
  };

  const handleSortChange = (s: string) => {
    setSort(s);
    doSearch(query, category, s);
  };

  if (error) {
    return <ErrorState message={error} onRetry={() => doSearch(query, category, sort)} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Search Bar */}
      <View style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={{ fontSize: 16 }}>🔍</Text>
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder="Search products..."
          placeholderTextColor={colors.textSecondary}
          value={query}
          onChangeText={handleQueryChange}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => handleCategoryChange(cat)}
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

      {/* Sort chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {SORT_OPTIONS.map((opt) => (
          <Pressable
            key={opt.value}
            onPress={() => handleSortChange(opt.value)}
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

      {/* Results */}
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : !searched ? (
        <EmptyState
          icon="🔍"
          title="Search for products"
          subtitle="Type a product name or select a category to browse"
        />
      ) : products.length === 0 ? (
        <EmptyState
          icon="😔"
          title="No results found"
          subtitle="Try different keywords or remove filters"
        />
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
  container: { flex: 1 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  input: { flex: 1, fontSize: 15, fontFamily: 'DMSans_400Regular' },
  chips: { paddingHorizontal: 16, gap: 8, paddingBottom: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  list: { paddingHorizontal: 16, paddingTop: 8 },
  row: { justifyContent: 'space-between' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
