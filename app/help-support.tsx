import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { SearchInput } from '../components/SearchInput';

const TEAL = '#4AB7B6';

const FAQ_ANSWER =
  'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.';

const FAQ_ITEMS = [
  { id: 0, question: 'Lorem ipsum dolor sit amet' },
  { id: 1, question: 'Lorem ipsum dolor sit amet' },
  { id: 2, question: 'Lorem ipsum dolor sit amet' },
  { id: 3, question: 'Lorem ipsum dolor sit amet' },
  { id: 4, question: 'Lorem ipsum dolor sit amet' },
];

function BackIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function DotsIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={5} r={1.2} fill={color} />
      <Circle cx={12} cy={12} r={1.2} fill={color} />
      <Circle cx={12} cy={19} r={1.2} fill={color} />
    </Svg>
  );
}

function ChevronDownIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M6 9L12 15L18 9" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronUpIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M18 15L12 9L6 15" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function HelpSupportScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<number | null>(2);

  const handleToggle = (id: number) => {
    setExpanded(prev => (prev === id ? null : id));
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.background }]}>
          <BackIcon color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Help and Support</Text>
        <Pressable style={styles.dotsBtn}>
          <DotsIcon color={colors.text} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}>
        <SearchInput value={search} onChangeText={setSearch} placeholder="Search" />

        {/* FAQ items — each as its own shadow card */}
        <View style={{ marginHorizontal: 20, marginTop: 8, gap: 10 }}>
          {FAQ_ITEMS.map((item) => {
            const isExpanded = expanded === item.id;
            return (
              <View key={item.id} style={[styles.faqCard, { backgroundColor: colors.card }]}>
                <Pressable onPress={() => handleToggle(item.id)} style={styles.faqRow}>
                  <Text style={[styles.faqQuestion, { color: colors.text }]}>{item.question}</Text>
                  {isExpanded
                    ? <ChevronUpIcon color={colors.textSecondary} />
                    : <ChevronDownIcon color={colors.textSecondary} />
                  }
                </Pressable>
                {isExpanded && (
                  <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>
                    {FAQ_ANSWER}
                  </Text>
                )}
              </View>
            );
          })}
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
  dotsBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 17, fontFamily: 'DMSans_700Bold' },
  faqCard: {
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
  },
  faqAnswer: {
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
    lineHeight: 20,
    paddingTop: 4,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
});
