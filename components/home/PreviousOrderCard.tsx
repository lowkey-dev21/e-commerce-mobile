import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

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
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        {/* Status */}
        <Text style={styles.status}>{order.status}</Text>
        <Text style={styles.date}>{order.date}</Text>

        {/* Product thumbnails */}
        <View style={styles.thumbRow}>
          {order.images.map((img, i) => (
            <Image key={i} source={img} style={styles.thumb} resizeMode="contain" />
          ))}
          {order.extraCount && order.extraCount > 0 && (
            <View style={styles.extraBadge}>
              <Text style={styles.extraText}>+{order.extraCount}{'\n'}More</Text>
            </View>
          )}
        </View>

        <View style={styles.divider} />

        {/* Footer */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.orderId}>Order ID : {order.orderId}</Text>
            <Text style={styles.total}>Final Total : ₹ {order.total}</Text>
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
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 14,
  },
  status: {
    fontSize: 13,
    fontFamily: 'DMSans_700Bold',
    color: TEAL,
  },
  date: {
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
    color: '#888',
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
    backgroundColor: '#F5F5F5',
  },
  extraBadge: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  extraText: {
    fontSize: 11,
    fontFamily: 'DMSans_500Medium',
    color: '#555',
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
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
    color: '#888',
  },
  total: {
    fontSize: 14,
    fontFamily: 'DMSans_700Bold',
    color: '#1A1A1A',
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
    width: 32,
    backgroundColor: '#F4A94E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  promoText: {
    fontSize: 9,
    fontFamily: 'DMSans_500Medium',
    color: '#fff',
    textAlign: 'center',
    transform: [{ rotate: '90deg' }],
    width: 110,
  },
});
