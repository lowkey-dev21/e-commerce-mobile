import { View, Text, Pressable, FlatList, StyleSheet } from 'react-native';
import { GroceriesIcon } from '../icons/GroceriesIcon';
import { ApplianceIcon } from '../icons/ApplianceIcon';
import { FashionIcon } from '../icons/FashionIcon';
import { FurnitureIcon } from '../icons/FurnitureIcon';

interface Category {
  id: string;
  name: string;
  color: string;
  icon: 'groceries' | 'appliance' | 'fashion' | 'furniture';
}

const CATEGORIES: Category[] = [
  { id: '1', name: 'Groceries', color: '#4AB7B6', icon: 'groceries' },
  { id: '2', name: 'Appliances', color: '#6B9BF2', icon: 'appliance' },
  { id: '3', name: 'Fashion', color: '#C77DFF', icon: 'fashion' },
  { id: '4', name: 'Furniture', color: '#A594F9', icon: 'furniture' },
];

function CategoryIcon({ type, size }: { type: Category['icon']; size: number }) {
  switch (type) {
    case 'groceries': return <GroceriesIcon color="white" size={size} />;
    case 'appliance': return <ApplianceIcon color="white" size={size} />;
    case 'fashion':   return <FashionIcon color="white" size={size} />;
    case 'furniture': return <FurnitureIcon color="white" size={size} />;
  }
}

function CategoryCard({ item, onPress }: { item: Category; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor: item.color }]}>
      <CategoryIcon type={item.icon} size={34} />
      <Text style={styles.name}>{item.name}</Text>
    </Pressable>
  );
}

interface CategorySectionProps {
  onCategoryPress?: (name: string) => void;
}

export function CategorySection({ onCategoryPress }: CategorySectionProps) {
  return (
    <FlatList
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <CategoryCard item={item} onPress={() => onCategoryPress?.(item.name)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingHorizontal: 16, gap: 12 },
  card: {
    width: 100,
    height: 100,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  name: {
    fontSize: 12,
    fontFamily: 'DMSans_500Medium',
    color: '#fff',
  },
});
