import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BellIcon } from '../icons/BellIcon';

const ORANGE = '#F4A94E';
const TEAL = '#4AB7B6';

interface HomeHeaderProps {
  onBellPress?: () => void;
}

export function HomeHeader({ onBellPress }: HomeHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
      {/* Logo */}
      <Text style={styles.logo}>
        <Text style={{ color: ORANGE }}>Shop</Text>
        <Text style={{ color: TEAL }}>Ease</Text>
      </Text>

      {/* Bell */}
      <Pressable onPress={onBellPress} style={styles.bellBtn}>
        <BellIcon size={22} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  logo: {
    fontSize: 22,
    fontFamily: 'DMSans_700Bold',
  },
  bellBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FFF0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
