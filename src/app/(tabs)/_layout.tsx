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
        name="map"
        options={{
          title: 'Bản đồ',
          tabBarIcon: ({ color, size, focused }) => (
            <View className="relative w-10 h-10 items-center justify-center">
              <View className={`absolute inset-0 rounded-full ${focused ? 'bg-[#e0f2fe]' : ''}`} />
              <MaterialIcons name="location-on" size={size} color={color} />
            </View>
          ),
        }}
      />
      
      {/* SCAN: Center Floating Button */}
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Quét món',
          tabBarLabel: () => null, // Hide text for FAB
          tabBarIcon: ({ focused }) => (
            <View className="relative w-full items-center">
              <View 
                className={`absolute -top-7 w-16 h-16 rounded-full items-center justify-center 
                  bg-[#6ed6f2]/90 border-4 border-white/80 shadow-xl shadow-cyan-400
                  ${focused ? 'scale-110 bg-[#6ed6f2]' : ''}`}
                style={{
                  elevation: 10,
                }}
              >
                <MaterialIcons name="qr-code-scanner" size={32} color="#FFF" />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="heart"
        options={{
          title: 'Yêu thích',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="favorite-border" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Tin nhắn',
          tabBarIcon: ({ color, size, focused }) => (
            <View className="relative w-10 h-10 items-center justify-center">
              <View className={`absolute inset-0 rounded-full ${focused ? 'bg-[#e0f2fe]' : ''}`} />
              <MaterialIcons name="chat" size={size} color={color} />
              {/* Fake Badge */}
              <View className="absolute top-0 right-0 bg-red-500 rounded-full w-4 h-4 items-center justify-center border border-white">
                <Text className="text-white text-[8px] font-black">2</Text>
              </View>
            </View>
          ),
        }}
      />

      {/* Hidden tabs */}
      <Tabs.Screen name="payment" options={{ href: null }} />
      <Tabs.Screen name="activity" options={{ href: null }} />
      <Tabs.Screen name="cart" options={{ href: null }} />
      <Tabs.Screen name="notifications" options={{ href: null }} />
      <Tabs.Screen name="profile" options={{ href: null }} />
    </Tabs>
  );
}
