import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ShopHeroCard } from '../../features/food/components/ShopHeroCard';
import { Card } from '../../components/ui/Card';

export default function ShopDetailScreen() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-background">
        <ShopHeroCard />

        {/* Action Row */}
        <View className="flex-row px-4 py-4 gap-2 border-b border-outline-variant bg-white">
          <TouchableOpacity className="flex-row items-center px-3 py-2 border border-outline-variant rounded-full" activeOpacity={0.7}>
            <MaterialIcons name="people" size={16} color="#4B5563" />
            <Text className="ml-2 font-bold text-sm text-on-surface-variant">Đặt đơn nhóm</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center px-3 py-2 border border-outline-variant rounded-full" activeOpacity={0.7}>
            <MaterialIcons name="schedule" size={16} color="#4B5563" />
            <Text className="ml-2 font-bold text-sm text-on-surface-variant">Đặt trước</Text>
          </TouchableOpacity>
        </View>

        {/* Promos */}
        <View className="flex-row px-4 py-4 gap-3 bg-white mb-2">
          <View className="flex-1 border border-orange-200 bg-orange-50 rounded-xl p-3 flex-row items-center">
            <MaterialIcons name="card-membership" size={24} color="#F59E0B" />
            <View className="ml-2">
              <Text className="font-bold text-xs text-on-surface">Dùng GrabUnlimited</Text>
              <Text className="text-[10px] text-on-surface-variant">Giảm đ8000 giao h...</Text>
            </View>
          </View>
        </View>

        {/* Ưu đãi hôm nay */}
        <View className="bg-white pt-6 pb-2 mb-2">
          <View className="px-4 flex-row justify-between items-center mb-4">
            <Text className="text-xl font-extrabold text-on-surface">Ưu đãi hôm nay</Text>
            <MaterialIcons name="arrow-forward" size={24} color="#6ed6f2" />
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 overflow-visible -mx-4 pb-4">
            <Card className="w-72 mr-4 flex-row p-3 items-center">
              <View className="w-24 h-24 bg-gray-200 rounded-lg mr-3 overflow-hidden">
                <Image source={{ uri: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=250&q=80' }} className="w-full h-full" resizeMode="cover" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-on-surface mb-1" numberOfLines={2}>3 Gà Giòn Vui Vẻ + 1 Mỳ Ý Jolly...</Text>
                <Text className="text-xs text-on-surface-variant mb-2" numberOfLines={1}>3 Gà Giòn Vui Vẻ...</Text>
                <View className="flex-row justify-between items-center">
                  <Text className="font-bold text-on-surface">145.000đ</Text>
                  <TouchableOpacity className="w-8 h-8 bg-primary rounded-full items-center justify-center">
                    <MaterialIcons name="add" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
            <View className="w-4" />
          </ScrollView>
        </View>

        {/* Dành cho bạn */}
        <View className="bg-white pt-6 pb-12 px-4">
          <Text className="text-xl font-extrabold text-on-surface mb-4">Dành cho bạn</Text>
          <View className="flex-row flex-wrap justify-between">
            {/* Grid Items */}
            {[1, 2, 3, 4].map(i => (
              <Card key={i} className="w-[48%] mb-4 overflow-hidden border-0 bg-gray-50">
                <View className="h-32 bg-gray-200 w-full relative">
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=250&q=80' }} className="absolute w-full h-full" resizeMode="cover" />
                  <View className="absolute top-2 left-2 bg-[#6ed6f2] px-2 py-1 rounded-md">
                    <Text className="text-[#00687b] text-[10px] font-bold">Món đặc tuyến</Text>
                  </View>
                </View>
                <View className="p-3">
                  <Text className="font-bold text-on-surface mb-1">Món Ngon {i}</Text>
                  <Text className="text-xs text-on-surface-variant mb-2">Combo tiết kiệm</Text>
                  <View className="flex-row justify-between items-center">
                    <Text className="font-bold text-on-surface">65.000đ</Text>
                    <TouchableOpacity className="w-8 h-8 bg-primary rounded-full items-center justify-center">
                      <MaterialIcons name="add" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
