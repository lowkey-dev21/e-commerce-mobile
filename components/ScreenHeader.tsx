import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../hooks/useTheme';
import { BackIcon } from './icons/BackIcon';

interface ScreenHeaderProps {
  title: string;
  /** If provided, shows a back button and centers the title */
  onBack?: () => void;
  /** Optional right-side element */
  right?: React.ReactNode;
  /** Use large title style (22px) for tab screens. Default is 17px for detail screens */
  large?: boolean;
}

export function ScreenHeader({ title, onBack, right, large = false }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();
  const colors = useTheme();

  return (
    <View
      style={[
        styles.header,
        { paddingTop: insets.top + 10, backgroundColor: colors.card },
        !onBack && styles.simpleHeader,
      ]}
    >
      {onBack ? (
        <>
          <Pressable
            onPress={onBack}
            style={[styles.backBtn, { backgroundColor: colors.background }]}
          >
            <BackIcon color={colors.text} size={22} />
          </Pressable>
          <Text style={[styles.title, large ? styles.titleLarge : styles.titleSmall, { color: colors.text }]}>
            {title}
          </Text>
          <View style={styles.rightSlot}>
            {right ?? <View style={{ width: 40 }} />}
          </View>
        </>
      ) : (
        <>
          <Text style={[styles.title, styles.titleLarge, { color: colors.text }]}>{title}</Text>
          {right && <View>{right}</View>}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  simpleHeader: {
    justifyContent: 'space-between',
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
  title: {
    fontFamily: 'DMSans_700Bold',
  },
  titleSmall: {
    fontSize: 17,
  },
  titleLarge: {
    fontSize: 22,
  },
  rightSlot: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
