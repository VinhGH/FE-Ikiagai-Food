import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';

export default function ProfilePage() {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    // Không cần router.replace vì _layout.tsx sẽ tự redirect khi isLoggedIn = false
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-3xl mb-2">👤</Text>
        <Text className="text-xl font-bold text-on-surface mb-1">
          {user?.name ?? 'Cá nhân'}
        </Text>
        <Text className="text-base text-on-surface-variant mb-1">
          {user?.email ?? ''}
        </Text>
        <Text className="text-sm text-on-surface-variant mb-6">
          {user?.phone ?? ''}
        </Text>

        <TouchableOpacity
          className="px-8 py-3 bg-primary-container rounded-lg active:opacity-80"
          onPress={handleLogout}
        >
          <Text className="text-on-primary-container font-bold">Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
