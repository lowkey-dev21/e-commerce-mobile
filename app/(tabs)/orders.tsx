import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, Image, FlatList, ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';

const TEAL = '#4AB7B6';
const TABS = ['My Order', 'History'] as const;
type Tab = typeof TABS[number];

interface MockOrder {
  id: string;
  name: string;
  category: string;
  qty: number;
  price: number;
  status: 'On Progress' | 'Completed';
  image: any;
}

const ACTIVE_ORDERS: MockOrder[] = [
  {
    id: '1',
    name: 'Luxury Wing Chair',
    category: 'Furniture',
    qty: 1,
    price: 3599,
    status: 'On Progress',
    image: require('../../assets/chair.png'),
  },
  {
    id: '2',
    name: 'LG Washing Machine 8kg',
    category: 'Appliances',
    qty: 2,
    price: 91998,
    status: 'On Progress',
    image: require('../../assets/washing-machine.png'),
  },
];

const HISTORY_ORDERS: MockOrder[] = [
  {
    id: '3',
    name: 'Accent Armchair',
    category: 'Furniture',
    qty: 1,
    price: 2899,
    status: 'Completed',
    image: require('../../assets/chair.png'),
  },
  {
    id: '4',
    name: 'Samsung Washer 8kg',
    category: 'Appliances',
    qty: 1,
    price: 52000,
    status: 'Completed',
    image: require('../../assets/washing-machine.png'),
  },
];

function OrderCard({ order, onTrack }: { order: MockOrder; onTrack: () => void }) {
  const colors = useTheme();
  const router = useRouter();
  const isCompleted = order.status === 'Completed';

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {/* Top row */}
      <View style={styles.cardTop}>
        <View style={[styles.imageWrap, { backgroundColor: colors.skeleton }]}>
          <Image source={order.image} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.cardInfo}>
          <View style={styles.nameRow}>
            <Text style={[styles.orderName, { color: colors.text }]} numberOfLines={2}>
              {order.name}
            </Text>
            <View style={[styles.badge, { borderColor: isCompleted ? '#22C55E' : TEAL }]}>
              <Text style={[styles.badgeText, { color: isCompleted ? '#22C55E' : TEAL }]}>
                {order.status}
              </Text>
            </View>
          </View>
          <Text style={[styles.meta, { color: colors.textSecondary }]}>
            Category: {order.category}
          </Text>
          <Text style={[styles.meta, { color: colors.textSecondary }]}>
            Qty: {order.qty}
          </Text>
          <Text style={[styles.price, { color: colors.text }]}>
            ₹{order.price.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />
      <View style={styles.actions}>
        <Pressable
          onPress={() => router.push(`/product/${order.id}`)}
          style={[styles.detailBtn, { borderColor: colors.border }]}
        >
          <Text style={[styles.detailBtnText, { color: colors.text }]}>Detail</Text>
        </Pressable>
        <Pressable onPress={onTrack} style={styles.trackBtn}>
          <Text style={styles.trackBtnText}>
            {isCompleted ? 'Drop Review' : 'Tracking'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function OrdersScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('My Order');

  const data = activeTab === 'My Order' ? ACTIVE_ORDERS : HISTORY_ORDERS;

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.text }]}>My Orders</Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabBar, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
        {TABS.map((tab) => {
          const active = activeTab === tab;
          return (
            <Pressable key={tab} onPress={() => setActiveTab(tab)} style={styles.tabItem}>
              <Text style={[styles.tabLabel, { color: active ? TEAL : colors.textSecondary }]}>
                {tab}
              </Text>
              {active && <View style={styles.tabUnderline} />}
            </Pressable>
          );
        })}
      </View>

      {/* Orders list */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <OrderCard
            order={item}
            onTrack={() => item.status === 'Completed' ? router.push(`/drop-review/${item.id}`) : router.push(`/order-tracking/${item.id}`)}
          />
        )}
      />
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
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  tabItem: {
    marginRight: 28,
    paddingBottom: 12,
    paddingTop: 10,
    alignItems: 'center',
  },
  tabLabel: { fontSize: 15, fontFamily: 'DMSans_500Medium' },
  tabUnderline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: TEAL,
  },
  list: { padding: 16, gap: 14 },
  card: {
    borderRadius: 12,
    borderWidth: 0.8,
    overflow: 'hidden',
  },
  cardTop: {
    flexDirection: 'row',
    padding: 14,
    gap: 12,
  },
  imageWrap: {
    width: 80,
    height: 80,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
  cardInfo: { flex: 1 },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 4,
  },
  orderName: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'DMSans_700Bold',
    lineHeight: 20,
  },
  badge: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: { fontSize: 10, fontFamily: 'DMSans_500Medium' },
  meta: { fontSize: 12, fontFamily: 'DMSans_400Regular', marginBottom: 2 },
  price: { fontSize: 15, fontFamily: 'DMSans_700Bold', marginTop: 4 },
  divider: { height: 0.8, marginHorizontal: 14 },
  actions: {
    flexDirection: 'row',
    padding: 14,
    gap: 10,
  },
  detailBtn: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailBtnText: { fontSize: 13, fontFamily: 'DMSans_500Medium' },
  trackBtn: {
    flex: 1,
    height: 40,
    borderRadius: 12,
    backgroundColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trackBtnText: { fontSize: 13, fontFamily: 'DMSans_700Bold', color: '#fff' },
});
