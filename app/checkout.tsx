import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, ScrollView,
  Image, Modal, Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';
import { useCartStore } from '../store/cartStore';
import { useTheme } from '../hooks/useTheme';

const TEAL = '#4AB7B6';

const LOCAL_IMAGES: Record<string, any> = {
  '1': require('../assets/chair.png'),
  '2': require('../assets/washing-machine.png'),
  '3': require('../assets/chair.png'),
  '4': require('../assets/washing-machine.png'),
  '5': require('../assets/chair.png'),
  '6': require('../assets/washing-machine.png'),
};

/* ── Icons ── */
function BackIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PinIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={12} cy={9} r={2.5} stroke={color} strokeWidth={1.8} />
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

function PlusIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={9} stroke={color} strokeWidth={1.8} />
      <Path d="M12 8V16M8 12H16" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <Svg width={12} height={12} viewBox="0 0 24 24" fill="none">
      <Path d="M20 6L9 17L4 12" stroke={color} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MapThumbnail() {
  return (
    <View style={styles.mapThumb}>
      <Svg width={60} height={60} viewBox="0 0 60 60">
        <Rect width={60} height={60} fill="#E8F4F3" />
        <Path d="M0 20 Q15 10 30 20 Q45 30 60 20" stroke="#B2DFDB" strokeWidth={1.5} fill="none" />
        <Path d="M0 35 Q15 25 30 35 Q45 45 60 35" stroke="#B2DFDB" strokeWidth={1.5} fill="none" />
        <Path d="M10 0 L10 60" stroke="#B2DFDB" strokeWidth={1} />
        <Path d="M30 0 L30 60" stroke="#B2DFDB" strokeWidth={1} />
        <Path d="M50 0 L50 60" stroke="#B2DFDB" strokeWidth={1} />
      </Svg>
      <View style={styles.mapPin}>
        <PinIcon color="#EF4444" />
      </View>
    </View>
  );
}

function MastercardIcon() {
  return (
    <View style={{ width: 36, height: 24, position: 'relative' }}>
      <Svg width={36} height={24} viewBox="0 0 36 24">
        <Circle cx={13} cy={12} r={10} fill="#EB001B" />
        <Circle cx={23} cy={12} r={10} fill="#F79E1B" />
        <Path d="M18 4.93C19.9 6.37 21.2 8.54 21.2 12C21.2 15.46 19.9 17.63 18 19.07C16.1 17.63 14.8 15.46 14.8 12C14.8 8.54 16.1 6.37 18 4.93Z" fill="#FF5F00" />
      </Svg>
    </View>
  );
}

function PaypalIcon() {
  return (
    <View style={[styles.payMethodIcon, { backgroundColor: '#F5F7FA' }]}>
      <Svg width={24} height={24} viewBox="0 0 24 24">
        {/* Back P (light blue) */}
        <Path
          d="M19.5 7.5C19.5 10.8 17.1 13.5 13.8 13.5H11.4L10.2 19.5H7.2L9.6 7.5H14.4C17.1 7.5 19.5 5.1 19.5 7.5Z"
          fill="#009CDE"
        />
        {/* Front P (dark blue) */}
        <Path
          d="M17.1 5.1C17.1 8.4 14.7 11.1 11.4 11.1H9L7.8 17.1H4.8L7.2 5.1H12C14.7 5.1 17.1 2.7 17.1 5.1Z"
          fill="#003087"
        />
      </Svg>
    </View>
  );
}

function SuccessIllustration() {
  return (
    <View style={styles.successIllustration}>
      {/* Outer glow ring */}
      <View style={styles.successRingOuter}>
        <View style={styles.successRingInner}>
          {/* Big checkmark circle */}
          <View style={styles.successCircle}>
            <Svg width={52} height={52} viewBox="0 0 24 24" fill="none">
              <Path d="M20 6L9 17L4 12" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
          </View>
        </View>
      </View>
    </View>
  );
}

const PAYMENT_METHODS = [
  { id: 'paypal', label: 'Paypal', sub: 'sask****@mail.com', icon: 'paypal' },
  { id: 'mastercard', label: 'Mastercard', sub: '4827 8472 7424 ****', icon: 'mastercard' },
];

