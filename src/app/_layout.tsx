import "../../global.css";
import { Stack, Redirect, useSegments } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useAuthStore } from '../store/authStore';

export default function RootLayout() {
  const { isLoggedIn, isLoading, hydrate } = useAuthStore();
  const segments = useSegments();

  // Khi mở app, khôi phục token từ AsyncStorage
  useEffect(() => {
    hydrate();
  }, []);

  // Đang kiểm tra token → hiển thị loading
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f9fb' }}>
        <ActivityIndicator size="large" color="#00687b" />
      </View>
    );
  }

  const inAuthGroup = segments[0] === '(auth)';

  return (
    <SafeAreaProvider>
      {/* Chưa đăng nhập + không ở trang auth → redirect login */}
      {!isLoggedIn && !inAuthGroup && <Redirect href="/(auth)/login" />}
      {/* Đã đăng nhập + đang ở trang auth → redirect tabs */}
      {isLoggedIn && inAuthGroup && <Redirect href="/(tabs)" />}

      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
