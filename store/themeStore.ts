import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeStore = {
  isDark: boolean;
  isLoaded: boolean;
  toggleTheme: () => void;
  loadTheme: () => Promise<void>;
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  isDark: false,
  isLoaded: false,

  loadTheme: async () => {
    try {
      const stored = await AsyncStorage.getItem('theme');
      set({ isDark: stored === 'dark', isLoaded: true });
    } catch {
      set({ isLoaded: true });
    }
  },

  toggleTheme: () => {
    const next = !get().isDark;
    set({ isDark: next });
    AsyncStorage.setItem('theme', next ? 'dark' : 'light').catch(() => {});
  },
}));
