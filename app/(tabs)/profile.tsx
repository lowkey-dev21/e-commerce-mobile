import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';
import { useThemeStore } from '../../store/themeStore';
import { SunIcon } from '../../components/icons/SunIcon';
import { MoonIcon } from '../../components/icons/MoonIcon';

const TEAL = '#4AB7B6';

const USER = {
  name: 'Jonathan Doe',
  email: 'jonathan@example.com',
  phone: '+91 98765 43210',
  initials: 'J',
};

function ChevronIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18L15 12L9 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MenuItem({
  icon,
  label,
  onPress,
  danger,
  right,
}: {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  danger?: boolean;
  right?: React.ReactNode;
}) {
  const colors = useTheme();
  return (
    <Pressable onPress={onPress} style={[styles.menuItem, { backgroundColor: colors.card }]}>
      <View style={[styles.menuIcon, { backgroundColor: danger ? '#FFF0F0' : TEAL + '18' }]}>
        {icon}
      </View>
      <Text style={[styles.menuLabel, { color: danger ? '#EF4444' : colors.text }]}>{label}</Text>
      {right ?? <ChevronIcon color={danger ? '#EF4444' : colors.textSecondary} />}
    </Pressable>
  );
}

function OrdersIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      {/* clipboard body */}
      <Path d="M8 4H6C4.89543 4 4 4.89543 4 6V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V6C20 4.89543 19.1046 4 18 4H16" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      {/* clip tab */}
      <Path d="M8 4C8 3.44772 8.44772 3 9 3H15C15.5523 3 16 3.44772 16 4V5C16 5.55228 15.5523 6 15 6H9C8.44772 6 8 5.55228 8 5V4Z" stroke={color} strokeWidth={1.8} />
      {/* lines */}
      <Path d="M9 12H15M9 16H13" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function HeartIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M12 21C12 21 4 15.5 4 9.5C4 7.01 5.91 5 8.5 5C10.24 5 11.91 6.01 12 7C12.09 6.01 13.76 5 15.5 5C18.09 5 20 7.01 20 9.5C20 15.5 12 21 12 21Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function BellIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      {/* bell body */}
      <Path d="M12 3C8.68629 3 6 5.68629 6 9V15L4 17H20L18 15V9C18 5.68629 15.3137 3 12 3Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      {/* clapper */}
      <Path d="M10 17C10 18.1046 10.8954 19 12 19C13.1046 19 14 18.1046 14 17" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function HelpIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} />
      <Path d="M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.8807 13.3807 12 12 12V13.5" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx={12} cy={16.5} r={1} fill={color} />
    </Svg>
  );
}

function PrivacyIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      {/* shield outline */}
      <Path d="M12 3L4 6V12C4 16.4183 7.58172 20 12 21C16.4183 20 20 16.4183 20 12V6L12 3Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      {/* checkmark inside */}
      <Path d="M9 12L11 14L15 10" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function LogoutIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      {/* door frame */}
      <Path d="M10 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H10" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      {/* arrow out */}
      <Path d="M17 16L21 12L17 8" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M21 12H9" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export default function ProfileScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>Profile</Text>
      </View>

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
            icon={<OrdersIcon color={TEAL} />}
            label="My Orders"
            onPress={() => router.push('/(tabs)/orders')}
          />

          <MenuItem
            icon={<HeartIcon color={TEAL} />}
            label="Wishlist"
            onPress={() => router.push('/(tabs)/wishlist')}
          />
          <MenuItem
            icon={<BellIcon color={TEAL} />}
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
            icon={<HelpIcon color={TEAL} />}
            label="Help & Support"
            onPress={() => {}}
          />
          <MenuItem
            icon={<PrivacyIcon color={TEAL} />}
            label="Privacy Policy"
            onPress={() => {}}
          />
          <MenuItem
            icon={<LogoutIcon color="#EF4444" />}
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
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  title: { fontSize: 22, fontFamily: 'DMSans_700Bold' },
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
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  menuIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuLabel: { flex: 1, fontSize: 14, fontFamily: 'DMSans_500Medium' },
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
