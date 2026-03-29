import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

const TEAL = '#4AB7B6';

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  /** Red text + red icon background for destructive actions */
  danger?: boolean;
  /** Custom right element — replaces the default chevron */
  right?: React.ReactNode;
  /** Value text shown to the left of the chevron (e.g. "English") */
  value?: string;
}

export function MenuItem({ icon, label, onPress, danger, right, value }: MenuItemProps) {
  const colors = useTheme();

  return (
    <Pressable onPress={onPress} style={[styles.row, { backgroundColor: colors.card }]}>
      <View style={[styles.iconWrap, { backgroundColor: danger ? '#FFF0F0' : TEAL + '18' }]}>
        {icon}
      </View>
      <Text style={[styles.label, { color: danger ? '#EF4444' : colors.text }]}>{label}</Text>
      {right !== undefined ? (
        right
      ) : (
        <>
          {value && (
            <Text style={[styles.value, { color: colors.textSecondary }]}>{value}</Text>
          )}
          {!danger && <ChevronRightIcon color={colors.textSecondary} size={18} />}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
  },
  value: {
    fontSize: 13,
    fontFamily: 'DMSans_400Regular',
    marginRight: 4,
  },
});
