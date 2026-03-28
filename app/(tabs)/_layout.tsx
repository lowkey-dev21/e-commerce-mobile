import { Tabs } from 'expo-router';
import { View, Pressable, Text, GestureResponderEvent } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { HomeIcon } from '../../components/icons/HomeIcon';
import { DashboardIcon } from '../../components/icons/DashboardIcon';
import { CartIcon } from '../../components/icons/CartIcon';
import { WishlistIcon } from '../../components/icons/WishlistIcon';
import { useCartStore } from '../../store/cartStore';

const ORANGE = '#F4A94E';
const INACTIVE = '#C5C5C5';

function CartTabButton({ onPress }: { onPress?: (e: GestureResponderEvent) => void }) {
  const totalItems = useCartStore((s) => s.totalItems());
  return (
    <Pressable onPress={onPress} className="flex-1 items-center justify-end pb-[18px]">
      <View
        className="w-[66px] h-[66px] rounded-full items-center justify-center"
        style={{
          backgroundColor: ORANGE,
          borderWidth: 4,
          borderColor: '#fff',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.18,
          shadowRadius: 10,
          elevation: 10,
          transform: [{ translateY: -18 }],
        }}
      >
        <CartIcon />
        {totalItems > 0 && (
          <View
            className="absolute rounded-full items-center justify-center"
            style={{
              top: 4,
              right: 4,
              minWidth: 18,
              height: 18,
              backgroundColor: '#FF4444',
              borderWidth: 2,
              borderColor: '#fff',
              paddingHorizontal: 4,
            }}
          >
            <Text className="text-white font-bold" style={{ fontSize: 9, lineHeight: 12 }}>
              {totalItems}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 0,

          paddingTop: 6,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 6,
        },
        tabBarActiveTintColor: ORANGE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerTitle: 'ShopEase',
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Categories',
          headerShown: false,
          tabBarIcon: ({ color }) => <DashboardIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: '',
          headerTitle: 'My Cart',
          tabBarButton: (props) => <CartTabButton onPress={props.onPress ?? undefined} />,
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          headerTitle: 'My Wishlist',
          tabBarIcon: ({ color }) => <WishlistIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerTitle: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={26} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
