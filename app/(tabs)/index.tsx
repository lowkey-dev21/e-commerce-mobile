import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Text,
  Pressable,
  RefreshControl,
} from 'react-native';
import { productService, Product } from '../../services/api';
import { ProductCard } from '../../components/ProductCard';
import { SkeletonCard } from '../../components/SkeletonCard';
import { ErrorState } from '../../components/ErrorState';
import { EmptyState } from '../../components/EmptyState';
import { useTheme } from '../../hooks/useTheme';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home', 'Sports', 'Books'];

export default function HomeScreen() {
  const colors = useTheme();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const fetchProducts = useCallback(async (category?: string) => {
    try {
      setError(null);
      const res = await productService.getAll({ category });
      setProducts(res.data.data);
    } catch (e: any) {
      setError(e.message || 'Failed to load products');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts(selectedCategory);
  };

  const onCategoryPress = (cat: string) => {
    setSelectedCategory(cat);
    setLoading(true);
  };

  if (error && !refreshing) {
    return (
      <ErrorState
        message={error}
        onRetry={() => {
          setLoading(true);
          fetchProducts(selectedCategory);
        }}
      />
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categories}
        style={[styles.categoriesBar, { backgroundColor: colors.background }]}
      >
        {CATEGORIES.map((cat) => (
          <Pressable
            key={cat}
            onPress={() => onCategoryPress(cat)}
            style={[
              styles.categoryChip,
              {
                backgroundColor: selectedCategory === cat ? colors.primary : colors.card,
                borderColor: selectedCategory === cat ? colors.primary : colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                { color: selectedCategory === cat ? '#fff' : colors.textSecondary },
              ]}
            >
              {cat}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Product Grid */}
      {loading ? (
        <View style={styles.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </View>
      ) : products.length === 0 ? (
        <EmptyState
          icon="📦"
          title="No products found"
          subtitle="Try selecting a different category"
        />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <ProductCard product={item} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  categoriesBar: { maxHeight: 60, flexGrow: 0 },
  categories: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: { fontSize: 13, fontFamily: 'DMSans_500Medium' },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 16,
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  list: { paddingHorizontal: 16, paddingTop: 8 },
  row: { justifyContent: 'space-between' },
});
