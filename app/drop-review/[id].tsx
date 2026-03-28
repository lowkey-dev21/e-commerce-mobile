import React, { useState } from 'react';
import {
  View, Text, StyleSheet, Pressable, TextInput,
  ScrollView, KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';

const TEAL = '#4AB7B6';

const TAGS = ['Quality', 'Fast Delivery', 'Good Packaging', 'Value for Money', 'Easy to Use'];

function BackIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function StarIcon({ filled, size = 36 }: { filled: boolean; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#FBBF24' : 'none'}>
      <Path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        stroke="#FBBF24"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const RATING_LABELS: Record<number, string> = {
  1: 'Very Poor',
  2: 'Poor',
  3: 'Average',
  4: 'Good',
  5: 'Excellent',
};

export default function DropReviewScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useTheme();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert('Rating required', 'Please select a star rating before submitting.');
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      Alert.alert('Review Submitted', 'Thank you for your feedback!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    }, 800);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.screen, { backgroundColor: colors.background }]}>

        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
          <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.background }]}>
            <BackIcon color={colors.text} />
          </Pressable>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Drop a Review</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 100 }]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Rating label */}
          <Text style={[styles.sectionLabel, { color: colors.text }]}>How was your experience?</Text>
          <Text style={[styles.sectionSub, { color: colors.textSecondary }]}>
            Tap a star to rate your order
          </Text>

          {/* Stars */}
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable key={star} onPress={() => setRating(star)} hitSlop={8}>
                <StarIcon filled={star <= rating} size={44} />
              </Pressable>
            ))}
          </View>

          {rating > 0 && (
            <Text style={[styles.ratingLabel, { color: TEAL }]}>
              {RATING_LABELS[rating]}
            </Text>
          )}

          {/* Tags */}
          <Text style={[styles.sectionLabel, { color: colors.text, marginTop: 28 }]}>
            What did you like?
          </Text>
          <View style={styles.tagsRow}>
            {TAGS.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <Pressable
                  key={tag}
                  onPress={() => toggleTag(tag)}
                  style={[
                    styles.tag,
                    active
                      ? { backgroundColor: TEAL, borderColor: TEAL }
                      : { backgroundColor: 'transparent', borderColor: colors.border },
                  ]}
                >
                  <Text style={[styles.tagText, { color: active ? '#fff' : colors.textSecondary }]}>
                    {tag}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          {/* Review text */}
          <Text style={[styles.sectionLabel, { color: colors.text, marginTop: 28 }]}>
            Write your review
          </Text>
          <TextInput
            value={review}
            onChangeText={setReview}
            placeholder="Tell us what you think about this product..."
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={5}
            textAlignVertical="top"
            style={[
              styles.textArea,
              { color: colors.text, borderColor: colors.border, backgroundColor: colors.card },
            ]}
          />
          <Text style={[styles.charCount, { color: colors.textSecondary }]}>
            {review.length}/500
          </Text>
        </ScrollView>

        {/* Submit button */}
        <View style={[styles.bottomBar, { backgroundColor: colors.background, paddingBottom: insets.bottom + 12, borderTopColor: colors.border }]}>
          <Pressable
            onPress={handleSubmit}
            disabled={submitting}
            style={[styles.submitBtn, { backgroundColor: rating === 0 ? colors.border : TEAL }]}
          >
            <Text style={styles.submitBtnText}>
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: { fontSize: 17, fontFamily: 'DMSans_700Bold' },
  content: { padding: 24 },
  sectionLabel: { fontSize: 15, fontFamily: 'DMSans_700Bold', marginBottom: 6 },
  sectionSub: { fontSize: 13, fontFamily: 'DMSans_400Regular', marginBottom: 20 },
  starsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  ratingLabel: {
    fontSize: 14,
    fontFamily: 'DMSans_700Bold',
    marginBottom: 4,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 4,
  },
  tag: {
    paddingHorizontal: 14,
    height: 32,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagText: { fontSize: 12, fontFamily: 'DMSans_500Medium' },
  textArea: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
    lineHeight: 22,
    minHeight: 130,
    marginTop: 4,
  },
  charCount: {
    fontSize: 11,
    fontFamily: 'DMSans_400Regular',
    textAlign: 'right',
    marginTop: 6,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 12,
    borderTopWidth: 1,
  },
  submitBtn: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitBtnText: { fontSize: 15, fontFamily: 'DMSans_700Bold', color: '#fff' },
});
