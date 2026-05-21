import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CartPage() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 justify-center items-center px-6">
        <Text className="text-3xl mb-2">🛒</Text>
        <Text className="text-xl font-bold text-on-surface mb-1">Giỏ hàng</Text>
        <Text className="text-base text-on-surface-variant">Giỏ hàng của bạn đang trống</Text>
      </View>
    </SafeAreaView>
  );
}
