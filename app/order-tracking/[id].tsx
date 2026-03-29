import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path, Circle } from 'react-native-svg';
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from 'react-native-maps';
import { useTheme } from '../../hooks/useTheme';
import { BackIcon } from '../../components/icons/BackIcon';

const TEAL = '#4AB7B6';

function ShopIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9 22V12H15V22" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function BikeIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx={5.5} cy={17.5} r={3.5} stroke="#fff" strokeWidth={1.8} />
      <Circle cx={18.5} cy={17.5} r={3.5} stroke="#fff" strokeWidth={1.8} />
      <Path d="M15 6H17L19.5 10.5M8 17.5H15L17 10.5M8 17.5L10 10.5H13L15 6" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function PinIcon() {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx={12} cy={10} r={3} stroke="#fff" strokeWidth={1.8} />
    </Svg>
  );
}

const STEPS = [
  { id: '1', icon: <ShopIcon />, label: 'Picked from shop', sub: 'Store • 10:30 AM', done: true },
  { id: '2', icon: <BikeIcon />, label: 'On the way', sub: 'Delivery • 11:00 AM', done: true },
  { id: '3', icon: <PinIcon />, label: 'Out for delivery', sub: 'Near you • 12:30 PM', done: false },
];

export default function OrderTrackingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useTheme();
  const [marked, setMarked] = useState(false);

  return (
    <View style={[styles.screen, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Map */}
        <MapView
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          initialRegion={{
            latitude: 12.9716,
            longitude: 77.5946,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
        >
          <Marker coordinate={{ latitude: 12.9716, longitude: 77.5946 }} pinColor={TEAL} />
          <Marker coordinate={{ latitude: 12.9916, longitude: 77.6146 }} pinColor={TEAL} />
          <Polyline
            coordinates={[
              { latitude: 12.9716, longitude: 77.5946 },
              { latitude: 12.9816, longitude: 77.5946 },
              { latitude: 12.9916, longitude: 77.6146 },
            ]}
            strokeColor={TEAL}
            strokeWidth={3}
          />
        </MapView>

        {/* Sheet */}
        <View style={[styles.sheet, { backgroundColor: colors.background }]}>
          {/* ETA card */}
          <View style={[styles.etaCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <View>
              <Text style={[styles.etaLabel, { color: colors.textSecondary }]}>Estimated Arrival</Text>
              <Text style={[styles.etaTime, { color: colors.text }]}>Today, 1:00 – 2:00 PM</Text>
            </View>
            <View style={[styles.etaBadge, { backgroundColor: TEAL + '20' }]}>
              <Text style={[styles.etaBadgeText, { color: TEAL }]}>On the way</Text>
            </View>
          </View>

          {/* Progress */}
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Order Progress</Text>

          <View style={styles.timeline}>
            {STEPS.map((step, index) => {
              const isLast = index === STEPS.length - 1;
              return (
                <View key={step.id} style={styles.step}>
                  {!isLast && (
                    <View style={[styles.stepLine, { backgroundColor: step.done ? TEAL : colors.border }]} />
                  )}
                  <View style={[styles.stepIcon, { backgroundColor: step.done ? TEAL : colors.skeleton }]}>
                    {step.icon}
                  </View>
                  <View style={styles.stepText}>
                    <Text style={[styles.stepLabel, { color: step.done ? colors.text : colors.textSecondary }]}>
                      {step.label}
                    </Text>
                    <Text style={[styles.stepSub, { color: colors.textSecondary }]}>{step.sub}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Sticky bottom button */}
      <View style={[styles.bottomBar, { backgroundColor: colors.background, paddingBottom: insets.bottom + 12, borderTopColor: colors.border }]}>
        <Pressable
          onPress={() => { setMarked(true); router.back(); }}
          style={[styles.doneBtn, { borderColor: TEAL, backgroundColor: 'transparent' }]}
        >
          <Text style={[styles.doneBtnText, { color: TEAL }]}>
            {marked ? 'Marked as Received ✓' : 'Mark as Received'}
          </Text>
        </Pressable>
      </View>

      {/* Floating header over map */}
      <View style={[styles.header, { top: insets.top + 10 }]}>
        <Pressable onPress={() => router.back()} style={[styles.backBtn, { backgroundColor: colors.card }]}>
          <BackIcon color={colors.text} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 10,
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
  title: { fontSize: 17, fontFamily: 'DMSans_700Bold' },
  map: {
    height: 380,
    width: '100%',
  },
  sheet: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingTop: 16,
    marginTop: -28,
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
  etaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    borderWidth: 0.8,
    marginBottom: 24,
  },
  etaLabel: { fontSize: 12, fontFamily: 'DMSans_400Regular', marginBottom: 4 },
  etaTime: { fontSize: 15, fontFamily: 'DMSans_700Bold' },
  etaBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  etaBadgeText: { fontSize: 12, fontFamily: 'DMSans_500Medium' },
  sectionTitle: { fontSize: 16, fontFamily: 'DMSans_700Bold', marginBottom: 20 },
  timeline: { gap: 0 },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 24,
    position: 'relative',
  },
  stepLine: {
    position: 'absolute',
    left: 20,
    top: 44,
    width: 2,
    height: 28,
    borderRadius: 1,
  },
  stepIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: { flex: 1, paddingTop: 4 },
  stepLabel: { fontSize: 14, fontFamily: 'DMSans_700Bold', marginBottom: 3 },
  stepSub: { fontSize: 12, fontFamily: 'DMSans_400Regular' },
  doneBtn: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneBtnText: { fontSize: 15, fontFamily: 'DMSans_700Bold' },
});
