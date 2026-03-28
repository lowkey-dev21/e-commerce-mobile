import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Image } from 'react-native';
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

function SettingsIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

function CartIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M6 2L3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6L18 2H6Z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
      <Path d="M3 6H21" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Path d="M16 10C16 12.2091 14.2091 14 12 14C9.79086 14 8 12.2091 8 10" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

function DeliveryIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Rect x={1} y={3} width={15} height={13} rx={2} stroke={color} strokeWidth={1.8} />
      <Path d="M16 8H19L22 11V16H16V8Z" stroke={color} strokeWidth={1.8} strokeLinejoin="round" />
      <Circle cx={5.5} cy={18.5} r={2.5} stroke={color} strokeWidth={1.8} />
      <Circle cx={18.5} cy={18.5} r={2.5} stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

function PromoIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={7} cy={7} r={1.5} fill={color} />
    </Svg>
  );
}

interface NotificationItem {
  id: string;
  type: 'order' | 'message' | 'promo' | 'delivery';
  title: string;
  body: string;
  time: string;
  action?: string;
  avatar?: string;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    type: 'order',
    title: 'Purchase Completed!',
    body: 'Your order has been confirmed. Thank you for shopping with us! ✨',
    time: '2m ago',
  },
  {
    id: '2',
    type: 'delivery',
    title: 'Package Shipped',
    body: 'Your package is on its way. Estimated delivery: Today, 1:00 – 3:00 PM.',
    time: '15m ago',
    action: 'Track Order',
  },
  {
    id: '3',
    type: 'promo',
    title: 'Flash Sale! 🔥',
    body: 'Get 20% off on all furniture this weekend. Limited time offer!',
    time: '1h ago',
  },
  {
    id: '4',
    type: 'order',
    title: 'Order Out for Delivery',
    body: 'Your order is out for delivery and will arrive soon.',
    time: '3h ago',
  },
  {
    id: '5',
    type: 'promo',
    title: 'New Arrivals',
    body: 'Check out the latest products added to our store. Shop now!',
    time: '1d ago',
  },
];

function NotifIcon({ type, colors }: { type: NotificationItem['type']; colors: any }) {
  const iconColor = TEAL;
  return (
    <View style={[styles.iconWrap, { backgroundColor: TEAL + '18' }]}>
      {type === 'order' && <CartIcon color={iconColor} />}
      {type === 'delivery' && <DeliveryIcon color={iconColor} />}
      {type === 'promo' && <PromoIcon color={iconColor} />}
      {type === 'message' && <CartIcon color={iconColor} />}
    </View>
  );
}

export default function NotificationsScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.background }]}>
          <BackIcon color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
        <Pressable onPress={() => router.push('/settings')} style={styles.headerBtn}>
          <SettingsIcon color={colors.text} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>
        <Text style={[styles.sectionLabel, { color: colors.text }]}>Recent</Text>

        <View style={styles.list}>
          {NOTIFICATIONS.map((item) => (
            <Pressable key={item.id} style={[styles.notifItem, { backgroundColor: colors.card }]}>
              <NotifIcon type={item.type} colors={colors} />
              <View style={styles.notifContent}>
                <View style={styles.notifTop}>
                  <Text style={[styles.notifTitle, { color: colors.text }]} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={[styles.notifTime, { color: colors.textSecondary }]}>{item.time}</Text>
                </View>
                <Text style={[styles.notifBody, { color: colors.textSecondary }]} numberOfLines={3}>
                  {item.body}
                </Text>
                {item.action && (
                  <Text style={[styles.notifAction, { color: TEAL }]}>{item.action}</Text>
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
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
  headerBtn: { width: 40, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 17, fontFamily: 'DMSans_700Bold' },
  sectionLabel: {
    fontSize: 16,
    fontFamily: 'DMSans_700Bold',
    paddingTop: 20,
    paddingBottom: 10,
  },
  list: {
    gap: 10,
  },
  notifItem: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 14,
    alignItems: 'flex-start',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifContent: { flex: 1 },
  notifTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 4,
  },
  notifTitle: { flex: 1, fontSize: 14, fontFamily: 'DMSans_700Bold' },
  notifTime: { fontSize: 11, fontFamily: 'DMSans_400Regular', marginTop: 1 },
  notifBody: { fontSize: 13, fontFamily: 'DMSans_400Regular', lineHeight: 19 },
  notifAction: { fontSize: 13, fontFamily: 'DMSans_700Bold', marginTop: 6 },
});
