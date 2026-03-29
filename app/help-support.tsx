import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../hooks/useTheme';
import { SearchInput } from '../components/SearchInput';
import { ScreenHeader } from '../components/ScreenHeader';
import { DotsVerticalIcon } from '../components/icons/DotsVerticalIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { ChevronUpIcon } from '../components/icons/ChevronUpIcon';

const FAQ_ANSWER =
  'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.';

const FAQ_ITEMS = [
  { id: 0, question: 'Lorem ipsum dolor sit amet' },
  { id: 1, question: 'Lorem ipsum dolor sit amet' },
  { id: 2, question: 'Lorem ipsum dolor sit amet' },
  { id: 3, question: 'Lorem ipsum dolor sit amet' },
  { id: 4, question: 'Lorem ipsum dolor sit amet' },
];

export default function HelpSupportScreen() {
  const colors = useTheme();
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<number | null>(2);

  const handleToggle = (id: number) => {
    setExpanded(prev => (prev === id ? null : id));
  };

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScreenHeader
        title="Help and Support"
        onBack={() => router.back()}
        right={
          <Pressable style={styles.dotsBtn}>
            <DotsVerticalIcon color={colors.text} size={22} />
          </Pressable>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}>
        <SearchInput value={search} onChangeText={setSearch} placeholder="Search" />

        <View style={{ marginHorizontal: 20, marginTop: 8, gap: 10 }}>
          {FAQ_ITEMS.map((item) => {
            const isExpanded = expanded === item.id;
            return (
              <View key={item.id} style={[styles.faqCard, { backgroundColor: colors.card }]}>
                <Pressable onPress={() => handleToggle(item.id)} style={styles.faqRow}>
                  <Text style={[styles.faqQuestion, { color: colors.text }]}>{item.question}</Text>
                  {isExpanded
                    ? <ChevronUpIcon color={colors.textSecondary} size={18} />
                    : <ChevronDownIcon color={colors.textSecondary} size={18} />
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
  dotsBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
