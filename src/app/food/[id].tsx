// ──────────────────────────────────────────────────────────────────
// app/food/[id].tsx  ← chỉ render, data từ useFoodDetail(id)
// ──────────────────────────────────────────────────────────────────

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ShopHeroCard } from '../../features/food/components/ShopHeroCard';
import { Card } from '../../components/ui/Card';
import { useFoodDetail } from '../../features/food/hooks/useFoodDetail';

export default function ShopDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { food, shop, isLoading, error } = useFoodDetail(id);

  // UX Skill #78: Loading state
  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#00687b" />
        <Text className="text-on-surface-variant mt-3 text-sm">Đang tải...</Text>
      </View>
    );
  }

  // UX Skill #80: Error recovery
  if (error || !food) {
    return (
      <View className="flex-1 bg-background items-center justify-center px-8">
        <MaterialIcons name="error-outline" size={56} color="#D1D5DB" />
        <Text className="text-on-surface text-lg font-bold mt-4 mb-2 text-center">
          Không tìm thấy món ăn
        </Text>
        <Text className="text-on-surface-variant text-sm text-center mb-6">
          {error ?? 'Món ăn này không còn tồn tại hoặc đã bị xóa.'}
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-primary px-8 py-3 rounded-full min-h-[48px] justify-center"
          activeOpacity={0.8}
        >
          <Text className="text-white font-bold">Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-background">
        {/* ShopHeroCard nhận shop data thật từ hook */}
        <ShopHeroCard shop={shop} />

        {/* Action Row */}
        <View className="flex-row px-4 py-4 gap-2 border-b border-outline-variant bg-white">
          <TouchableOpacity
            className="flex-row items-center px-3 py-2 border border-outline-variant rounded-full min-h-[44px]"
            activeOpacity={0.7}
          >
            <MaterialIcons name="people" size={16} color="#4B5563" />
            <Text className="ml-2 font-bold text-sm text-on-surface-variant">Đặt đơn nhóm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center px-3 py-2 border border-outline-variant rounded-full min-h-[44px]"
            activeOpacity={0.7}
          >
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

        {/* Thông tin món ăn được chọn */}
        <View className="bg-white px-4 pt-4 pb-2 mb-2 border-t border-outline-variant">
          <Text className="text-lg font-extrabold text-on-surface mb-1">{food.name}</Text>
          <View className="flex-row items-center gap-3">
            <Text className="text-primary font-bold text-base">
              {food.price.toLocaleString('vi-VN')}đ
            </Text>
            {food.originalPrice ? (
              <Text className="text-outline text-sm line-through">
                {food.originalPrice.toLocaleString('vi-VN')}đ
              </Text>
            ) : null}
            {food.discount ? (
              <View className="bg-red-100 px-2 py-0.5 rounded">
                <Text className="text-red-500 text-xs font-bold">-{food.discount}%</Text>
              </View>
            ) : null}
          </View>
          {food.description ? (
            <Text className="text-on-surface-variant text-sm mt-2">{food.description}</Text>
          ) : null}
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
                <Image
                  source={{ uri: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=250&q=80' }}
                  className="w-full h-full"
                  resizeMode="cover"
                />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-on-surface mb-1" numberOfLines={2}>
                  3 Gà Giòn Vui Vẻ + 1 Mỳ Ý Jolly...
                </Text>
                <Text className="text-xs text-on-surface-variant mb-2" numberOfLines={1}>
                  3 Gà Giòn Vui Vẻ...
                </Text>
                <View className="flex-row justify-between items-center">
                  <Text className="font-bold text-on-surface">145.000đ</Text>
                  <TouchableOpacity className="w-9 h-9 bg-primary rounded-full items-center justify-center">
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
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="w-[48%] mb-4 overflow-hidden border-0 bg-gray-50">
                <View className="h-32 bg-gray-200 w-full relative">
                  <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=250&q=80' }}
                    className="absolute w-full h-full"
                    resizeMode="cover"
                  />
                  <View className="absolute top-2 left-2 bg-[#6ed6f2] px-2 py-1 rounded-md">
                    <Text className="text-[#00687b] text-[10px] font-bold">Món đặc tuyến</Text>
                  </View>
                </View>
                <View className="p-3">
                  <Text className="font-bold text-on-surface mb-1">Món Ngon {i}</Text>
                  <Text className="text-xs text-on-surface-variant mb-2">Combo tiết kiệm</Text>
                  <View className="flex-row justify-between items-center">
                    <Text className="font-bold text-on-surface">65.000đ</Text>
                    <TouchableOpacity className="w-9 h-9 bg-primary rounded-full items-center justify-center">
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
