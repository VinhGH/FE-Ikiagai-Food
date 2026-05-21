import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsPage() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-3xl mb-2">🔔</Text>
        <Text className="text-xl font-bold text-on-surface mb-1">Thông báo</Text>
        <Text className="text-base text-on-surface-variant">Chưa có thông báo nào</Text>
      </View>
    </SafeAreaView>
  );
}
