import { View, Text, Image, FlatList, StyleSheet, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const TEAL = '#4AB7B6';

interface Banner {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  image: any;
}

const BANNERS: Banner[] = [
  { id: '1', tag: 'Happy Weekend', title: '25% OFF', subtitle: '*for All Menus', image: require('../../assets/banner.png') },
  { id: '2', tag: 'Flash Sale', title: '40% OFF', subtitle: '*on Electronics', image: require('../../assets/banner.png') },
  { id: '3', tag: 'Special Offer', title: '15% OFF', subtitle: '*on Furniture', image: require('../../assets/banner.png') },
];

function BannerCard({ item }: { item: Banner }) {
  const colors = useTheme();
  return (
    <View style={[styles.card, { backgroundColor: colors.card }]}>
      <View style={styles.textSide}>
        <View style={styles.dotsGrid}>
          {Array.from({ length: 9 }).map((_, i) => (
            <View key={i} style={styles.decorDot} />
          ))}
        </View>
        <Text style={[styles.tag, { color: colors.textSecondary }]}>{item.tag}</Text>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>{item.subtitle}</Text>
      </View>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
    </View>
  );
}

export function BannerCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + 16));
    setActiveIndex(index);
  };

  return (
    <View>
      <FlatList
        data={BANNERS}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 16}
        decelerationRate="fast"
        contentContainerStyle={styles.list}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className='pb-4'
        renderItem={({ item }) => <BannerCard item={item} />}
      />
      {/* Dots */}
      <View className='' style={styles.dotsRow}>
        {BANNERS.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activeIndex ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 20, gap: 16 },
  card: {
    width: CARD_WIDTH,
    height: 150,
    borderRadius: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
  },
  textSide: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    overflow: 'hidden',
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
    backgroundColor: TEAL,
    opacity: 0.4,
  },
  tag: { fontSize: 12, fontFamily: 'DMSans_400Regular', marginBottom: 2 },
  title: { fontSize: 26, fontFamily: 'DMSans_700Bold', lineHeight: 30 },
  subtitle: { fontSize: 11, fontFamily: 'DMSans_400Regular', marginTop: 2 },
  image: {
    width: '48%',
    height: '100%',
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
    marginBottom: 8,
  },
  dot: {
    height: 7,
    borderRadius: 4,
  },
  dotActive: {
    width: 20,
    backgroundColor: TEAL,
  },
  dotInactive: {
    width: 7,
    backgroundColor: '#D0D0D0',
  },
});
