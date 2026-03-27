import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useThemeStore } from '../store/themeStore';
import { useTheme } from '../hooks/useTheme';

export default function RootLayout() {
  const { loadTheme, isDark } = useThemeStore();
  const colors = useTheme();

  useEffect(() => {
    loadTheme();
  }, []);

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
          options={{
            title: 'Product',
            headerBackTitle: 'Back',
          }}
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
