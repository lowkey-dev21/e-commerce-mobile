import { View, TextInput, StyleSheet, RefObject } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MicIcon } from './icons/MicIcon';

const TEAL = '#4AB7B6';

function SearchIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={8} stroke="#AFAFAF" strokeWidth={2} />
      <Path d="M21 21L16.65 16.65" stroke="#AFAFAF" strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

interface AppHeaderProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onFocus?: () => void;
  inputRef?: RefObject<TextInput>;
  /** true = teal background (search tab). false = plain white bar (home screen) */
  withBackground?: boolean;
}

export function AppHeader({
  placeholder = 'Search Anything...',
  value,
  onChangeText,
  onFocus,
  inputRef,
  withBackground = true,
}: AppHeaderProps) {
  const insets = useSafeAreaInsets();

  if (!withBackground) {
    return (
      <View style={styles.plainWrapper}>
        <View style={styles.searchBar}>
          <SearchIcon />
          <TextInput
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

  return (
    <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
      <View style={styles.searchBar}>
        <SearchIcon />
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 50,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'DMSans_400Regular',
    color: '#333',
  },
});
