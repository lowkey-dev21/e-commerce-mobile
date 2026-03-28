import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path, Line } from 'react-native-svg';
import { BellIcon } from '../icons/BellIcon';
import { SunIcon } from '../icons/SunIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { useThemeStore } from '../../store/themeStore';
import { useTheme } from '../../hooks/useTheme';

const ORANGE = '#4AB7B6';
const TEAL = '#4AB7B6';

function SearchIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

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
  const { isDark, toggleTheme } = useThemeStore();
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
          <SearchIcon color={colors.text} />
        </Pressable>
        <Pressable onPress={toggleTheme} style={styles.iconBtn}>
          {isDark ? <SunIcon size={22} color={TEAL} /> : <MoonIcon size={22} color={colors.text} />}
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
