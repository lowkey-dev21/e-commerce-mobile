import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';

const TEAL = '#4AB7B6';

function BackIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18L9 12L15 6" stroke={color} strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PinIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={12} cy={9} r={2.5} stroke={color} strokeWidth={1.8} />
    </Svg>
  );
}

function GpsIcon({ color }: { color: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={12} r={3} stroke={color} strokeWidth={1.8} />
      <Path d="M12 2V6M12 18V22M2 12H6M18 12H22" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
      <Circle cx={12} cy={12} r={8} stroke={color} strokeWidth={1.2} strokeDasharray="3 2" />
    </Svg>
  );
}

function LocationMapThumb({ selected, pinColor }: { selected: boolean; pinColor: string }) {
  return (
    <View style={[styles.mapCircle, { borderColor: selected ? TEAL : '#E0E0E0', borderWidth: selected ? 2.5 : 1.5 }]}>
      <Svg width={56} height={56} viewBox="0 0 56 56">
        <Circle cx={28} cy={28} r={28} fill={selected ? '#E8F4F3' : '#F5F5F5'} />
        <Path d="M4 20 Q14 12 28 20 Q42 28 52 20" stroke={selected ? '#B2DFDB' : '#E0E0E0'} strokeWidth={1.5} fill="none" />
        <Path d="M4 32 Q14 24 28 32 Q42 40 52 32" stroke={selected ? '#B2DFDB' : '#E0E0E0'} strokeWidth={1.5} fill="none" />
        <Path d="M14 4 L14 52" stroke={selected ? '#B2DFDB' : '#E0E0E0'} strokeWidth={1} />
        <Path d="M28 4 L28 52" stroke={selected ? '#B2DFDB' : '#E0E0E0'} strokeWidth={1} />
        <Path d="M42 4 L42 52" stroke={selected ? '#B2DFDB' : '#E0E0E0'} strokeWidth={1} />
        {/* Pin */}
        <Path d="M28 16C24.69 16 22 18.69 22 22C22 26.25 28 33 28 33C28 33 34 26.25 34 22C34 18.69 31.31 16 28 16Z" fill={pinColor} />
        <Circle cx={28} cy={22} r={2.5} fill="#fff" />
      </Svg>
    </View>
  );
}

const LOCATIONS = [
  { id: 'la', city: 'Los Angeles', full: 'Los Angeles, United States', pinColor: TEAL },
  { id: 'sf', city: 'San Francisco', full: 'San Francisco, United States', pinColor: '#9E9E9E' },
  { id: 'ny', city: 'New York', full: 'New York, United States', pinColor: '#EF4444' },
];

export default function AddressScreen() {
  const colors = useTheme();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selected, setSelected] = useState('la');
  const [query, setQuery] = useState('San Diego, CA');

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.background }]}>
          <BackIcon color={colors.text} />
        </Pressable>
        <Text style={[styles.title, { color: colors.text }]}>Address</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <Text style={[styles.heading, { color: colors.text }]}>Choose your location</Text>
        <Text style={[styles.subheading, { color: colors.textSecondary }]}>
          Let's find your unforgettable event. Choose a location below to get started.
        </Text>

        {/* Search */}
        <View style={[styles.searchRow, { backgroundColor: colors.card }]}>
          <PinIcon color={colors.textSecondary} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            style={[styles.searchInput, { color: colors.text }]}
            placeholderTextColor={colors.textSecondary}
            placeholder="Search location..."
          />
          <GpsIcon color={colors.textSecondary} />
        </View>

        <Text style={[styles.sectionTitle, { color: colors.text }]}>Select location</Text>

        <View style={{ gap: 12 }}>
          {LOCATIONS.map((loc) => {
            const isSelected = selected === loc.id;
            return (
              <Pressable
                key={loc.id}
                onPress={() => setSelected(loc.id)}
                style={[
                  styles.locationCard,
                  {
                    backgroundColor: colors.card,
                    borderColor: isSelected ? TEAL : 'transparent',
                    borderWidth: isSelected ? 1.8 : 1,
                    shadowOpacity: isSelected ? 0.1 : 0.05,
                  },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.locCity, { color: colors.text }]}>{loc.city}</Text>
                  <Text style={[styles.locFull, { color: colors.textSecondary }]}>{loc.full}</Text>
                </View>
                <LocationMapThumb selected={isSelected} pinColor={loc.pinColor} />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Confirm */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16, backgroundColor: colors.background }]}>
        <Pressable
          style={[styles.confirmBtn, { backgroundColor: TEAL }]}
          onPress={() => router.back()}
        >
          <Text style={styles.confirmBtnText}>Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingBottom: 14,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 6, elevation: 4,
  },
  title: { fontSize: 17, fontFamily: 'DMSans_700Bold' },
  heading: { fontSize: 20, fontFamily: 'DMSans_700Bold', marginBottom: 6 },
  subheading: { fontSize: 13, fontFamily: 'DMSans_400Regular', lineHeight: 20, marginBottom: 20 },
  searchRow: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    paddingHorizontal: 16, paddingVertical: 14, borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 14, fontFamily: 'DMSans_400Regular' },
  sectionTitle: { fontSize: 16, fontFamily: 'DMSans_700Bold', marginBottom: 12 },
  locationCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    padding: 14, borderRadius: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6, elevation: 2,
  },
  locCity: { fontSize: 15, fontFamily: 'DMSans_700Bold', marginBottom: 3 },
  locFull: { fontSize: 12, fontFamily: 'DMSans_400Regular' },
  mapCircle: {
    width: 60, height: 60, borderRadius: 30, overflow: 'hidden',
    alignItems: 'center', justifyContent: 'center',
  },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 20, paddingTop: 12,
  },
  confirmBtn: { borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  confirmBtnText: { color: '#fff', fontSize: 15, fontFamily: 'DMSans_700Bold' },
});
