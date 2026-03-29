import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';
import { BackIcon } from '../components/icons/BackIcon';
import { DotsVerticalIcon } from '../components/icons/DotsVerticalIcon';

const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget ornare quam vel facilisis feugiat amet sagittis arcu, tortor. Sapien, consequat ultrices morbi orci semper sit nulla. Leo auctor ut etiam est, amet aliquet ut vivamus. Odio vulputate est id tincidunt fames.';



export default function LegalScreen() {
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
        <Text style={[styles.title, { color: colors.text }]}>Legal and Policies</Text>
        <Pressable style={styles.dotsBtn}>
          <DotsVerticalIcon color={colors.text} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 40 }}
      >
        {/* Section 1 */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Terms</Text>
        <Text style={[styles.bodyText, { color: colors.textSecondary }]}>{LOREM}</Text>
        <Text style={[styles.bodyText, { color: colors.textSecondary }]}>{LOREM}</Text>

        {/* Section 2 */}
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Changes to the Service and/or Terms:</Text>
        <Text style={[styles.bodyText, { color: colors.textSecondary }]}>{LOREM}</Text>
        <Text style={[styles.bodyText, { color: colors.textSecondary }]}>{LOREM}</Text>
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
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'DMSans_700Bold',
    marginTop: 20,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
    lineHeight: 22,
    marginBottom: 14,
  },
});
