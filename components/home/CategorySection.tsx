import { View, Text, ImageBackground, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const CARD_HEIGHT = 110;

interface Category {
  id: string;
  name: string;
  count: string;
  image: string;
  gradient: readonly [string, string];
}

const CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'New Arrivals',
    count: '208 Products',
    image: 'https://loremflickr.com/700/220/shopping,new,arrivals?lock=10',
    gradient: ['rgba(74,183,182,0.88)', 'transparent'],
  },
  {
    id: '2',
    name: 'Furniture',
    count: '358 Products',
    image: 'https://loremflickr.com/700/220/furniture,sofa,living?lock=11',
    gradient: ['rgba(108,92,231,0.88)', 'transparent'],
  },
  {
    id: '3',
    name: 'Appliances',
    count: '160 Products',
    image: 'https://loremflickr.com/700/220/appliance,kitchen,home?lock=12',
    gradient: ['rgba(253,121,168,0.88)', 'transparent'],
  },
  {
    id: '4',
    name: 'Electronics',
    count: '230 Products',
    image: 'https://loremflickr.com/700/220/electronics,technology,gadgets?lock=13',
    gradient: ['rgba(0,184,148,0.88)', 'transparent'],
  },
  {
    id: '5',
    name: 'Home & Living',
    count: '140 Products',
    image: 'https://loremflickr.com/700/220/home,decor,interior?lock=14',
    gradient: ['rgba(253,203,110,0.9)', 'transparent'],
  },
];

function CategoryCard({ item }: { item: Category }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/category/${encodeURIComponent(item.name)}`)}
      style={styles.shadow}
    >
      <ImageBackground
        source={{ uri: item.image }}
        style={styles.card}
        imageStyle={styles.cardImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
        <LinearGradient
          colors={item.gradient}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.65, y: 0.5 }}
          style={styles.gradient}
        >
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.count}>{item.count}</Text>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

export function CategorySection() {
  return (
    <View style={styles.container}>
      {CATEGORIES.map((item) => (
        <CategoryCard key={item.id} item={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, gap: 12, paddingBottom: 100 },
  shadow: {
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  card: {
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: 14,
    overflow: 'hidden',
  },
  cardImage: { borderRadius: 14 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 22,
    justifyContent: 'center',
    width: '62%',
  },
  name: { fontSize: 16, fontFamily: 'DMSans_700Bold', color: '#fff', marginBottom: 4 },
  count: { fontSize: 13, fontFamily: 'DMSans_400Regular', color: 'rgba(255,255,255,0.88)' },
});