export default function CheckoutScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { items, clearCart } = useCartStore();

  const [selectedPayment, setSelectedPayment] = useState('mastercard');
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const shipping = 6;
  const total = subtotal + shipping;

  const getImage = (id: string, uri: string) =>
    LOCAL_IMAGES[id] ?? (uri ? { uri } : require('../assets/chair.png'));

  const activeMethod = PAYMENT_METHODS.find((m) => m.id === selectedPayment)!;

  const handleCheckout = () => {
    setShowPaymentSheet(false);
    setShowSuccess(true);
  };

  const handleOrderTracking = () => {
    setShowSuccess(false);
    clearCart();
    router.replace('/order-tracking/1');
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.background }]}>
          <BackIcon color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Payment</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>

        {/* Address */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Address</Text>
          <Pressable onPress={() => router.push('/address')}>
            <Text style={[styles.editLink, { color: TEAL }]}>Edit</Text>
          </Pressable>
        </View>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <MapThumbnail />
          <View style={{ flex: 1, gap: 3 }}>
            <Text style={[styles.addressTitle, { color: colors.text }]}>House</Text>
            <Text style={[styles.addressSub, { color: colors.textSecondary }]}>
              5482 Adobe Falls Rd #15{'\n'}San Diego, California(CA), 92120
            </Text>
          </View>
        </View>

        {/* Products */}
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24, marginBottom: 12 }]}>
          Products ({items.length})
        </Text>
        <View style={{ gap: 10 }}>
          {items.map((item) => (
            <View key={item.product._id} style={[styles.productRow, { backgroundColor: colors.card }]}>
              <View style={[styles.productImgWrap, { backgroundColor: colors.skeleton }]}>
                <Image source={getImage(item.product._id, item.product.image)} style={styles.productImg} resizeMode="contain" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.productName, { color: colors.text }]} numberOfLines={1}>{item.product.name}</Text>
                <Text style={[styles.productCat, { color: colors.textSecondary }]}>{item.product.category}</Text>
              </View>
              <Text style={[styles.productPrice, { color: colors.text }]}>
                <Text style={{ fontSize: 11 }}>$ </Text>
                {(item.product.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Payment Method */}
        <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 24, marginBottom: 12 }]}>Payment Method</Text>
        <Pressable style={[styles.card, styles.payRow, { backgroundColor: colors.card }]} onPress={() => setShowPaymentSheet(true)}>
          {activeMethod.icon === 'mastercard' ? <MastercardIcon /> : <PaypalIcon />}
          <View style={{ flex: 1 }}>
            <Text style={[styles.payLabel, { color: colors.text }]}>{activeMethod.label}</Text>
            <Text style={[styles.paySub, { color: colors.textSecondary }]}>{activeMethod.sub}</Text>
          </View>
          <ChevronIcon color={colors.textSecondary} />
        </Pressable>

        {/* Total */}
        <View style={[styles.totalRow, { borderTopColor: colors.border }]}>
          <Text style={[styles.totalLabel, { color: colors.textSecondary }]}>Total amount</Text>
          <Text style={[styles.totalValue, { color: colors.text }]}>
            <Text style={{ fontSize: 13 }}>$ </Text>
            {total.toFixed(2)}
          </Text>
        </View>
      </ScrollView>

      {/* Checkout button */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16, backgroundColor: colors.background }]}>
        <Pressable style={[styles.checkoutBtn, { backgroundColor: TEAL }]} onPress={() => setShowPaymentSheet(true)}>
          <Text style={styles.checkoutBtnText}>Checkout Now</Text>
        </Pressable>
      </View>

      {/* ── Payment Method Bottom Sheet ── */}
      <Modal visible={showPaymentSheet} transparent animationType="slide" onRequestClose={() => setShowPaymentSheet(false)}>
        <Pressable style={styles.overlay} onPress={() => setShowPaymentSheet(false)} />
        <View style={[styles.sheet, { backgroundColor: colors.card }]}>
          <View style={styles.sheetHandle} />
          <Text style={[styles.sheetTitle, { color: colors.text }]}>Payment Method</Text>

          {PAYMENT_METHODS.map((method) => {
            const isSelected = selectedPayment === method.id;
            return (
              <Pressable
                key={method.id}
                style={[styles.methodRow, { backgroundColor: colors.background }]}
                onPress={() => setSelectedPayment(method.id)}
              >
                {method.icon === 'mastercard' ? <MastercardIcon /> : <PaypalIcon />}
                <View style={{ flex: 1 }}>
                  <Text style={[styles.payLabel, { color: colors.text }]}>{method.label}</Text>
                  <Text style={[styles.paySub, { color: colors.textSecondary }]}>{method.sub}</Text>
                </View>
                <View style={[styles.checkbox, { backgroundColor: isSelected ? TEAL : 'transparent', borderColor: isSelected ? TEAL : '#BDBDBD' }]}>
                  {isSelected && <CheckIcon color="#fff" />}
                </View>
              </Pressable>
            );
          })}

          <Pressable style={[styles.methodRow, { backgroundColor: colors.background }]} onPress={() => { setShowPaymentSheet(false); router.push('/add-card'); }}>
            <PlusIcon color={colors.textSecondary} />
            <Text style={[styles.addPayText, { color: colors.text }]}>Add Payment Method</Text>
          </Pressable>

          <Pressable style={[styles.checkoutBtn, { backgroundColor: TEAL, marginTop: 8 }]} onPress={handleCheckout}>
            <Text style={styles.checkoutBtnText}>Confirm Payment</Text>
          </Pressable>
          <View style={{ height: insets.bottom + 8 }} />
        </View>
      </Modal>

      {/* ── Success Bottom Sheet ── */}
      <Modal visible={showSuccess} transparent animationType="slide" onRequestClose={() => {}}>
        <View style={styles.overlay} />
        <View style={[styles.sheet, styles.successSheet, { backgroundColor: colors.card }]}>
          <View style={styles.sheetHandle} />
          <SuccessIllustration />
          <Text style={[styles.successTitle, { color: colors.text }]}>Order Successful!</Text>
          <Text style={[styles.successSub, { color: colors.textSecondary }]}>
            Your order will be packed by the clerk,{'\n'}and will arrive at your house in 3 to 4 days.
          </Text>
          <Pressable style={[styles.trackingBtn, { backgroundColor: TEAL }]} onPress={handleOrderTracking}>
            <Text style={styles.checkoutBtnText}>Order Tracking</Text>
          </Pressable>
          <View style={{ height: insets.bottom + 8 }} />
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
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 6, elevation: 4,
  },
  title: { fontSize: 17, fontFamily: 'DMSans_700Bold' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontFamily: 'DMSans_700Bold' },
  editLink: { fontSize: 13, fontFamily: 'DMSans_500Medium' },
  card: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    padding: 14, borderRadius: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  mapThumb: {
    width: 64, height: 64, borderRadius: 12,
    overflow: 'hidden', position: 'relative',
    alignItems: 'center', justifyContent: 'center',
  },
  mapPin: { position: 'absolute' },
  addressTitle: { fontSize: 14, fontFamily: 'DMSans_700Bold' },
  addressSub: { fontSize: 12, fontFamily: 'DMSans_400Regular', lineHeight: 18 },
  productRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    padding: 12, borderRadius: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  productImgWrap: { width: 60, height: 60, borderRadius: 10, overflow: 'hidden' },
  productImg: { width: '100%', height: '100%' },
  productName: { fontSize: 13, fontFamily: 'DMSans_500Medium', marginBottom: 2 },
  productCat: { fontSize: 11, fontFamily: 'DMSans_400Regular', textTransform: 'uppercase' },
  productPrice: { fontSize: 15, fontFamily: 'DMSans_700Bold' },
  payRow: { gap: 14 },
  payMethodIcon: {
    width: 36, height: 36, borderRadius: 10,
    alignItems: 'center', justifyContent: 'center',
  },
  payLabel: { fontSize: 14, fontFamily: 'DMSans_700Bold' },
  paySub: { fontSize: 12, fontFamily: 'DMSans_400Regular', marginTop: 1 },
  totalRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    marginTop: 24, paddingTop: 16, borderTopWidth: 1,
  },
  totalLabel: { fontSize: 14, fontFamily: 'DMSans_400Regular' },
  totalValue: { fontSize: 20, fontFamily: 'DMSans_700Bold' },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20, paddingTop: 12,
  },
  checkoutBtn: { borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  checkoutBtnText: { color: '#fff', fontSize: 15, fontFamily: 'DMSans_700Bold' },
  overlay: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    padding: 20, paddingTop: 12,
  },
  sheetHandle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: '#E0E0E0',
    alignSelf: 'center', marginBottom: 16,
  },
  sheetTitle: { fontSize: 16, fontFamily: 'DMSans_700Bold', marginBottom: 16 },
  methodRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    padding: 14, borderRadius: 12, marginBottom: 10,
  },
  addPayText: { flex: 1, fontSize: 14, fontFamily: 'DMSans_500Medium' },
  checkbox: {
    width: 22, height: 22, borderRadius: 6, borderWidth: 1.8,
    alignItems: 'center', justifyContent: 'center',
  },
  successSheet: { alignItems: 'center', paddingHorizontal: 24 },
  successIllustration: { marginTop: 16, marginBottom: 28 },
  successRingOuter: {
    width: 150, height: 150, borderRadius: 75,
    backgroundColor: TEAL + '18',
    alignItems: 'center', justifyContent: 'center',
  },
  successRingInner: {
    width: 116, height: 116, borderRadius: 58,
    backgroundColor: TEAL + '30',
    alignItems: 'center', justifyContent: 'center',
  },
  successCircle: {
    width: 88, height: 88, borderRadius: 44,
    backgroundColor: TEAL,
    alignItems: 'center', justifyContent: 'center',
  },
  successTitle: { fontSize: 24, fontFamily: 'DMSans_700Bold', marginBottom: 10, textAlign: 'center' },
  successSub: { fontSize: 14, fontFamily: 'DMSans_400Regular', textAlign: 'center', lineHeight: 22, color: '#888' },
  trackingBtn: {
    borderRadius: 14, paddingVertical: 16,
    paddingHorizontal: 48, alignItems: 'center',
    marginTop: 28, alignSelf: 'stretch',
  },
});
