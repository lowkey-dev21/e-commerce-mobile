import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';

const TEAL = '#4AB7B6';

function BackIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function DotsIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={5} r={1.2} fill={color} />
      <Circle cx={12} cy={12} r={1.2} fill={color} />
      <Circle cx={12} cy={19} r={1.2} fill={color} />
    </Svg>
  );
}

function ChevronIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18L15 12L9 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ProfileIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.8} />
      <Path d="M4 20C4 17.3333 6.66667 15 12 15C17.3333 15 20 17.3333 20 20" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function LockIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Rect x={4} y={11} width={16} height={11} rx={2} stroke={color} strokeWidth={1.8} />
      <Circle cx={12} cy={16} r={1.5} fill={color} />
      <Path d="M12 17.5V19" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function BellIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M12 3C8.68629 3 6 5.68629 6 9V15L4 17H20L18 15V9C18 5.68629 15.3137 3 12 3Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M10 17C10 18.1046 10.8954 19 12 19C13.1046 19 14 18.1046 14 17" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function ShieldIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M12 3L4 6V12C4 16.4183 7.58172 20 12 21C16.4183 20 20 16.4183 20 12V6L12 3Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={12} cy={11} r={2} stroke={color} strokeWidth={1.8} />
      <Path d="M12 13V16" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function GlobeIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} />
      <Path d="M3 12H21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M12 3C10 7 10 17 12 21M12 3C14 7 14 17 12 21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function PolicyIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M9 12H15M9 16H13M7 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4H17M7 4C7 4 7 3 9 3H15C17 3 17 4 17 4M7 4H17" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function HelpIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} />
      <Path d="M9.5 9.5C9.5 8.11929 10.6193 7 12 7C13.3807 7 14.5 8.11929 14.5 9.5C14.5 10.8807 13.3807 12 12 12V13.5" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx={12} cy={16.5} r={1} fill={color} />
    </Svg>
  );
}

function LogoutIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M10 22H5C3.89543 22 3 21.1046 3 20V4C3 2.89543 3.89543 2 5 2H10" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M17 16L21 12L17 8" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M21 12H9" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function XIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M18 6L6 18M6 6L18 18" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function SettingRow({
  icon,
  label,
  value,
  onPress,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  onPress?: () => void;
  danger?: boolean;
}) {
  const colors = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[styles.row, { backgroundColor: colors.card }]}
    >
      <View style={[styles.rowIcon, { backgroundColor: danger ? '#FFF0F0' : TEAL + '18' }]}>{icon}</View>
      <Text style={[styles.rowLabel, { color: danger ? '#EF4444' : colors.text }]}>{label}</Text>
      {value && <Text style={[styles.rowValue, { color: colors.textSecondary }]}>{value}</Text>}
      {!danger && <ChevronIcon color={colors.textSecondary} />}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.background }]}>
          <BackIcon color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Settings</Text>
        <Pressable style={styles.dotsBtn}>
          <DotsIcon color={colors.text} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>

        {/* General */}
        <Text style={[styles.sectionLabel, { color: colors.text }]}>General</Text>
        <View style={styles.group}>
          <SettingRow icon={<ProfileIcon color={TEAL} />} label="Edit Profile" onPress={() => router.push('/edit-profile')} />
          <SettingRow icon={<LockIcon color={TEAL} />} label="Change Password" onPress={() => router.push('/change-password')} />
          <SettingRow icon={<BellIcon color={TEAL} />} label="Notifications" onPress={() => router.push('/notification-settings')} />
          <SettingRow icon={<ShieldIcon color={TEAL} />} label="Security" onPress={() => router.push('/security')} />
          <SettingRow icon={<GlobeIcon color={TEAL} />} label="Language" value="English" onPress={() => router.push('/language')} />
        </View>

        {/* Preferences */}
        <Text style={[styles.sectionLabel, { color: colors.text }]}>Preferences</Text>
        <View style={styles.group}>
          <SettingRow icon={<PolicyIcon color={TEAL} />} label="Legal and Policies" onPress={() => router.push('/legal')} />
          <SettingRow icon={<HelpIcon color={TEAL} />} label="Help & Support" onPress={() => router.push('/help-support')} />
          <SettingRow
            icon={<LogoutIcon color="#EF4444" />}
            label="Logout"
            danger
            onPress={() => setShowLogout(true)}
          />
        </View>
      </ScrollView>

      {/* Logout Modal */}
      <Modal visible={showLogout} transparent animationType="fade">
        <View style={styles.overlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
            {/* X close button */}
            <Pressable
              onPress={() => setShowLogout(false)}
              style={styles.closeBtn}
            >
              <XIcon color={colors.text} />
            </Pressable>

            <Text style={[styles.modalText, { color: colors.text }]}>
              Are you sure you want to logout?
            </Text>

            {/* Cancel button */}
            <Pressable
              onPress={() => setShowLogout(false)}
              style={styles.cancelBtn}
            >
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>

            {/* Log Out text button */}
            <Pressable
              onPress={() => {
                setShowLogout(false);
                router.back();
              }}
            >
              <Text style={styles.logoutText}>Log Out</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  dotsBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 17, fontFamily: 'DMSans_700Bold' },
  sectionLabel: {
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
    paddingTop: 24,
    paddingBottom: 10,
  },
  group: {
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 12,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  rowIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: { flex: 1, fontSize: 14, fontFamily: 'DMSans_500Medium' },
  rowValue: { fontSize: 13, fontFamily: 'DMSans_400Regular', marginRight: 4 },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    borderRadius: 20,
    marginHorizontal: 32,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    maxWidth: 360,
    position: 'relative',
  },
  closeBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  cancelBtn: {
    backgroundColor: TEAL,
    borderRadius: 14,
    paddingVertical: 14,
    width: '100%',
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#fff',
    fontFamily: 'DMSans_700Bold',
    fontSize: 15,
  },
  logoutText: {
    color: '#EF4444',
    fontSize: 14,
    fontFamily: 'DMSans_700Bold',
    marginTop: 16,
  },
});
