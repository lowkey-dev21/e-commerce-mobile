import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { useThemeStore } from '../../store/themeStore';
import { SunIcon } from '../../components/icons/SunIcon';
import { MoonIcon } from '../../components/icons/MoonIcon';
import { ClipboardIcon } from '../../components/icons/ClipboardIcon';
import { HeartIcon } from '../../components/icons/HeartIcon';
import { BellIcon } from '../../components/icons/BellIcon';
import { HelpIcon } from '../../components/icons/HelpIcon';
import { ShieldCheckIcon } from '../../components/icons/ShieldCheckIcon';
import { LogoutIcon } from '../../components/icons/LogoutIcon';
import { ScreenHeader } from '../../components/ScreenHeader';
import { MenuItem } from '../../components/MenuItem';

const TEAL = '#4AB7B6';

const USER = {
  name: 'Jonathan Doe',
  email: 'jonathan@example.com',
  phone: '+91 98765 43210',
  initials: 'J',
};

export default function ProfileScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Profile" large />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40, gap: 0 }}>

        {/* Avatar card */}
        <View style={[styles.avatarCard, { backgroundColor: colors.card }]}>
          <View style={[styles.avatar, { backgroundColor: TEAL }]}>
            <Text style={styles.avatarInitial}>{USER.initials}</Text>
          </View>
          <View style={styles.avatarInfo}>
            <Text style={[styles.userName, { color: colors.text }]}>{USER.name}</Text>
            <Text style={[styles.userEmail, { color: colors.textSecondary }]}>{USER.email}</Text>
            <Text style={[styles.userPhone, { color: colors.textSecondary }]}>{USER.phone}</Text>
          </View>
          <Pressable style={[styles.editBtn, { borderColor: TEAL }]} onPress={() => router.push('/edit-profile')}>
            <Text style={[styles.editBtnText, { color: TEAL }]}>Edit</Text>
          </Pressable>
        </View>

        {/* Menu */}
        <View style={styles.menuGroup}>
          <MenuItem
            icon={<ClipboardIcon color={TEAL} size={20} />}
            label="My Orders"
            onPress={() => router.push('/(tabs)/orders')}
          />
          <MenuItem
            icon={<HeartIcon color={TEAL} size={20} />}
            label="Wishlist"
            onPress={() => router.push('/(tabs)/wishlist')}
          />
          <MenuItem
            icon={<BellIcon color={TEAL} size={20} />}
            label="Notifications"
            onPress={() => router.push('/notifications')}
          />
          <MenuItem
            icon={isDark ? <SunIcon size={20} color={TEAL} /> : <MoonIcon size={20} color={TEAL} />}
            label={isDark ? 'Light Mode' : 'Dark Mode'}
            onPress={toggleTheme}
            right={
              <View style={[styles.toggle, { backgroundColor: isDark ? TEAL : colors.border }]}>
                <View style={[styles.toggleThumb, { transform: [{ translateX: isDark ? 18 : 0 }], backgroundColor: '#fff' }]} />
              </View>
            }
          />
          <MenuItem
            icon={<HelpIcon color={TEAL} size={20} />}
            label="Help & Support"
            onPress={() => router.push('/help-support')}
          />
          <MenuItem
            icon={<ShieldCheckIcon color={TEAL} size={20} />}
            label="Privacy Policy"
            onPress={() => {}}
          />
          <MenuItem
            icon={<LogoutIcon color="#EF4444" size={20} />}
            label="Log Out"
            danger
            onPress={() =>
              Alert.alert('Log Out', 'Are you sure you want to log out?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Log Out', style: 'destructive', onPress: () => {} },
              ])
            }
          />
        </View>

        <Text style={[styles.version, { color: colors.textSecondary }]}>ShopEase v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  avatarCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: { fontSize: 24, fontFamily: 'DMSans_700Bold', color: '#fff' },
  avatarInfo: { flex: 1 },
  userName: { fontSize: 16, fontFamily: 'DMSans_700Bold', marginBottom: 2 },
  userEmail: { fontSize: 12, fontFamily: 'DMSans_400Regular', marginBottom: 1 },
  userPhone: { fontSize: 12, fontFamily: 'DMSans_400Regular' },
  editBtn: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  editBtnText: { fontSize: 13, fontFamily: 'DMSans_500Medium' },
  menuGroup: {
    marginHorizontal: 16,
    gap: 10,
  },
  toggle: {
    width: 44,
    height: 26,
    borderRadius: 13,
    padding: 3,
    justifyContent: 'center',
  },
  toggleThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  version: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
    marginTop: 24,
  },
});
