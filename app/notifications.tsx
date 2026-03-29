import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../hooks/useTheme';
import { ScreenHeader } from '../components/ScreenHeader';
import { SettingsIcon } from '../components/icons/SettingsIcon';
import { ShoppingBagIcon } from '../components/icons/ShoppingBagIcon';
import { DeliveryIcon } from '../components/icons/DeliveryIcon';
import { PromoTagIcon } from '../components/icons/PromoTagIcon';

const TEAL = '#4AB7B6';

interface NotificationItem {
  id: string;
  type: 'order' | 'message' | 'promo' | 'delivery';
  title: string;
  body: string;
  time: string;
  action?: string;
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

function NotifIcon({ type }: { type: NotificationItem['type'] }) {
  return (
    <View style={[styles.iconWrap, { backgroundColor: TEAL + '18' }]}>
      {type === 'order' && <ShoppingBagIcon color={TEAL} size={20} />}
      {type === 'delivery' && <DeliveryIcon color={TEAL} size={20} />}
      {type === 'promo' && <PromoTagIcon color={TEAL} size={20} />}
      {type === 'message' && <ShoppingBagIcon color={TEAL} size={20} />}
    </View>
  );
}

export default function NotificationsScreen() {
  const colors = useTheme();
  const router = useRouter();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="Notifications"
        onBack={() => router.back()}
        right={
          <Pressable onPress={() => router.push('/settings')} style={styles.headerBtn}>
            <SettingsIcon color={colors.text} size={22} />
          </Pressable>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}>
        <Text style={[styles.sectionLabel, { color: colors.text }]}>Recent</Text>

        <View style={styles.list}>
          {NOTIFICATIONS.map((item) => (
            <Pressable key={item.id} style={[styles.notifItem, { backgroundColor: colors.card }]}>
              <NotifIcon type={item.type} />
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
  headerBtn: { width: 40, alignItems: 'center', justifyContent: 'center' },
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
