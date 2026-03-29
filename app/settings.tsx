import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../hooks/useTheme';
import { ScreenHeader } from '../components/ScreenHeader';
import { MenuItem } from '../components/MenuItem';
import { DotsVerticalIcon } from '../components/icons/DotsVerticalIcon';
import { PersonIcon } from '../components/icons/PersonIcon';
import { LockIcon } from '../components/icons/LockIcon';
import { BellIcon } from '../components/icons/BellIcon';
import { ShieldIcon } from '../components/icons/ShieldIcon';
import { GlobeIcon } from '../components/icons/GlobeIcon';
import { PolicyIcon } from '../components/icons/PolicyIcon';
import { HelpIcon } from '../components/icons/HelpIcon';
import { LogoutIcon } from '../components/icons/LogoutIcon';
import { XIcon } from '../components/icons/XIcon';

const TEAL = '#4AB7B6';

export default function SettingsScreen() {
  const colors = useTheme();
  const router = useRouter();
  const [showLogout, setShowLogout] = useState(false);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="Settings"
        onBack={() => router.back()}
        right={
          <Pressable style={styles.dotsBtn}>
            <DotsVerticalIcon color={colors.text} size={22} />
          </Pressable>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>

        {/* General */}
        <Text style={[styles.sectionLabel, { color: colors.text }]}>General</Text>
        <View style={styles.group}>
          <MenuItem icon={<PersonIcon color={TEAL} size={22} />} label="Edit Profile" onPress={() => router.push('/edit-profile')} />
          <MenuItem icon={<LockIcon color={TEAL} size={22} />} label="Change Password" onPress={() => router.push('/change-password')} />
          <MenuItem icon={<BellIcon color={TEAL} size={22} />} label="Notifications" onPress={() => router.push('/notification-settings')} />
          <MenuItem icon={<ShieldIcon color={TEAL} size={22} />} label="Security" onPress={() => router.push('/security')} />
          <MenuItem icon={<GlobeIcon color={TEAL} size={22} />} label="Language" value="English" onPress={() => router.push('/language')} />
        </View>

        {/* Preferences */}
        <Text style={[styles.sectionLabel, { color: colors.text }]}>Preferences</Text>
        <View style={styles.group}>
          <MenuItem icon={<PolicyIcon color={TEAL} size={22} />} label="Legal and Policies" onPress={() => router.push('/legal')} />
          <MenuItem icon={<HelpIcon color={TEAL} size={22} />} label="Help & Support" onPress={() => router.push('/help-support')} />
          <MenuItem
            icon={<LogoutIcon color="#EF4444" size={22} />}
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
            <Pressable onPress={() => setShowLogout(false)} style={styles.closeBtn}>
              <XIcon color={colors.text} size={20} />
            </Pressable>
            <Text style={[styles.modalText, { color: colors.text }]}>
              Are you sure you want to logout?
            </Text>
            <Pressable onPress={() => setShowLogout(false)} style={styles.cancelBtn}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </Pressable>
            <Pressable onPress={() => { setShowLogout(false); router.back(); }}>
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
  dotsBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionLabel: {
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
    paddingTop: 24,
    paddingBottom: 10,
  },
  group: {
    gap: 10,
  },
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
