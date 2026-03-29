import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { BellIcon } from '../icons/BellIcon';
import { SearchIcon } from '../icons/SearchIcon';
import { useTheme } from '../../hooks/useTheme';

const TEAL = '#4AB7B6';

interface HomeHeaderProps {
  name?: string;
  avatar?: string;
  onSearchPress?: () => void;
  onBellPress?: () => void;
}

export function HomeHeader({
  name = 'Jonathan',
  avatar,
  onSearchPress,
  onBellPress,
}: HomeHeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const colors = useTheme();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
      {/* Left: avatar + greeting */}
      <View style={styles.left}>
        <View style={[styles.avatar, { backgroundColor: TEAL }]}>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatarImg} />
          ) : (
            <Text style={styles.avatarInitial}>{name[0]}</Text>
          )}
        </View>
        <View>
          <Text style={[styles.greeting, { color: colors.text }]}>Hi, {name}</Text>
          <Text style={[styles.sub, { color: colors.textSecondary }]}>Let's go shopping</Text>
        </View>
      </View>

      {/* Right: search, theme toggle, bell */}
      <View style={styles.right}>
        <Pressable onPress={onSearchPress} style={styles.iconBtn}>
          <SearchIcon color={colors.text} size={22} />
        </Pressable>
        <Pressable onPress={() => router.push('/notifications')} style={styles.iconBtn}>
          <BellIcon size={22} color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatarImg: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  avatarInitial: {
    fontSize: 18,
    fontFamily: 'DMSans_700Bold',
    color: '#fff',
  },
  greeting: {
    fontSize: 15,
    fontFamily: 'DMSans_700Bold',
  },
  sub: {
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
    marginTop: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
