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

  const promoFoods = useMemo(() => {
    return foods.filter((f) => f.discount && f.discount > 0);
  }, [foods]);

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
        <ActivityIndicator size="large" color="#6ed6f2" />
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
          className="px-8 py-3 rounded-full min-h-[48px] justify-center"
          activeOpacity={0.8}
          style={{ backgroundColor: '#6ed6f2' }}
        >
          <Text className="text-white font-bold text-center">Quay lại</Text>
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
          <View className="bg-sky-50 border border-sky-100 px-4 py-3 flex-row items-center gap-2 mt-3 mx-4 rounded-xl">
            <MaterialIcons name="local-offer" size={16} color="#6ed6f2" />
            <Text className="text-xs text-[#6ed6f2] font-extrabold flex-1">
              Khuyến mãi: {shop.promotions.join(' • ')}
            </Text>
          </View>
        )}

        {/* Section: Ưu đãi hôm nay */}
        {promoFoods.length > 0 && (
          <View className="mt-4 px-4">
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-base font-black text-slate-800 uppercase tracking-tight">Ưu đãi hôm nay</Text>
              <View className="bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
                <Text className="text-[#6ed6f2] text-[10px] font-black">GIẢM ĐẾN 49%</Text>
              </View>
            </View>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              contentContainerStyle={{ gap: 12, paddingRight: 16 }}
            >
              {promoFoods.map((food) => {
                const formattedPrice = food.price.toLocaleString('vi-VN');
                const formattedOriginal = food.originalPrice?.toLocaleString('vi-VN');
                
                return (
                  <TouchableOpacity
                    key={food.id}
                    activeOpacity={0.8}
                    onPress={() => router.push(`/food/${food.id}` as any)}
                    className="bg-white border border-gray-100 rounded-2xl w-[140px] p-2 shadow-sm overflow-hidden relative"
                  >
                    {/* Discount Badge Overlay */}
                    <View className="absolute top-2 left-2 bg-[#6ed6f2] px-2 py-0.5 rounded-md z-10">
                      <Text className="text-white text-[10px] font-black">-{food.discount}%</Text>
                    </View>
                    
                    {/* Food Image */}
                    <Image 
                      source={{ uri: food.image }} 
                      className="w-full h-24 rounded-xl"
                      resizeMode="cover"
                    />
                    
                    {/* Food Info */}
                    <View className="mt-2 flex-1 justify-between">
                      <Text className="text-xs font-bold text-slate-800" numberOfLines={1}>
                        {food.name}
                      </Text>
                      
                      <View className="mt-1 flex-row items-baseline justify-between">
                        <View>
                          <Text className="text-xs font-black text-[#6ed6f2]">
                            {formattedPrice}đ
                          </Text>
                          {formattedOriginal && (
                            <Text className="text-[9px] text-slate-400 line-through">
                              {formattedOriginal}đ
                            </Text>
                          )}
                        </View>
                        
                        {/* Small plus button */}
                        <View className="bg-[#6ed6f2] w-5 h-5 rounded-full items-center justify-center">
                          <Text className="text-white text-xs font-extrabold leading-none">+</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
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
                <Text className="text-sm font-black text-slate-800 mb-3 px-1 uppercase tracking-wider">
                  {category}
                </Text>

                {/* Food list in this category */}
                <View className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-3 gap-3">
                  {items.map((food, idx) => {
                    const formattedPrice = food.price.toLocaleString('vi-VN');
                    const formattedOriginal = food.originalPrice?.toLocaleString('vi-VN');
                    const isLast = idx === items.length - 1;

                    return (
                      <TouchableOpacity
                        key={food.id}
                        activeOpacity={0.8}
                        onPress={() => router.push(`/food/${food.id}` as any)}
                        className={`flex-row items-center py-3 ${
                          !isLast ? 'border-b border-gray-50' : ''
                        }`}
                      >
                        {/* Food Image */}
                        <View className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                          <Image
                            source={{ uri: food.image }}
                            className="w-full h-full"
                            resizeMode="cover"
                          />
                          {/* BÁN CHẠY overlay if rating >= 4.7 */}
                          {food.rating && food.rating >= 4.7 && (
                            <View className="absolute top-1 left-1 bg-orange-500 px-1 py-0.5 rounded">
                              <Text className="text-white text-[8px] font-black">BÁN CHẠY</Text>
                            </View>
                          )}
                        </View>

                        {/* Food Details */}
                        <View className="flex-1 ml-3 pr-2">
                          <Text className="text-sm font-extrabold text-slate-800 leading-tight">
                            {food.name}
                          </Text>
                          {food.description ? (
                            <Text className="text-xs text-slate-400 mt-1 leading-snug" numberOfLines={2}>
                              {food.description}
                            </Text>
                          ) : null}

                          <View className="flex-row items-center gap-1.5 mt-2 flex-wrap">
                            <Text className="text-sm font-extrabold text-[#6ed6f2]">
                              {formattedPrice}đ
                            </Text>
                            {formattedOriginal && (
                              <Text className="text-xs text-slate-300 line-through">
                                {formattedOriginal}đ
                              </Text>
                            )}
                            {food.discount != null && food.discount > 0 && (
                              <View className="bg-sky-50 rounded px-1.5 py-0.5 border border-sky-100">
                                <Text className="text-[#6ed6f2] text-[10px] font-bold">
                                  -{food.discount}%
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>

                        {/* Premium plus button on the right */}
                        <View className="w-7 h-7 rounded-full border border-[#6ed6f2] items-center justify-center">
                          <Text className="text-[#6ed6f2] text-sm font-black leading-none">+</Text>
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
