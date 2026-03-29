import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { BackIcon } from '../components/icons/BackIcon';
import { CameraIcon } from '../components/icons/CameraIcon';
import { PersonIcon } from '../components/icons/PersonIcon';
import { MailIcon } from '../components/icons/MailIcon';
import { DotsVerticalIcon } from '../components/icons/DotsVerticalIcon';

const TEAL = '#4AB7B6';

function LinkIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M10 13C10.4295 13.5741 10.9774 14.0492 11.6066 14.3929C12.2357 14.7367 12.9315 14.9411 13.6467 14.9923C14.3618 15.0435 15.0796 14.9404 15.7513 14.6898C16.4231 14.4392 17.0331 14.0471 17.54 13.54L20.54 10.54C21.4508 9.59699 21.9548 8.33398 21.9434 7.02299C21.932 5.71201 21.4061 4.45794 20.4791 3.53087C19.5521 2.6038 18.298 2.07799 16.987 2.0666C15.676 2.05521 14.413 2.55918 13.47 3.46997L11.75 5.17997" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M14 11C13.5705 10.4259 13.0226 9.95083 12.3934 9.60707C11.7642 9.26331 11.0684 9.05889 10.3533 9.00768C9.63816 8.95646 8.92037 9.05964 8.24861 9.31023C7.57685 9.56082 6.96684 9.95293 6.45996 10.46L3.45996 13.46C2.54917 14.403 2.04521 15.666 2.0566 16.977C2.06798 18.288 2.5938 19.5421 3.52088 20.4691C4.44796 21.3962 5.70202 21.922 7.01301 21.9334C8.32399 21.9448 9.58701 21.4408 10.53 20.53L12.24 18.82" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function GoogleIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.88 16.79 15.71 17.57V20.34H19.28C21.36 18.42 22.56 15.6 22.56 12.25Z" fill="#4285F4" />
      <Path d="M12 23C14.97 23 17.46 22.02 19.28 20.34L15.71 17.57C14.73 18.23 13.48 18.63 12 18.63C9.13 18.63 6.72 16.7 5.84 14.1H2.18V16.94C3.99 20.53 7.7 23 12 23Z" fill="#34A853" />
      <Path d="M5.84 14.09C5.62 13.43 5.49 12.73 5.49 12C5.49 11.27 5.62 10.57 5.84 9.91V7.07H2.18C1.43 8.55 1 10.22 1 12C1 13.78 1.43 15.45 2.18 16.93L5.84 14.09Z" fill="#FBBC05" />
      <Path d="M12 5.38C13.62 5.38 15.06 5.94 16.21 7.02L19.36 3.87C17.45 2.09 14.97 1 12 1C7.7 1 3.99 3.47 2.18 7.07L5.84 9.91C6.72 7.31 9.13 5.38 12 5.38Z" fill="#EA4335" />
    </Svg>
  );
}

export default function EditProfileScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [username, setUsername] = useState('Jonathan Doe');
  const [email, setEmail] = useState('jonathan@example.com');

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.background }]}>
          <BackIcon color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Edit Profile</Text>
        <Pressable style={styles.dotsBtn}>
          <DotsVerticalIcon color={colors.text} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120 }}>

        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={[styles.avatar, { backgroundColor: TEAL }]}>
            <Text style={styles.avatarInitial}>J</Text>
          </View>
          <Pressable style={[styles.cameraBtn, { backgroundColor: TEAL }]}>
            <CameraIcon color="#fff" />
          </Pressable>
        </View>

        {/* Username */}
        <Text style={[styles.fieldLabel, { color: colors.text }]}>Username</Text>
        <View style={[styles.fieldCard, { backgroundColor: colors.card }]}>
          <PersonIcon color={TEAL} />
          <TextInput
            value={username}
            onChangeText={setUsername}
            style={[styles.input, { color: colors.text }]}
            placeholderTextColor={colors.textSecondary}
            placeholder="Enter username"
          />
        </View>

        {/* Email */}
        <Text style={[styles.fieldLabel, { color: colors.text }]}>Email or Phone Number</Text>
        <View style={[styles.fieldCard, { backgroundColor: colors.card }]}>
          <MailIcon color={TEAL} />
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={[styles.input, { color: colors.text }]}
            placeholderTextColor={colors.textSecondary}
            placeholder="Enter email or phone"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Account Linked With */}
        <Text style={[styles.fieldLabel, { color: colors.text }]}>Account Linked With</Text>
        <View style={[styles.fieldCard, { backgroundColor: colors.card }]}>
          <GoogleIcon />
          <Text style={[styles.linkedText, { color: colors.text }]}>Google</Text>
          <Pressable style={styles.linkAction}>
            <LinkIcon color={colors.textSecondary} />
          </Pressable>
        </View>

      </ScrollView>

      {/* Save Button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16, backgroundColor: colors.background }]}>
        <Pressable
          style={[styles.saveBtn, { backgroundColor: TEAL }]}
          onPress={() => {
            Alert.alert('Saved', 'Profile updated successfully.');
            router.back();
          }}
        >
          <Text style={styles.saveBtnText}>Save Changes</Text>
        </Pressable>
      </View>
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
  dotsBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 17, fontFamily: 'DMSans_700Bold' },
  avatarSection: {
    alignItems: 'center',
    marginTop: 28,
    marginBottom: 32,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitial: { fontSize: 36, fontFamily: 'DMSans_700Bold', color: '#fff' },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: '32%',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'DMSans_700Bold',
    marginBottom: 8,
    marginTop: 4,
  },
  fieldCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
  },
  linkedText: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
  },
  linkAction: { padding: 4 },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  saveBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveBtnText: {
    fontSize: 15,
    fontFamily: 'DMSans_700Bold',
    color: '#fff',
  },
});
