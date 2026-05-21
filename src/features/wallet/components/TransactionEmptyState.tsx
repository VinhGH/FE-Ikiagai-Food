import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function TransactionEmptyState() {
  return (
    <View className="items-center justify-center py-16">
      <View className="w-24 h-24 bg-gray-100 rounded-2xl items-center justify-center mb-6 transform -rotate-6">
        <MaterialIcons name="receipt" size={48} color="#D1D5DB" />
      </View>
      <Text className="text-on-surface-variant text-base mb-2">Không có hoạt động nào gần đây.</Text>
      <Text className="text-[#005c6d] font-semibold text-base">Xem các giao dịch trước đó</Text>
    </View>
  );
}
