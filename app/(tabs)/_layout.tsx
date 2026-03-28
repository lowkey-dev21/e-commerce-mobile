import { Tabs } from 'expo-router';
import { View, Pressable, StyleSheet, Text } from 'react-native';
import Svg, { Path, G, Rect, ClipPath, Defs } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useCartStore } from '../../store/cartStore';

const ORANGE = '#F4A94E';
const INACTIVE = '#C5C5C5';

function HomeIcon({ color }: { color: string }) {
  return (
    <Svg width={21} height={21} viewBox="0 0 21 21" fill="none">
      <Path
        d="M20.9386 10.7893C20.8824 10.9263 20.7868 11.0436 20.664 11.1263C20.5412 11.2091 20.3967 11.2536 20.2486 11.2543H17.9986V18.7543C17.9986 19.3511 17.7616 19.9234 17.3396 20.3453C16.9177 20.7673 16.3454 21.0043 15.7486 21.0043H12.7486C12.5497 21.0043 12.359 20.9253 12.2183 20.7847C12.0777 20.644 11.9986 20.4533 11.9986 20.2543V15.7543C11.9986 15.5554 11.9196 15.3647 11.779 15.224C11.6383 15.0834 11.4476 15.0043 11.2486 15.0043H9.74864C9.54973 15.0043 9.35896 15.0834 9.21831 15.224C9.07766 15.3647 8.99864 15.5554 8.99864 15.7543V20.2543C8.99864 20.4533 8.91962 20.644 8.77897 20.7847C8.63832 20.9253 8.44755 21.0043 8.24864 21.0043H5.24864C4.6519 21.0043 4.07961 20.7673 3.65765 20.3453C3.23569 19.9234 2.99864 19.3511 2.99864 18.7543V11.2543H0.74864C0.600571 11.2536 0.456034 11.2091 0.333243 11.1263C0.210453 11.0436 0.114905 10.9263 0.0586397 10.7893C0.00120517 10.6528 -0.0144868 10.5022 0.0135438 10.3567C0.0415744 10.2112 0.112072 10.0773 0.21614 9.97185L9.96614 0.221849C10.0359 0.151552 10.1188 0.0957567 10.2102 0.0576802C10.3016 0.0196037 10.3996 0 10.4986 0C10.5976 0 10.6957 0.0196037 10.7871 0.0576802C10.8785 0.0957567 10.9614 0.151552 11.0311 0.221849L20.7811 9.97185C20.8852 10.0773 20.9557 10.2112 20.9837 10.3567C21.0118 10.5022 20.9961 10.6528 20.9386 10.7893Z"
        fill={color}
      />
    </Svg>
  );
}

function DashboardIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Defs>
        <ClipPath id="clip_dashboard">
          <Rect width={24} height={24} fill="white" />
        </ClipPath>
      </Defs>
      <G clipPath="url(#clip_dashboard)">
        <Path
          d="M4 13H10C10.55 13 11 12.55 11 12V4C11 3.45 10.55 3 10 3H4C3.45 3 3 3.45 3 4V12C3 12.55 3.45 13 4 13ZM4 21H10C10.55 21 11 20.55 11 20V16C11 15.45 10.55 15 10 15H4C3.45 15 3 15.45 3 16V20C3 20.55 3.45 21 4 21ZM14 21H20C20.55 21 21 20.55 21 20V12C21 11.45 20.55 11 20 11H14C13.45 11 13 11.45 13 12V20C13 20.55 13.45 21 14 21ZM13 4V8C13 8.55 13.45 9 14 9H20C20.55 9 21 8.55 21 8V4C21 3.45 20.55 3 20 3H14C13.45 3 13 3.45 13 4Z"
          fill={color}
        />
      </G>
    </Svg>
  );
}

function CartIcon() {
  return (
    <Svg width={24} height={23} viewBox="0 0 24 23" fill="none">
      <Path
        d="M18.1776 17.2706C16.6362 17.2691 15.3855 18.5174 15.3839 20.0588C15.3824 21.6002 16.6308 22.8509 18.1722 22.8525C19.7136 22.8539 20.9643 21.6056 20.9659 20.0642V20.0615C20.9644 18.5218 19.7173 17.2736 18.1776 17.2706Z"
        fill="white"
      />
      <Path
        d="M23.1278 3.90597C23.061 3.89303 22.9932 3.88646 22.9251 3.88636H5.93181L5.66267 2.08582C5.49499 0.890047 4.47216 0.000367962 3.26466 0H1.07655C0.481978 0 0 0.481977 0 1.07655C0 1.67112 0.481978 2.1531 1.07655 2.1531H3.26734C3.40423 2.1521 3.52008 2.25403 3.53648 2.38996L5.19436 13.7529C5.42166 15.1968 6.66363 16.262 8.12528 16.2667H19.3241C20.7313 16.2685 21.9454 15.2795 22.2281 13.901L23.9802 5.16744C24.0931 4.5837 23.7115 4.01893 23.1278 3.90597Z"
        fill="white"
      />
      <Path
        d="M11.3405 19.942C11.2749 18.4458 10.0401 17.268 8.54246 17.2732C7.00233 17.3355 5.80425 18.6345 5.86648 20.1746C5.9262 21.6524 7.12833 22.827 8.60707 22.8525H8.67435C10.2143 22.785 11.4079 21.4819 11.3405 19.942Z"
        fill="white"
      />
    </Svg>
  );
}

function WishlistIcon({ color }: { color: string }) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.835 4.55252C19.7694 3.49089 18.3266 2.89481 16.8225 2.89481C15.3183 2.89481 13.8755 3.49089 12.81 4.55252L12 5.36252L11.19 4.55252C10.1244 3.49089 8.68158 2.89481 7.17745 2.89481C5.67332 2.89481 4.23049 3.49089 3.16495 4.55252C2.10287 5.61933 1.50659 7.0634 1.50659 8.56877C1.50659 10.0741 2.10287 11.5182 3.16495 12.585L11.4675 20.8875C11.5372 20.9578 11.6201 21.0136 11.7115 21.0517C11.8029 21.0898 11.9009 21.1094 12 21.1094C12.099 21.1094 12.197 21.0898 12.2884 21.0517C12.3798 21.0136 12.4627 20.9578 12.5325 20.8875L20.835 12.585C21.897 11.5182 22.4933 10.0741 22.4933 8.56877C22.4933 7.0634 21.897 5.61933 20.835 4.55252Z"
        fill={color}
      />
    </Svg>
  );
}

function CartTabButton({ onPress }: { onPress?: () => void }) {
  const totalItems = useCartStore((s) => s.totalItems());
  return (
    <Pressable onPress={onPress} style={styles.cartButtonWrapper}>
      <View style={styles.cartCircle}>
        <CartIcon />
        {totalItems > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{totalItems}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
}

export default function TabsLayout() {
  const colors = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
          elevation: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -3 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: ORANGE,
        tabBarInactiveTintColor: INACTIVE,
        tabBarLabelStyle: { fontSize: 11, fontFamily: 'DMSans_500Medium', marginTop: 2 },
        headerStyle: { backgroundColor: colors.card },
        headerTintColor: colors.text,
        headerShadowVisible: false,
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
          headerTitle: 'Search & Filter',
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

const styles = StyleSheet.create({
  cartButtonWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 10,
    elevation: 10,
    transform: [{ translateY: -16 }],
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
    borderWidth: 1.5,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '700',
  },
});
