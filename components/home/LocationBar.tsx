import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LocationIcon } from '../icons/LocationIcon';

const TEAL = '#4AB7B6';

interface LocationBarProps {
  city?: string;
  address?: string;
  onPress?: () => void;
}

export function LocationBar({
  city = 'Bengaluru',
  address = 'BTM Layout, 500628',
  onPress,
}: LocationBarProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.iconCircle}>
        <LocationIcon color="white" size={20} />
      </View>

      <View style={styles.textCol}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.address}>{address}</Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    gap: 12,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCol: { flex: 1 },
  city: {
    fontSize: 14,
    fontFamily: 'DMSans_700Bold',
    color: '#1A1A1A',
  },
  address: {
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
    color: '#888',
    marginTop: 1,
  },
  arrow: {
    fontSize: 22,
    color: '#888',
    marginRight: 4,
  },
});
