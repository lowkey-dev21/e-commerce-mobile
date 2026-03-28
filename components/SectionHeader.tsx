import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/useTheme';

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

export function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  const colors = useTheme();
  return (
    <View style={styles.row}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      {onSeeAll && (
        <Pressable onPress={onSeeAll} style={[styles.arrowBtn, { backgroundColor: colors.border }]}>
          <Text style={[styles.arrow, { color: colors.textSecondary }]}>›</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 17,
    fontFamily: 'DMSans_700Bold',
  },
  arrowBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    fontSize: 18,
    lineHeight: 22,
  },
});
