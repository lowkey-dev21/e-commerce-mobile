import { View, Text, Image, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 110;
const TEAL = '#4AB7B6';

interface Category {
  id: string;
  name: string;
  count: string;
  image: any;
  imageOnRight: boolean;
}

const CATEGORIES: Category[] = [
  { id: '1', name: 'New Arrivals', count: '208 Products', image: require('../../assets/chair.png'), imageOnRight: true },
  { id: '2', name: 'Furniture', count: '358 Products', image: require('../../assets/chair.png'), imageOnRight: false },
  { id: '3', name: 'Appliances', count: '160 Products', image: require('../../assets/washing-machine.png'), imageOnRight: true },
  { id: '4', name: 'Electronics', count: '230 Products', image: require('../../assets/washing-machine.png'), imageOnRight: false },
  { id: '5', name: 'Home & Living', count: '140 Products', image: require('../../assets/chair.png'), imageOnRight: true },
];

function CategoryCard({ item }: { item: Category }) {
  const colors = useTheme();

  const textSide = (
    <View style={styles.textSide}>
      <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
      <Text style={[styles.count, { color: colors.textSecondary }]}>{item.count}</Text>
    </View>
  );

  const imageSide = (
    <View style={[styles.imageSide, { backgroundColor: colors.skeleton }]}>
      <Image source={item.image} style={styles.image} resizeMode="cover" />
    </View>
  );

  return (
    <Pressable style={[styles.card, { backgroundColor: colors.card }]}>
      {item.imageOnRight ? (
        <>
          {textSide}
          {imageSide}
        </>
      ) : (
        <>
          {imageSide}
          {textSide}
        </>
      )}
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
  container: {
    paddingHorizontal: 20,
    gap: 12,
    paddingBottom: 100,
  },
  card: {
    width: '100%',
    height: CARD_HEIGHT,
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  textSide: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
    marginBottom: 4,
  },
  count: {
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
  },
  imageSide: {
    width: '45%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
