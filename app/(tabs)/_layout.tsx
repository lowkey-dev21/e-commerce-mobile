import { Tabs } from 'expo-router';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { useCartStore } from '../../store/cartStore';
import { useThemeStore } from '../../store/themeStore';

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return <Text style={{ fontSize: focused ? 24 : 22, opacity: focused ? 1 : 0.6 }}>{emoji}</Text>;
}

function CartTabIcon({ focused }: { focused: boolean }) {
  const totalItems = useCartStore((s) => s.totalItems());
  return (
    <Text style={{ fontSize: focused ? 24 : 22, opacity: focused ? 1 : 0.6 }}>
      🛒{totalItems > 0 ? ` ${totalItems}` : ''}
    </Text>
  );
}

export default function TabsLayout() {
  const colors = useTheme();
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.tabBarBorder,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        headerRight: () => (
          <Pressable onPress={toggleTheme} style={styles.themeBtn}>
            <Text style={{ fontSize: 20 }}>{isDark ? '☀️' : '🌙'}</Text>
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🏠" focused={focused} />,
          headerTitle: 'ShopEase',
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => <TabIcon emoji="🔍" focused={focused} />,
          headerTitle: 'Search & Filter',
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => <CartTabIcon focused={focused} />,
          headerTitle: 'My Cart',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  themeBtn: { marginRight: 16, padding: 4 },
});
