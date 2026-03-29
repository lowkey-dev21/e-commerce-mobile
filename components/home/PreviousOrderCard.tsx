import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const TEAL = '#4AB7B6';

interface PreviousOrder {
  status: string;
  date: string;
  orderId: string;
  total: number;
  images: any[];
  extraCount?: number;
}

const MOCK_ORDER: PreviousOrder = {
  status: 'Delivered',
  date: 'On Wed, 27 Jul 2022',
  orderId: '#28292999',
  total: 123,
  images: [
    require('../../assets/chair.png'),
    require('../../assets/washing-machine.png'),
  ],
  extraCount: 5,
};

interface PreviousOrderCardProps {
  order?: PreviousOrder;
  onOrderAgain?: () => void;
}

export function PreviousOrderCard({
  order = MOCK_ORDER,
  onOrderAgain,
}: PreviousOrderCardProps) {
  const colors = useTheme();
  return (
    <View style={styles.wrapper}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {/* Status */}
        <Text style={styles.status}>{order.status}</Text>
        <Text style={[styles.date, { color: colors.textSecondary }]}>{order.date}</Text>

        {/* Product thumbnails */}
        <View style={styles.thumbRow}>
          {order.images.map((img, i) => (
            <Image key={i} source={img} style={[styles.thumb, { backgroundColor: colors.skeleton }]} resizeMode="contain" />
          ))}
          {order.extraCount && order.extraCount > 0 && (
            <View style={[styles.extraBadge, { backgroundColor: colors.skeleton }]}>
              <Text style={[styles.extraText, { color: colors.textSecondary }]}>{order.extraCount}{'\n'}More</Text>
            </View>
          )}
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Footer */}
        <View style={styles.footer}>
          <View>
            <Text style={[styles.orderId, { color: colors.textSecondary }]}>Order ID : {order.orderId}</Text>
            <Text style={[styles.total, { color: colors.text }]}>Final Total : $ {order.total}</Text>
          </View>
          <Pressable onPress={onOrderAgain} style={styles.orderBtn}>
            <Text style={styles.orderBtnText}>Order Again</Text>
          </Pressable>
        </View>
      </View>

      {/* Promo tag */}
      <View style={styles.promoTag}>
        <Text style={styles.promoText}>Order Again & Get Flat 10% OFF</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    flexDirection: 'row',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
  },
  card: {
    flex: 1,
    padding: 14,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  status: {
    fontSize: 13,
    fontFamily: 'DMSans_700Bold',
    color: TEAL,
  },
  date: {
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
    marginTop: 2,
    marginBottom: 10,
  },
  thumbRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  thumb: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  extraBadge: {
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraText: {
    fontSize: 11,
    fontFamily: 'DMSans_500Medium',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderId: {
    fontSize: 11,
    fontFamily: 'DMSans_400Regular',
  },
  total: {
    fontSize: 14,
    fontFamily: 'DMSans_700Bold',
    marginTop: 2,
  },
  orderBtn: {
    backgroundColor: TEAL,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  orderBtnText: {
    fontSize: 13,
    fontFamily: 'DMSans_500Medium',
    color: '#fff',
  },
  promoTag: {
    width: 28,
    backgroundColor: '#4AB7B6',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    overflow: 'hidden',
  },
  promoText: {
    fontSize: 8,
    fontFamily: 'DMSans_500Medium',
    color: '#fff',
    textAlign: 'center',
    transform: [{ rotate: '90deg' }],
    width: 120,
  },
});
