import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const TEAL = '#4AB7B6';

interface TabBarProps {
  tabs: readonly string[];
  active: string;
  onTabChange: (tab: string) => void;
}

export function TabBar({ tabs, active, onTabChange }: TabBarProps) {
  const colors = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card, borderBottomColor: colors.border }]}>
      {tabs.map((tab) => {
        const isActive = active === tab;
        return (
          <Pressable key={tab} onPress={() => onTabChange(tab)} style={styles.tab}>
            <Text style={[styles.label, { color: isActive ? TEAL : colors.textSecondary }]}>
              {tab}
            </Text>
            {isActive && <View style={styles.underline} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  tab: {
    marginRight: 28,
    paddingBottom: 12,
    paddingTop: 10,
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontFamily: 'DMSans_500Medium',
  },
  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2.5,
    borderRadius: 2,
    backgroundColor: TEAL,
  },
});
