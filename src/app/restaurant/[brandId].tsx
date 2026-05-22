import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { getBrandById, getShopsByBrand } from '../../features/food/api/foodApi';
import type { IBrand, IShop } from '../../features/food/types';

export default function BrandBranchesScreen() {
  const { brandId } = useLocalSearchParams<{ brandId: string }>();
  const router = useRouter();

  const [brand, setBrand] = useState<IBrand | null>(null);
  const [shops, setShops] = useState<IShop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!brandId) return;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [brandData, shopsData] = await Promise.all([
          getBrandById(brandId),
          getShopsByBrand(brandId),
        ]);
        setBrand(brandData);
        setShops(shopsData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Không thể tải chi nhánh');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [brandId]);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#2D8A6B" />
        <Text className="text-on-surface-variant mt-3 text-sm">Đang tìm chi nhánh gần nhất...</Text>
      </View>
    );
  }

  if (error || !brand) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center px-8">
        <MaterialIcons name="storefront" size={56} color="#D1D5DB" />
        <Text className="text-on-surface text-lg font-bold mt-4 mb-2 text-center">
          Không tìm thấy nhà hàng
        </Text>
        <Text className="text-on-surface-variant text-sm text-center mb-6">
          {error ?? 'Nhà hàng này không tồn tại hoặc đã đóng cửa.'}
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-primary px-8 py-3 rounded-full min-h-[48px] justify-center"
          activeOpacity={0.8}
        >
          <Text className="text-white font-bold">Quay lại</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      {/* Custom Header */}
      <View className="px-4 py-3 bg-white flex-row items-center border-b border-outline-variant/30 gap-3">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-background items-center justify-center"
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={24} color="#2D8A6B" />
        </TouchableOpacity>
        <View className="flex-1">
          <Text className="text-lg font-black text-on-surface" numberOfLines={1}>
            {brand.name}
          </Text>
          <Text className="text-[10px] text-on-surface-variant uppercase tracking-wider font-bold">
            Chọn chi nhánh giao hàng
          </Text>
        </View>
      </View>

      {/* Brand Hero info */}
      <FlatList
        data={shops}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="bg-white rounded-3xl p-5 mb-4 border border-outline-variant/20 shadow-sm flex-row items-center gap-4">
            <Image
              source={{ uri: brand.image }}
              className="w-16 h-16 rounded-2xl bg-surface-container border border-outline-variant"
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text className="text-xl font-black text-on-surface">{brand.name}</Text>
              <Text className="text-xs text-on-surface-variant mt-0.5">{brand.categories.join(' • ')}</Text>
              <View className="flex-row items-center gap-2 mt-2">
                <View className="bg-amber-50 px-2 py-0.5 rounded flex-row items-center gap-0.5 border border-amber-200">
                  <MaterialIcons name="star" size={14} color="#F59E0B" />
                  <Text className="text-[11px] font-bold text-amber-700">{brand.rating}</Text>
                </View>
                <Text className="text-[11px] text-on-surface-variant font-medium">
                  {brand.reviewCount.toLocaleString()} lượt đánh giá
                </Text>
              </View>
            </View>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push(`/shop/${item.id}` as any)}
            className="bg-white rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm"
          >
            {/* Shop cover image */}
            <View className="h-32 w-full bg-surface-container-low relative">
              <Image
                source={{ uri: item.coverImage }}
                className="w-full h-full"
                resizeMode="cover"
              />
              {/* Distance floating badge */}
              <View className="absolute bottom-2 right-2 bg-black/60 px-2.5 py-1 rounded-lg">
                <Text className="text-white text-xs font-bold">
                  📍 {item.distance} km
                </Text>
              </View>
            </View>

            {/* Shop info details */}
            <View className="p-4 gap-2">
              <Text className="text-base font-extrabold text-on-surface leading-snug">
                {item.name}
              </Text>
              <Text className="text-xs text-on-surface-variant" numberOfLines={1}>
                {item.address}
              </Text>

              {/* Badges and rating */}
              <View className="flex-row items-center gap-2.5 mt-1 flex-wrap">
                <View className="flex-row items-center gap-0.5">
                  <MaterialIcons name="star" size={16} color="#F59E0B" />
                  <Text className="text-xs font-bold text-on-surface">{item.rating}</Text>
                </View>
                <Text className="text-xs text-outline">•</Text>
                <View className="flex-row items-center gap-1">
                  <MaterialIcons name="access-time" size={14} color="#6B7280" />
                  <Text className="text-xs text-on-surface-variant font-medium">{item.deliveryTime} phút</Text>
                </View>
                <Text className="text-xs text-outline">•</Text>
                <Text className="text-xs text-primary font-bold">
                  {item.deliveryFee === 0 ? 'Freeship' : `Giao ${item.deliveryFee.toLocaleString('vi-VN')}đ`}
                </Text>
              </View>

              {/* Promo tags */}
              {item.promotions && item.promotions.length > 0 && (
                <View className="flex-row gap-1.5 flex-wrap mt-1">
                  {item.promotions.map((promo, idx) => (
                    <View key={idx} className="bg-red-50 border border-red-100 rounded-md px-2 py-0.5">
                      <Text className="text-[10px] text-red-600 font-extrabold">% {promo}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}
