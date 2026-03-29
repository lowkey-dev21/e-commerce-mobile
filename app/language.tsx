import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { SearchInput } from '../components/SearchInput';
import { BackIcon } from '../components/icons/BackIcon';
import { DotsVerticalIcon } from '../components/icons/DotsVerticalIcon';

const TEAL = '#4AB7B6';

const LANGUAGES = [
  { id: 'en', flag: '🇬🇧', name: 'English' },
  { id: 'id', flag: '🇮🇩', name: 'Bahasa Indonesia' },
  { id: 'zh', flag: '🇨🇳', name: 'Chinese' },
  { id: 'de', flag: '🇩🇪', name: 'Deutsch' },
];



function CheckIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M20 6L9 17L4 12" stroke={TEAL} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export default function LanguageScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selected, setSelected] = useState('en');
  const [search, setSearch] = useState('');

  const filtered = LANGUAGES.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.background }]}>
          <BackIcon color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Language</Text>
        <Pressable style={styles.dotsBtn}>
          <DotsVerticalIcon color={colors.text} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}>
        <SearchInput value={search} onChangeText={setSearch} placeholder="Search language" />

        {/* Language list */}
        <View style={{ gap: 10, marginTop: 8, paddingHorizontal: 20 }}>
          {filtered.map(lang => {
            const isSelected = selected === lang.id;
            return (
              <Pressable
                key={lang.id}
                onPress={() => setSelected(lang.id)}
                style={[
                  styles.langCard,
                  { backgroundColor: colors.card },
                  isSelected
                    ? { borderColor: TEAL, borderWidth: 1.8 }
                    : { borderWidth: 0 },
                ]}
              >
                <Text style={styles.flag}>{lang.flag}</Text>
                <Text style={[styles.langName, { color: colors.text }]}>{lang.name}</Text>
                {isSelected && <CheckIcon />}
              </Pressable>
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
  langCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  flag: { fontSize: 24 },
  langName: { flex: 1, fontSize: 14, fontFamily: 'DMSans_500Medium' },
});
