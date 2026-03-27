import { useColorScheme } from 'react-native';
import { Colors, ColorScheme } from '../constants/Colors';
import { useThemeStore } from '../store/themeStore';

export const useTheme = (): ColorScheme => {
  const { isDark, isLoaded } = useThemeStore();
  const systemScheme = useColorScheme();

  // Use user preference if loaded, otherwise fall back to system
  const dark = isLoaded ? isDark : systemScheme === 'dark';
  return dark ? Colors.dark : Colors.light;
};
