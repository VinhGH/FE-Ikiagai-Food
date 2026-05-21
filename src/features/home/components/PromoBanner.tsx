import { View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export function PromoBanner() {
  return (
    <View className="px-4 mb-6">
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-xl font-bold text-on-surface">Mua Ngay</Text>
        <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
      </View>
      <View className="bg-[#FFF5E5] rounded-2xl p-4 flex-row overflow-hidden relative min-h-[120px]">
        <View className="flex-1 z-10 justify-center">
          <Text className="text-red-500 font-bold text-2xl mb-1">KOI Thé</Text>
          <Text className="text-on-surface font-bold text-lg mb-2">ƯU ĐÃI ĐẾN 50K</Text>
          <Text className="text-xs text-on-surface-variant">Cho đơn tối thiểu 100k</Text>
        </View>
        {/* Placeholder Graphic */}
        <View className="absolute right-0 bottom-0 top-0 w-1/2 bg-[#FFDCA8] opacity-50 rounded-l-full" />
      </View>
    </View>
  );
}
