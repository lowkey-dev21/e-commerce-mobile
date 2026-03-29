import { useState, RefObject } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MicIcon } from './icons/MicIcon';
import { SearchIcon } from './icons/SearchIcon';
import { useTheme } from '../hooks/useTheme';

const TEAL = '#4AB7B6';

interface AppHeaderProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  onClose?: () => void;
  showClose?: boolean;
  inputRef?: RefObject<TextInput | null>;
  /** true = teal background (search tab). false = plain white bar (home screen) */
  withBackground?: boolean;
}

export function AppHeader({
  placeholder = 'Search Anything...',
  value,
  onChangeText,
  onFocus,
  onClose,
  showClose,
  inputRef,
  withBackground = true,
}: AppHeaderProps) {
  const insets = useSafeAreaInsets();
  const colors = useTheme();
  const [focused, setFocused] = useState(false);

  if (!withBackground) {
    return (
      <View style={[styles.plainWrapper, { backgroundColor: colors.background, paddingTop: showClose ? insets.top + 10 : 8 }]}>
        <View style={[styles.searchBar, { borderWidth: focused ? 1.8 : 1, borderColor: focused ? TEAL : colors.border }]}>
          <SearchIcon color="#AFAFAF" size={18} />
          <TextInput
            ref={inputRef}
            style={[styles.input, { color: colors.text }]}
            placeholder={placeholder}
            placeholderTextColor="#AFAFAF"
            value={value}
            onChangeText={onChangeText}
            onFocus={() => { setFocused(true); onFocus?.(); }}
            onBlur={() => setFocused(false)}
            returnKeyType="search"
            autoFocus={showClose}
            clearButtonMode="while-editing"
          />
          <MicIcon color={TEAL} size={20} />
        </View>
        {showClose && (
          <Pressable onPress={onClose} style={styles.cancelBtn}>
            <Text style={[styles.cancelText, { color: TEAL }]}>Cancel</Text>
          </Pressable>
        )}
      </View>
    );
  }

  return (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <View style={styles.searchBar}>
        <SearchIcon color="#AFAFAF" size={18} />
        <TextInput
          ref={inputRef}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#AFAFAF"
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          returnKeyType="search"
          clearButtonMode="while-editing"
        />
        <MicIcon color={TEAL} size={20} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: TEAL,
    paddingBottom: 24,
    paddingHorizontal: 16,
  },
  plainWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 10,
    gap: 10,
  },
  cancelBtn: {
    paddingVertical: 4,
  },
  cancelText: {
    fontSize: 14,
    fontFamily: 'DMSans_500Medium',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 50,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
    backgroundColor: 'transparent',
  },
});
