import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useThemeStore } from '../store/themeStore';
import { useTheme } from '../hooks/useTheme';
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const { loadTheme, isDark } = useThemeStore();
  const colors = useTheme();

  const [fontsLoaded] = useFonts({
    DMSans_400Regular: require('@expo-google-fonts/dm-sans/400Regular/DMSans_400Regular.ttf'),
    DMSans_500Medium: require('@expo-google-fonts/dm-sans/500Medium/DMSans_500Medium.ttf'),
    DMSans_700Bold: require('@expo-google-fonts/dm-sans/700Bold/DMSans_700Bold.ttf'),
  });

  useEffect(() => {
    loadTheme();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.card },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="product/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="checkout"
          options={{ title: 'Checkout', headerBackTitle: 'Cart' }}
        />
        <Stack.Screen
          name="confirmation"
          options={{ title: 'Order Confirmed', headerShown: false }}
        />
      </Stack>
    </>
  );
}
