import { useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { getShopById, getFoods } from '../../features/food/api/foodApi';
import type { IShop, IFood } from '../../features/food/types';
import { ShopHeroCard } from '../../features/food/components/ShopHeroCard';

export default function ShopMenuScreen() {
  const { shopId } = useLocalSearchParams<{ shopId: string }>();
  const router = useRouter();

  const [shop, setShop] = useState<IShop | null>(null);
  const [foods, setFoods] = useState<IFood[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!shopId) return;

    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [shopData, foodsData] = await Promise.all([
          getShopById(shopId),
          getFoods({ shopId }),
        ]);
        setShop(shopData);
        setFoods(foodsData);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Không thể tải thực đơn');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [shopId]);

  const groupedFoods = useMemo(() => {
    const groups: { [key: string]: IFood[] } = {};
    foods.forEach((food) => {
      const cat = food.category || 'Món khác';
      if (!groups[cat]) {
        groups[cat] = [];
      }
      groups[cat].push(food);
    });
    return Object.entries(groups);
  }, [foods]);

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#2D8A6B" />
        <Text className="text-on-surface-variant mt-3 text-sm">Đang tải thực đơn...</Text>
      </View>
    );
  }

  if (error || !shop) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center px-8">
        <MaterialIcons name="storefront" size={56} color="#D1D5DB" />
        <Text className="text-on-surface text-lg font-bold mt-4 mb-2 text-center">
          Không tìm thấy cửa hàng
        </Text>
        <Text className="text-on-surface-variant text-sm text-center mb-6">
          {error ?? 'Cửa hàng này không tồn tại hoặc đã đóng cửa.'}
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
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 64 }}>
        {/* Shop Hero Card Header */}
        <ShopHeroCard shop={shop} />

        {/* Promotions Carousel banner if shop has promotions */}
        {shop.promotions && shop.promotions.length > 0 && (
          <View className="bg-red-50 border border-red-100 px-4 py-3 flex-row items-center gap-2 mt-3 mx-4 rounded-xl">
            <MaterialIcons name="local-offer" size={16} color="#EF4444" />
            <Text className="text-xs text-red-600 font-extrabold flex-1">
              Khuyến mãi: {shop.promotions.join(' • ')}
            </Text>
          </View>
        )}

        {/* Menu Section */}
        <View className="mt-4 px-4">
          <Text className="text-lg font-black text-on-surface mb-3">Thực đơn của quán</Text>
          
          {groupedFoods.length === 0 ? (
            <View className="bg-white rounded-2xl p-8 items-center border border-outline-variant/20 shadow-sm">
              <MaterialIcons name="restaurant-menu" size={40} color="#D1D5DB" />
              <Text className="text-sm text-on-surface-variant text-center mt-3">
                Thực đơn hiện tại chưa có món ăn nào được đăng tải.
              </Text>
            </View>
          ) : (
            groupedFoods.map(([category, items]) => (
              <View key={category} className="mb-6">
                {/* Category Title */}
                <Text className="text-base font-extrabold text-primary-dark mb-3 px-1">
                  {category}
                </Text>

                {/* Food list in this category */}
                <View className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
                  {items.map((food, idx) => {
                    const formattedPrice = food.price.toLocaleString('vi-VN');
                    const formattedOriginal = food.originalPrice?.toLocaleString('vi-VN');
                    const isLast = idx === items.length - 1;

                    return (
                      <TouchableOpacity
                        key={food.id}
                        activeOpacity={0.8}
                        onPress={() => router.push(`/food/${food.id}` as any)}
                        className={`flex-row justify-between p-4 items-center gap-4 ${
                          !isLast ? 'border-b border-outline-variant/20' : ''
                        }`}
                      >
                        <View className="flex-1">
                          <Text className="text-sm font-extrabold text-on-surface leading-tight">
                            {food.name}
                          </Text>
                          {food.description ? (
                            <Text className="text-xs text-on-surface-variant mt-1 leading-snug" numberOfLines={2}>
                              {food.description}
                            </Text>
                          ) : null}

                          <View className="flex-row items-center gap-2 mt-2 flex-wrap">
                            <Text className="text-sm font-bold text-primary-dark">
                              {formattedPrice}đ
                            </Text>
                            {formattedOriginal && (
                              <Text className="text-xs text-outline line-through">
                                {formattedOriginal}đ
                              </Text>
                            )}
                            {food.discount != null && food.discount > 0 && (
                              <View className="bg-red-100 rounded px-1.5 py-0.5 border border-red-200">
                                <Text className="text-red-600 text-[10px] font-bold">
                                  -{food.discount}%
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>

                        {/* Food Image */}
                        <View className="relative w-20 h-20 rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/10">
                          <Image
                            source={{ uri: food.image }}
                            className="w-full h-full"
                            resizeMode="cover"
                          />
                          {/* Plus button overlay */}
                          <View className="absolute bottom-1 right-1 bg-primary-dark w-6 h-6 rounded-full items-center justify-center border border-white">
                            <Text className="text-white text-xs font-bold leading-none">+</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
}
