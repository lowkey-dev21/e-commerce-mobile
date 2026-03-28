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
          name="reviews/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="category/[name]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="order-tracking/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="drop-review/[id]"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="notifications"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="settings"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="edit-profile"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="change-password"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="address"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="add-card"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="notification-settings"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="security"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="language"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="help-support"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="legal"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="checkout"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="confirmation"
          options={{ title: 'Order Confirmed', headerShown: false }}
        />
      </Stack>
    </>
  );
}
