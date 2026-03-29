import { View, Text, ImageBackground, FlatList, StyleSheet, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const SIDE_PADDING = 20;
const GAP = 16;
const CARD_WIDTH = width - SIDE_PADDING * 2;
const ITEM_STRIDE = CARD_WIDTH + GAP; // distance between snap points
const TEAL = '#4AB7B6';

interface Banner {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  gradient: readonly [string, string];
}

const BANNERS: Banner[] = [
  {
    id: '1',
    tag: 'Happy Weekend',
    title: '25% OFF',
    subtitle: '*for All Menus',
    image: 'https://loremflickr.com/700/320/shopping,sale?lock=1',
    gradient: ['rgba(74,183,182,0.92)', 'transparent'],
  },
  {
    id: '2',
    tag: 'Flash Sale',
    title: '40% OFF',
    subtitle: '*on Electronics',
    image: 'https://loremflickr.com/700/320/electronics,gadgets?lock=2',
    gradient: ['rgba(255,107,53,0.92)', 'transparent'],
  },
  {
    id: '3',
    tag: 'Special Offer',
    title: '15% OFF',
    subtitle: '*on Furniture',
    image: 'https://loremflickr.com/700/320/furniture,interior?lock=3',
    gradient: ['rgba(108,92,231,0.92)', 'transparent'],
  },
];

function BannerCard({ item }: { item: Banner }) {
  return (
    <ImageBackground
      source={{ uri: item.image }}
      style={styles.card}
      imageStyle={styles.cardImage}
      resizeMode="cover"
    >
      <LinearGradient
        colors={item.gradient}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 0.75, y: 0.5 }}
        style={styles.gradient}
      >
        <View style={styles.dotsGrid}>
          {Array.from({ length: 9 }).map((_, i) => (
            <View key={i} style={styles.decorDot} />
          ))}
        </View>
        <Text style={styles.tag}>{item.tag}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </LinearGradient>
    </ImageBackground>
  );
}

export function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = (activeIndexRef.current + 1) % BANNERS.length;
      flatListRef.current?.scrollToOffset({ offset: next * ITEM_STRIDE, animated: true });
      activeIndexRef.current = next;
      setActiveIndex(next);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / ITEM_STRIDE);
    activeIndexRef.current = index;
    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={BANNERS}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_STRIDE}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.list}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => <BannerCard item={item} />}
      />
      <View style={styles.dotsRow}>
        {BANNERS.map((_, i) => (
          <View
            key={i}
            style={[styles.dot, i === activeIndex ? styles.dotActive : styles.dotInactive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: SIDE_PADDING, gap: GAP, paddingBottom: 4 },
  card: {
    width: CARD_WIDTH,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardImage: {
    borderRadius: 16,
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 22,
    paddingVertical: 22,
    justifyContent: 'center',
  },
  dotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 36,
    gap: 4,
    marginBottom: 8,
  },
  decorDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
    opacity: 0.5,
  },
  tag: { fontSize: 12, fontFamily: 'DMSans_400Regular', color: '#fff', marginBottom: 2, opacity: 0.9 },
  title: { fontSize: 30, fontFamily: 'DMSans_700Bold', color: '#fff', lineHeight: 34 },
  subtitle: { fontSize: 11, fontFamily: 'DMSans_400Regular', color: '#fff', marginTop: 3, opacity: 0.85 },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    marginBottom: 8,
  },
  dot: { height: 7, borderRadius: 4 },
  dotActive: { width: 20, backgroundColor: TEAL },
  dotInactive: { width: 7, backgroundColor: '#D0D0D0' },
});
