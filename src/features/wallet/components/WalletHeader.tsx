import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function WalletHeader() {
  return (
    <View className="bg-[#4D2D8F] pt-14 pb-12 px-6 relative overflow-hidden">
      <View className="flex-row justify-between items-center mb-4 z-10">
        <Text className="text-3xl font-extrabold text-white tracking-tight">Thanh toán</Text>
        <View className="bg-white/20 p-2 rounded-full">
          <MaterialIcons name="settings" size={24} color="white" />
        </View>
      </View>
      <View className="w-2/3 z-10">
        <Text className="text-white text-base leading-snug">
          Thanh toán hằng ngày đơn giản, linh hoạt
        </Text>
      </View>
      {/* Decorative circles to simulate the illustration background */}
      <View className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#5E3BB3] rounded-full opacity-50" />
      <View className="absolute right-10 -top-5 w-20 h-20 bg-[#FCD34D] rounded-full opacity-20" />
    </View>
  );
}
