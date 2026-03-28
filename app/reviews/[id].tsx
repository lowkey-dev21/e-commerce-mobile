import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';

const TEAL = '#4AB7B6';

interface Review {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  rating: number;
  date: string;
  text: string;
}

const ALL_REVIEWS: Review[] = [
  { id: '1', name: 'Sarah M.', initials: 'SM', avatarColor: TEAL, rating: 5, date: '12 Jan 2024', text: 'Absolutely love it! The quality exceeded my expectations. Very sturdy and looks great in my living room. I have been looking for something like this for a long time.' },
  { id: '2', name: 'James T.', initials: 'JT', avatarColor: '#6B9BF2', rating: 4, date: '8 Jan 2024', text: 'Great product overall. Delivery was fast and packaging was excellent. Would buy again without hesitation. My family loves it too.' },
  { id: '3', name: 'Priya K.', initials: 'PK', avatarColor: '#C77DFF', rating: 5, date: '2 Jan 2024', text: 'Perfect! Exactly as described. The material feels premium and it was easy to set up. Customer support was also very helpful.' },
  { id: '4', name: 'David R.', initials: 'DR', avatarColor: '#A594F9', rating: 4, date: '28 Dec 2023', text: 'Very satisfied with this purchase. Good value for money. Highly recommend to everyone who is looking for quality products.' },
  { id: '5', name: 'Anita S.', initials: 'AS', avatarColor: '#4AB7B6', rating: 5, date: '20 Dec 2023', text: 'Outstanding quality! I was skeptical at first but it is even better in person. Delivery was on time and well packed.' },
  { id: '6', name: 'Mark L.', initials: 'ML', avatarColor: '#F97316', rating: 3, date: '15 Dec 2023', text: 'Decent product but took longer to arrive than expected. Quality is good though and I am satisfied with the purchase overall.' },
  { id: '7', name: 'Nina W.', initials: 'NW', avatarColor: '#EC4899', rating: 5, date: '10 Dec 2023', text: 'Love everything about it. Matches perfectly with my home decor. Will definitely be ordering more products from this store.' },
  { id: '8', name: 'Tom H.', initials: 'TH', avatarColor: '#84CC16', rating: 4, date: '5 Dec 2023', text: 'Solid build quality and great finish. Setup was straightforward. Really happy with this purchase and would recommend.' },
];

function BackIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ReviewItem({ review, colors }: { review: Review; colors: any }) {
  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={styles.top}>
        <View style={[styles.avatar, { backgroundColor: review.avatarColor }]}>
          <Text style={styles.initials}>{review.initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.name, { color: colors.text }]}>{review.name}</Text>
          <Text style={[styles.date, { color: colors.textSecondary }]}>{review.date}</Text>
        </View>
        <View style={styles.starsRow}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Text key={i} style={{ fontSize: 13, color: i < review.rating ? '#FBBF24' : colors.border }}>★</Text>
          ))}
        </View>
      </View>
      <Text style={[styles.text, { color: colors.textSecondary }]}>{review.text}</Text>
    </View>
  );
}

export default function ReviewsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useTheme();

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <BackIcon color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>All Reviews</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={ALL_REVIEWS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <ReviewItem review={item} colors={colors} />}
      />
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
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 17,
    fontFamily: 'DMSans_700Bold',
  },
  list: {
    padding: 20,
    gap: 12,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    fontSize: 14,
    fontFamily: 'DMSans_700Bold',
    color: '#fff',
  },
  name: {
    fontSize: 14,
    fontFamily: 'DMSans_700Bold',
  },
  date: {
    fontSize: 12,
    fontFamily: 'DMSans_400Regular',
    marginTop: 2,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
  },
  text: {
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
    lineHeight: 20,
  },
});
