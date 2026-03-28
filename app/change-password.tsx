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

function LockIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Rect x={4} y={11} width={16} height={11} rx={2} stroke={color} strokeWidth={1.8} />
      <Circle cx={12} cy={16} r={1.5} fill={color} />
      <Path d="M12 17.5V19" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function EyeIcon({ color, off }: { color: string; off?: boolean }) {
  if (off) {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
        <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2.73 16.39 1 12C1.69 10.24 2.79 8.69 4.19 7.46M9.9 4.24A9.12 9.12 0 0 1 12 4C17 4 21.27 7.61 23 12C22.45 13.49 21.6 14.83 20.52 15.95M1 1L23 23" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M8.71 8.71A4 4 0 0 0 15.29 15.29" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      </Svg>
    );
  }
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M1 12C2.73 7.61 7 4 12 4C17 4 21.27 7.61 23 12C21.27 16.39 17 20 12 20C7 20 2.73 16.39 1 12Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

function PasswordField({
  label,
  value,
  onChangeText,
  placeholder,
}: {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
}) {
  const colors = useTheme();
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={[styles.fieldLabel, { color: colors.text }]}>{label}</Text>
      <View style={[styles.fieldCard, { backgroundColor: colors.card }]}>
        <LockIcon color={TEAL} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!visible}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, { color: colors.text }]}
          autoCapitalize="none"
        />
        <Pressable onPress={() => setVisible(v => !v)} style={styles.eyeBtn}>
          <EyeIcon color={colors.textSecondary} off={!visible} />
        </Pressable>
      </View>
    </View>
  );
}

export default function ChangePasswordScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const canSubmit = newPassword.length >= 6 && newPassword === confirmPassword;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.background }]}>
          <BackIcon color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Change Password</Text>
        <Pressable style={styles.dotsBtn}>
          <DotsIcon color={colors.text} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 28, paddingBottom: 120 }}>
        <PasswordField
          label="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="Enter new password"
        />
        <PasswordField
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your new password"
        />
        {confirmPassword.length > 0 && newPassword !== confirmPassword && (
          <Text style={styles.errorText}>Passwords do not match</Text>
        )}
      </ScrollView>

      {/* Submit Button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16, backgroundColor: colors.background }]}>
        <Pressable
          style={[styles.submitBtn, { backgroundColor: canSubmit ? TEAL : colors.border }]}
          disabled={!canSubmit}
          onPress={() => {
            Alert.alert('Success', 'Password changed successfully.');
            router.back();
          }}
        >
          <Text style={[styles.submitBtnText, { color: canSubmit ? '#fff' : colors.textSecondary }]}>
            Change Now
          </Text>
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
  fieldLabel: {
    fontSize: 14,
    fontFamily: 'DMSans_700Bold',
    marginBottom: 8,
  },
  fieldCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
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
  eyeBtn: { padding: 4 },
  errorText: {
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
    color: '#EF4444',
    marginTop: -12,
    marginBottom: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  submitBtn: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitBtnText: {
    fontSize: 15,
    fontFamily: 'DMSans_700Bold',
  },
});
