import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { BackIcon } from '../components/icons/BackIcon';
import { CardIcon } from '../components/icons/CardIcon';
import { PersonIcon } from '../components/icons/PersonIcon';
import { CalendarIcon } from '../components/icons/CalendarIcon';
import { LockIcon } from '../components/icons/LockIcon';

const TEAL = '#4AB7B6';




function CardField({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  maxLength,
  secureTextEntry,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  keyboardType?: any;
  maxLength?: number;
  secureTextEntry?: boolean;
}) {
  const colors = useTheme();
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={[styles.fieldLabel, { color: colors.text }]}>{label}</Text>
      <View style={[styles.fieldRow, { backgroundColor: colors.card }]}>
        {icon}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          style={[styles.input, { color: colors.text }]}
          keyboardType={keyboardType}
          maxLength={maxLength}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
}

export default function AddCardScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [cardNumber, setCardNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const formatCardNumber = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (text: string) => {
    const digits = text.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const canSubmit = cardNumber.replace(/\s/g, '').length === 16 && holderName.trim() && expiry.length === 5 && cvv.length >= 3;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.background }]}>
          <BackIcon color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Add New Card</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <CardField
          label="Card Number"
          icon={<CardIcon color={TEAL} />}
          value={cardNumber}
          onChangeText={(t) => setCardNumber(formatCardNumber(t))}
          placeholder="Enter Card Number"
          keyboardType="number-pad"
          maxLength={19}
        />
        <CardField
          label="Card Holder Name"
          icon={<PersonIcon color={TEAL} />}
          value={holderName}
          onChangeText={setHolderName}
          placeholder="Enter Holder Name"
        />
        <CardField
          label="Expired"
          icon={<CalendarIcon color={TEAL} />}
          value={expiry}
          onChangeText={(t) => setExpiry(formatExpiry(t))}
          placeholder="MM/YY"
          keyboardType="number-pad"
          maxLength={5}
        />
        <CardField
          label="CVV Code"
          icon={<LockIcon color={TEAL} />}
          value={cvv}
          onChangeText={(t) => setCvv(t.replace(/\D/g, '').slice(0, 4))}
          placeholder="CCV"
          keyboardType="number-pad"
          maxLength={4}
          secureTextEntry
        />
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16, backgroundColor: colors.background }]}>
        <Pressable
          style={[styles.addBtn, { backgroundColor: canSubmit ? TEAL : colors.border }]}
          disabled={!canSubmit}
          onPress={() => {
            Alert.alert('Card Added', 'Your card has been saved successfully.');
            router.back();
          }}
        >
          <Text style={[styles.addBtnText, { color: canSubmit ? '#fff' : colors.textSecondary }]}>
            Add Card
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingBottom: 14,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 6, elevation: 4,
  },
  title: { fontSize: 17, fontFamily: 'DMSans_700Bold' },
  fieldLabel: { fontSize: 14, fontFamily: 'DMSans_700Bold', marginBottom: 8 },
  fieldRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 14, borderRadius: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  input: { flex: 1, fontSize: 14, fontFamily: 'DMSans_400Regular' },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20, paddingTop: 12,
  },
  addBtn: { borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  addBtnText: { fontSize: 15, fontFamily: 'DMSans_700Bold' },
});
