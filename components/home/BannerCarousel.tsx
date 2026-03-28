import { View, Text, Image, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;

interface Banner {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  caption: string;
  image: any;
}

const BANNERS: Banner[] = [
  {
    id: '1',
    tag: 'Happy Weekend',
    title: '25% OFF',
    subtitle: '*for All Menus',
    caption: '',
    image: require('../../assets/banner.png'),
  },
  {
    id: '2',
    tag: 'Flash Sale',
    title: '40% OFF',
    subtitle: '*on Electronics',
    caption: '',
    image: require('../../assets/banner.png'),
  },
];

function BannerCard({ item }: { item: Banner }) {
  return (
    <View style={styles.card}>
      {/* Text side */}
      <View style={styles.textSide}>
        <View style={styles.dotsGrid}>
          {Array.from({ length: 9 }).map((_, i) => (
            <View key={i} style={styles.dot} />
          ))}
        </View>
        <Text style={styles.tag}>{item.tag}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
      </View>

      {/* Image side */}
      <Image source={item.image} style={styles.image} resizeMode="cover" />
    </View>
  );
}

export function BannerCarousel() {
  return (
    <FlatList
      data={BANNERS}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToInterval={CARD_WIDTH + 16}
      decelerationRate="fast"
      contentContainerStyle={styles.list}
      renderItem={({ item }) => <BannerCard item={item} />}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 16, gap: 16 },
  card: {
    width: CARD_WIDTH,
    height: 150,
    borderRadius: 16,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  textSide: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  dotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 36,
    gap: 4,
    marginBottom: 8,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4AB7B6',
    opacity: 0.5,
  },
  tag: {
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
    color: '#555',
    marginBottom: 2,
  },
  title: {
    fontSize: 26,
    fontFamily: 'DMSans_700Bold',
    color: '#1A1A1A',
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: 'DMSans_400Regular',
    color: '#777',
    marginTop: 2,
  },
  image: {
    width: '48%',
    height: '100%',
  },
});
