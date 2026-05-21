import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6ed6f2',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Trang chủ',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          title: 'Thanh toán',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="account-balance-wallet" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Hoạt động',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="receipt-long" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Tin nhắn',
          tabBarIcon: ({ color, size }) => (
            <View>
              <MaterialIcons name="chat" size={size} color={color} />
              {/* Fake Badge */}
              <View className="absolute -top-1 -right-2 bg-red-500 rounded-full w-4 h-4 items-center justify-center border border-white">
                <Text className="text-white text-[9px] font-bold">2</Text>
              </View>
            </View>
          ),
        }}
      />
      {/* Hide old tabs or profile if we don't need them in bottom bar */}
      <Tabs.Screen
        name="cart"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="notifications"
        options={{ href: null }}
      />
      <Tabs.Screen
        name="profile"
        options={{ href: null }}
      />
    </Tabs>
  );
}
