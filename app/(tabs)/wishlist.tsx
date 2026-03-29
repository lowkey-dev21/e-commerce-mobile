import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, Image, Pressable, StyleSheet,
  Dimensions, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { useWishlistStore, WishlistItem } from '../../store/wishlistStore';
import { useTheme } from '../../hooks/useTheme';
import { SearchInput } from '../../components/SearchInput';
import { HeartIcon } from '../../components/icons/HeartIcon';

const TEAL = '#4AB7B6';
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 52) / 2;

const LOCAL_IMAGES: Record<string, any> = {
  '1':  require('../../assets/bag.png'),
  '2':  require('../../assets/bookself.png'),
  '3':  require('../../assets/camera.png'),
  '4':  require('../../assets/car-toy.png'),
  '5':  require('../../assets/chair.png'),
  '6':  require('../../assets/chair2.png'),
  '7':  require('../../assets/chips.png'),
  '8':  require('../../assets/coat.png'),
  '9':  require('../../assets/cream.png'),
  '10': require('../../assets/dryfood.png'),
  '11': require('../../assets/jacket2.png'),
  '12': require('../../assets/laptop.png'),
  '13': require('../../assets/pad.png'),
  '14': require('../../assets/pad2.png'),
  '15': require('../../assets/pad3.png'),
  '16': require('../../assets/rgb.png'),
  '17': require('../../assets/soccer.png'),
  '18': require('../../assets/strawberry.png'),
  '19': require('../../assets/tv.png'),
  '20': require('../../assets/washing-machine.png'),
};

const FILTERS = ['All', 'Latest', 'Most Popular', 'Cheapest'] as const;
type Filter = typeof FILTERS[number];

function WishlistCard({ item }: { item: WishlistItem }) {
  const router = useRouter();
  const colors = useTheme();
  const { remove } = useWishlistStore();

  return (
    <Pressable
      onPress={() => router.push(`/product/${item.id}`)}
      style={[styles.card, { borderColor: colors.border }]}
    >
      {item.discount && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.discount} OFF</Text>
        </View>
      )}

      <View style={[styles.imageWrap, { backgroundColor: colors.skeleton }]}>
        <Image
          source={LOCAL_IMAGES[item.id] ?? item.image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>{item.name}</Text>
        {item.rating && (
          <View style={styles.ratingRow}>
            <Text style={{ fontSize: 11, color: '#FBBF24' }}>★</Text>
            <Text style={[styles.rating, { color: colors.textSecondary }]}>{item.rating}</Text>
          </View>
        )}
        <Text style={[styles.price, { color: colors.text }]}>${item.price.toLocaleString()}</Text>
      </View>

      <Pressable onPress={() => remove(item.id)} style={[styles.heartBtn, { backgroundColor: colors.background }]}>
        <HeartIcon color={TEAL} size={16} filled />
      </Pressable>
    </Pressable>
  );
}

