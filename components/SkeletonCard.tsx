import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

export const SkeletonCard = () => {
  const colors = useTheme();
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <Animated.View style={[styles.image, { backgroundColor: colors.skeletonHighlight, opacity }]} />
      <View style={styles.info}>
        <Animated.View style={[styles.line, { width: '50%', backgroundColor: colors.skeletonHighlight, opacity }]} />
        <Animated.View style={[styles.line, { width: '90%', marginTop: 8, backgroundColor: colors.skeletonHighlight, opacity }]} />
        <Animated.View style={[styles.line, { width: '70%', marginTop: 4, backgroundColor: colors.skeletonHighlight, opacity }]} />
        <Animated.View style={[styles.line, { width: '40%', marginTop: 8, height: 18, backgroundColor: colors.skeletonHighlight, opacity }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 160,
  },
  info: { padding: 12 },
  line: {
    height: 12,
    borderRadius: 6,
  },
});
