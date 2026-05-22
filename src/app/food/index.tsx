import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { FoodHeader, CategoryScroll, FilterGrid } from '../../features/food';

export default function FoodMainScreen() {
  return (
    <View className="flex-1 bg-white">
      <FoodHeader />
      <ScrollView className="flex-1 pt-8" showsVerticalScrollIndicator={false}>
        {/* Banner Promo */}
        <View className="px-4 mb-6 mt-4">
          <View className="bg-primary-dark rounded-2xl p-4 flex-row items-center justify-between shadow-sm">
            <View>
              <Text className="text-white font-bold text-lg">Ủng hộ quê nhà</Text>
              <Text className="text-white/80 text-xs mt-1">Đại chiến Bún, Bánh mì{'\n'}giảm lên đến 50%</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={16} color="white" />
          </View>
        </View>

        {/* Tab Selector */}
        <View className="px-4 flex-row gap-2 mb-2">
          <TouchableOpacity className="flex-1 bg-primary flex-row items-center justify-center py-3 rounded-full" activeOpacity={0.8}>
            <MaterialIcons name="delivery-dining" size={20} color="white" />
            <Text className="text-white font-bold ml-2">Giao hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-surface-container-low flex-row items-center justify-center py-3 rounded-full border border-outline-variant" activeOpacity={0.8}>
            <MaterialIcons name="storefront" size={20} color="#4B5563" />
            <Text className="text-on-surface-variant font-bold ml-2">Đi Ăn Nhà Hàng</Text>
          </TouchableOpacity>
        </View>

        <CategoryScroll />
        <FilterGrid />

        {/* GrabMart Section */}
        <View className="px-4 mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-extrabold text-on-surface tracking-tight">GrabMart tiếp GẤP</Text>
            <MaterialIcons name="chevron-right" size={24} color="#6B7280" />
          </View>
          {/* GrabMart Banner */}
          <View className="h-40 bg-orange-100 rounded-2xl overflow-hidden items-center justify-center border border-outline-variant shadow-sm relative">
            <Image source={{ uri: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?auto=format&fit=crop&w=600&q=80' }} className="absolute w-full h-full opacity-60" resizeMode="cover" />
            <Text className="text-orange-900 font-extrabold text-xl z-10 bg-white/80 px-4 py-2 rounded-lg shadow-sm">Siêu thị tại nhà</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