export default function WishlistScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { items } = useWishlistStore();
  const [query, setQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<Filter>('All');

  const filtered = useMemo(() => {
    let result = items.filter((i) =>
      i.name.toLowerCase().includes(query.toLowerCase())
    );
    if (activeFilter === 'Latest') {
      result = [...result].reverse();
    } else if (activeFilter === 'Most Popular') {
      result = [...result].sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (activeFilter === 'Cheapest') {
      result = [...result].sort((a, b) => a.price - b.price);
    }
    return result;
  }, [items, query, activeFilter]);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.background }]}>
        <Text style={[styles.title, { color: colors.text }]}>Wishlist</Text>
        {items.length > 0 && (
          <Text style={[styles.count, { color: colors.textSecondary }]}>{items.length} items</Text>
        )}
      </View>

      {/* Search + filters — only when there are items */}
      {items.length > 0 && (
        <>
          <SearchInput value={query} onChangeText={setQuery} placeholder="Search wishlist..." />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersRow}
            style={{ flexGrow: 0 }}
          >
            {FILTERS.map((f) => {
              const active = activeFilter === f;
              return (
                <Pressable
                  key={f}
                  onPress={() => setActiveFilter(f)}
                  style={[
                    styles.chip,
                    active
                      ? { backgroundColor: TEAL, borderColor: TEAL }
                      : { backgroundColor: 'transparent', borderColor: colors.border },
                  ]}
                >
                  <Text style={[styles.chipText, { color: active ? '#fff' : colors.textSecondary }]}>
                    {f}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </>
      )}

      {items.length === 0 ? (
        <View style={styles.empty}>
          <View style={[styles.emptyRingOuter, { backgroundColor: TEAL + '12' }]}>
            <View style={[styles.emptyRingInner, { backgroundColor: TEAL + '22' }]}>
              <View style={[styles.emptyIconCircle, { backgroundColor: TEAL }]}>
                <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
                  <Path d="M12 21C12 21 4 15.5 4 9.5C4 7.01 5.91 5 8.5 5C10.24 5 11.91 6.01 12 7C12.09 6.01 13.76 5 15.5 5C18.09 5 20 7.01 20 9.5C20 15.5 12 21 12 21Z" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
                </Svg>
              </View>
            </View>
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>Your wishlist is empty</Text>
          <Text style={[styles.emptyDesc, { color: colors.textSecondary }]}>
            Tap the heart icon on any product{'\n'}to save it here.
          </Text>
          <Pressable onPress={() => router.push('/')} style={[styles.shopBtn, { backgroundColor: TEAL }]}>
            <Text style={styles.shopBtnText}>Explore Products</Text>
          </Pressable>
        </View>
      ) : filtered.length === 0 ? (
        <View style={styles.empty}>
          <View style={[styles.emptyRingOuter, { backgroundColor: TEAL + '12' }]}>
            <View style={[styles.emptyRingInner, { backgroundColor: TEAL + '22' }]}>
              <View style={[styles.emptyIconCircle, { backgroundColor: TEAL }]}>
                <Svg width={38} height={38} viewBox="0 0 24 24" fill="none">
                  <Circle cx={11} cy={11} r={7} stroke="#fff" strokeWidth={1.8} />
                  <Path d="M21 21L16.65 16.65" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" />
                  <Path d="M8 11H14M11 8V14" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" />
                </Svg>
              </View>
            </View>
          </View>
          <Text style={[styles.emptyTitle, { color: colors.text }]}>No results found</Text>
          <Text style={[styles.emptyDesc, { color: colors.textSecondary }]}>
            Try a different search term.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          extraData={activeFilter + query}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <WishlistCard item={item} />}
        />
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
  },
  title: { fontSize: 22, fontFamily: 'DMSans_700Bold' },
  count: { fontSize: 14, fontFamily: 'DMSans_400Regular' },
  filtersRow: {
    paddingHorizontal: 20,
    gap: 8,
    paddingBottom: 12,
  },
  chip: {
    paddingHorizontal: 14,
    height: 32,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipText: {
    fontSize: 13,
    fontFamily: 'DMSans_500Medium',
  },
  list: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16, gap: 0 },
  row: { justifyContent: 'space-between', marginBottom: 16 },
  card: {
    width: CARD_WIDTH,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 0.8,
  },
  badge: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: TEAL,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    zIndex: 2,
  },
  badgeText: { fontSize: 9, fontFamily: 'DMSans_700Bold', color: '#fff' },
  imageWrap: {
    width: '100%',
    height: CARD_WIDTH,
  },
  image: { width: '100%', height: '100%' },
  info: { padding: 10 },
  name: { fontSize: 13, fontFamily: 'DMSans_500Medium', lineHeight: 18, marginBottom: 4 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginBottom: 4 },
  rating: { fontSize: 11, fontFamily: 'DMSans_400Regular' },
  price: { fontSize: 14, fontFamily: 'DMSans_700Bold' },
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
    zIndex: 2,
  },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, paddingBottom: 80, paddingHorizontal: 32 },
  emptyRingOuter: {
    width: 160, height: 160, borderRadius: 80,
    alignItems: 'center', justifyContent: 'center', marginBottom: 8,
  },
  emptyRingInner: {
    width: 124, height: 124, borderRadius: 62,
    alignItems: 'center', justifyContent: 'center',
  },
  emptyIconCircle: {
    width: 90, height: 90, borderRadius: 45,
    alignItems: 'center', justifyContent: 'center',
  },
  emptyTitle: { fontSize: 20, fontFamily: 'DMSans_700Bold', textAlign: 'center' },
  emptyDesc: { fontSize: 14, fontFamily: 'DMSans_400Regular', textAlign: 'center', lineHeight: 22, color: '#999' },
  shopBtn: { paddingHorizontal: 40, paddingVertical: 14, borderRadius: 14, marginTop: 4 },
  shopBtnText: { color: '#fff', fontSize: 15, fontFamily: 'DMSans_700Bold' },
});
