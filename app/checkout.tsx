import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCartStore } from '../store/cartStore';
import { orderService } from '../services/api';
import { useTheme } from '../hooks/useTheme';

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
};

type FormErrors = Partial<FormData>;

export default function CheckoutScreen() {
  const colors = useTheme();
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCartStore();
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', address: '', city: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await orderService.create({
        items: items.map((i) => ({ productId: i.product._id, quantity: i.quantity })),
        customerInfo: form,
      });
      clearCart();
      router.replace({ pathname: '/confirmation', params: { orderNumber: res.data.data.orderNumber } });
    } catch (e: any) {
      Alert.alert('Order Failed', e.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const Field = ({
    label,
    field,
    placeholder,
    keyboardType = 'default',
    autoCapitalize = 'words',
  }: {
    label: string;
    field: keyof FormData;
    placeholder: string;
    keyboardType?: any;
    autoCapitalize?: any;
  }) => (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.card,
            borderColor: errors[field] ? colors.error : colors.border,
            color: colors.text,
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        value={form[field]}
        onChangeText={(v) => {
          setForm((f) => ({ ...f, [field]: v }));
          if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
        }}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {errors[field] && <Text style={styles.errorText}>{errors[field]}</Text>}
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Delivery Info */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Delivery Details</Text>
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Field label="Full Name" field="name" placeholder="John Doe" />
          <Field label="Email" field="email" placeholder="john@example.com" keyboardType="email-address" autoCapitalize="none" />
          <Field label="Phone" field="phone" placeholder="+1 234 567 8901" keyboardType="phone-pad" autoCapitalize="none" />
          <Field label="Street Address" field="address" placeholder="123 Main St" />
          <Field label="City" field="city" placeholder="New York" />
        </View>

        {/* Order Summary */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Order Summary</Text>
        <View style={[styles.section, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {items.map((item) => (
            <View key={item.product._id} style={styles.orderItem}>
              <Text style={[styles.orderItemName, { color: colors.text }]} numberOfLines={1}>
                {item.product.name}
              </Text>
              <Text style={[styles.orderItemDetail, { color: colors.textSecondary }]}>
                x{item.quantity} · ${(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <View style={styles.totalRow}>
            <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Total</Text>
            <Text style={[styles.totalAmount, { color: colors.primary }]}>
              ${totalPrice().toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Submit */}
        <Pressable
          onPress={handleSubmit}
          disabled={loading}
          style={[styles.submitBtn, { backgroundColor: loading ? colors.border : colors.primary }]}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitBtnText}>Place Order 🎉</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 17, fontWeight: '700', marginBottom: 12, marginTop: 8 },
  section: { borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 20 },
  field: { marginBottom: 14 },
  label: { fontSize: 13, fontWeight: '600', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
  },
  errorText: { color: '#EF4444', fontSize: 12, marginTop: 4 },
  orderItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  orderItemName: { flex: 1, fontSize: 14, marginRight: 8 },
  orderItemDetail: { fontSize: 14 },
  divider: { height: 1, marginVertical: 12 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 15 },
  totalAmount: { fontSize: 22, fontWeight: '800' },
  submitBtn: { paddingVertical: 18, borderRadius: 16, alignItems: 'center' },
  submitBtnText: { color: '#fff', fontSize: 17, fontWeight: '700' },
});
