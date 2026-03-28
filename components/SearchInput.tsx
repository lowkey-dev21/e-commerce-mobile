import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useTheme } from '../hooks/useTheme';

const TEAL = '#4AB7B6';

function SearchIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={8} stroke={color} strokeWidth={2} />
      <Path d="M21 21L16.65 16.65" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChangeText, placeholder = 'Search...' }: SearchInputProps) {
  const colors = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View style={[
      styles.container,
      { borderColor: focused ? TEAL : colors.border, borderWidth: focused ? 1.8 : 1 },
    ]}>
      <SearchIcon color={focused ? TEAL : '#AFAFAF'} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#AFAFAF"
        style={[styles.input, { color: colors.text }]}
        returnKeyType="search"
        clearButtonMode="while-editing"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 14,
    height: 50,
    gap: 10,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
    backgroundColor: 'transparent',
  },
});
