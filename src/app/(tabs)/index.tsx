import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import { memo, useCallback, useState, useMemo, useEffect, useRef } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { HomeHeader, FoodCategorySection, PromoBanner, useHomeFeed } from '../../features/home';
import { getFoods, IBrand, IFood } from '../../features/food';
import { useRouter } from 'expo-router';

// Format currency in VND
const formatPrice = (num: number) => {
  return num.toLocaleString('vi-VN') + 'đ';
};

// ── Memoized brand list item (Bán chạy gần đây) ──────────────────────────
const BrandItem = memo(({ item }: { item: IBrand }) => {
  const router = useRouter();

  // Fake distance based on delivery time for visual realism
  const distance = useMemo(() => {
    return (item.minDeliveryTime / 12 + 0.3).toFixed(1);
  }, [item.minDeliveryTime]);

  // Extract promos based on brand name
  const promoTags = useMemo(() => {
    if (item.name.includes('Jollibee')) return ['Giảm 30.000đ', 'Tặng Coca'];
    if (item.name.includes('Bún Chả')) return ['Bán chạy nhất', 'Mã GRAB50'];
    if (item.name.includes('KOI')) return ['Độc quyền KOI', 'Giảm 15%'];
    if (item.name.includes('Popeyes')) return ['Freeship 0đ', 'Giảm 30% Combo'];
    if (item.name.includes('R&B')) return ['Mua 1 Tặng 1', 'Giảm 15k'];
    if (item.name.includes('TocoToco')) return ['Đồng giá 25k', 'Freeship 0đ'];
    if (item.name.includes('Phúc Lộc Thọ')) return ['Freeship 0đ', 'Giảm 10k'];
    return ['Ưu đãi đặt trước', 'Freeship'];
  }, [item.name]);
  
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => router.push(`/restaurant/${item.id}` as any)}
      className="bg-white rounded-3xl border border-slate-100 shadow-sm p-3.5 flex-row gap-3.5 mb-3.5 hover-transition hover:scale-[1.015] hover:shadow-md hover:border-[#6ed6f2]/30 active:scale-[0.995]"
    >
      {/* Brand Logo/Image */}
      <View className="relative w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
        {item.rating >= 4.7 && (
          <View className="absolute top-1 left-1 bg-[#6ed6f2] px-1.5 py-0.5 rounded-md">
            <Text className="text-[8px] text-white font-black">YÊU THÍCH</Text>
          </View>
        )}
      </View>

      {/* Brand Info */}
      <View className="flex-1 justify-between py-0.5">
        <View>
          <Text className="font-black text-slate-800 text-sm leading-tight" numberOfLines={1}>
            {item.name}
          </Text>
          
          {/* Rating and Delivery Row */}
          <View className="flex-row items-center gap-1.5 mt-1.5 flex-wrap">
            <View className="flex-row items-center gap-0.5">
              <MaterialIcons name="star" size={14} color="#F59E0B" />
              <Text className="text-[11px] font-black text-slate-700">
                {item.rating}
              </Text>
              <Text className="text-[9px] text-slate-400 font-semibold">
                ({item.reviewCount > 999 ? `${(item.reviewCount/1000).toFixed(0)}k+` : item.reviewCount})
              </Text>
            </View>

            <Text className="text-[10px] text-slate-300">•</Text>

            <View className="flex-row items-center gap-0.5">
              <MaterialIcons name="access-time" size={13} color="#64748B" />
              <Text className="text-[10px] text-slate-600 font-bold">
                {item.minDeliveryTime} phút
              </Text>
            </View>

            <Text className="text-[10px] text-slate-300">•</Text>

            <Text className="text-[10px] text-slate-500 font-bold">
              {distance} km
            </Text>
          </View>

          {/* Categories tag row */}
          <Text className="text-[10px] text-slate-400 font-bold mt-1" numberOfLines={1}>
            {item.categories.join(' • ')}
          </Text>
        </View>

        {/* Bottom Promos & Fee */}
        <View className="flex-row items-center justify-between mt-2.5 pt-2 border-t border-slate-50">
          <View className="flex-row items-center gap-1 flex-1 mr-2 overflow-hidden">
            {promoTags.slice(0, 2).map((tag, idx) => (
              <View key={idx} className="bg-sky-50 border border-sky-100/50 px-1.5 py-0.5 rounded-md">
                <Text className="text-[8px] text-[#6ed6f2] font-black">{tag}</Text>
              </View>
            ))}
          </View>

          <View className={`px-2 py-0.5 rounded-lg border ${
            item.deliveryFeeInfo.includes('Freeship') 
              ? 'bg-emerald-50 border-emerald-100' 
              : 'bg-slate-50 border-slate-100'
          }`}>
            <Text className={`text-[9px] font-black ${
              item.deliveryFeeInfo.includes('Freeship') ? 'text-emerald-700' : 'text-slate-600'
            }`}>
              {item.deliveryFeeInfo}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
});

// ── Empty state (UX Skill #79) ─────────────────────────────────────
function EmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <View className="flex-1 items-center justify-center py-16 px-8">
      <MaterialIcons name="storefront" size={48} color="#D1D5DB" />
      <Text className="text-slate-500 text-base text-center mt-3 mb-4">
        Chưa có nhà hàng nào.{'\n'}Kéo để thử lại nhé!
      </Text>
      <TouchableOpacity
        onPress={onRetry}
        className="bg-[#6ed6f2] px-6 py-3 rounded-full"
        activeOpacity={0.8}
      >
        <Text className="text-white font-bold">Thử lại</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Screen ─────────────────────────────────────────────────────────
export default function HomeScreen() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { brands, isLoading, error, refetch } = useHomeFeed();
  const [foods, setFoods] = useState<IFood[]>([]);

  // Fetch foods to distribute in lists
  useEffect(() => {
    getFoods().then(setFoods).catch(console.error);
  }, []);

  // Filter brands locally by category selection
  const filteredBrands = useMemo(() => {
    if (!selectedCategory) return brands;
    return brands.filter((brand) =>
      brand.categories.some((cat) =>
        cat.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    );
  }, [brands, selectedCategory]);

  // Deal Đỉnh (Foods with high discount)
  const dealDinhFoods = useMemo(() => {
    return foods.filter(f => f.discount && f.discount >= 20);
  }, [foods]);

  // Siêu tiệc nửa giá (Foods with 15-20% discount or custom filters)
  const sieuTiecFoods = useMemo(() => {
    return foods.filter(f => f.discount && f.discount >= 15);
  }, [foods]);

  // Món ngọt ngon nhất (Drinks & Desserts)
  const monNgotFoods = useMemo(() => {
    return foods.filter(f => f.category === 'Trà Sữa' || f.category === 'Đồ uống');
  }, [foods]);

  const renderItem = useCallback(
    ({ item }: { item: IBrand }) => <BrandItem item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: IBrand) => item.id, []);

  // Inline List Header with Category Section and Redesigned layouts
  const renderHeader = useCallback(() => {
    return (
      <>
        <FoodCategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <PromoBanner />

        {/* 🔥 SECTION 1: DEAL ĐỈNH */}
        {dealDinhFoods.length > 0 && (
          <View className="mb-6">
            <View className="px-4 flex-row items-center justify-between mb-3">
              <View className="flex-row items-center gap-1">
                <Text className="text-sm font-black text-slate-800 uppercase tracking-wider">🔥 Deal Đỉnh</Text>
                <View className="bg-red-500 px-1 py-0.5 rounded">
                  <Text className="text-[8px] text-white font-extrabold">GIẢM SÂU</Text>
                </View>
              </View>
              <Text className="text-[10px] text-slate-400 font-bold">Xem tất cả</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            >
              {dealDinhFoods.map((food) => (
                <TouchableOpacity
                  key={food.id}
                  activeOpacity={0.9}
                  className="w-32 bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover-transition hover:scale-[1.04] hover:shadow-md hover:border-[#6ed6f2]/30 active:scale-[0.97]"
                  onPress={() => router.push(`/food/${food.id}` as any)}
                >
                  <View className="relative w-full h-32 bg-slate-50">
                    <Image source={{ uri: food.image }} className="w-full h-full" resizeMode="cover" />
                    <View className="absolute top-1 left-1 bg-red-500 px-1 py-0.5 rounded">
                      <Text className="text-[8px] text-white font-black">-{food.discount}%</Text>
                    </View>
                  </View>
                  <View className="p-2 justify-between h-[75px]">
                    <Text className="text-[11px] font-black text-slate-800 leading-tight" numberOfLines={2}>
                      {food.name}
                    </Text>
                    <View className="mt-1 flex-row items-baseline gap-1.5 flex-wrap">
                      <Text className="text-[11px] font-black text-[#6ed6f2]">
                        {formatPrice(food.price)}
                      </Text>
                      {food.originalPrice && (
                        <Text className="text-[9px] text-slate-450 font-bold line-through">
                          {formatPrice(food.originalPrice)}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* 🔥 SECTION 2: SIÊU TIỆC NỬA GIÁ */}
        {sieuTiecFoods.length > 0 && (
          <View className="mb-6">
            <View className="px-4 flex-row items-center justify-between mb-3">
              <Text className="text-sm font-black text-slate-800 uppercase tracking-wider">🔥 Siêu tiệc nửa giá</Text>
              <Text className="text-[10px] text-slate-400 font-bold">Xem tất cả</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            >
              {sieuTiecFoods.map((food) => (
                <TouchableOpacity
                  key={food.id}
                  activeOpacity={0.9}
                  className="w-36 bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex-row p-2 gap-2 h-20 items-center hover-transition hover:scale-[1.04] hover:shadow-md hover:border-[#6ed6f2]/30 active:scale-[0.97]"
                  onPress={() => router.push(`/food/${food.id}` as any)}
                >
                  <View className="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden relative">
                    <Image source={{ uri: food.image }} className="w-full h-full" resizeMode="cover" />
                    <View className="absolute bottom-0 left-0 right-0 bg-[#6ed6f2]/90 py-0.5 items-center">
                      <Text className="text-[7px] text-white font-black">-50%</Text>
                    </View>
                  </View>
                  <View className="flex-1 justify-around h-full">
                    <Text className="text-[10px] font-black text-slate-800 leading-tight" numberOfLines={2}>
                      {food.name}
                    </Text>
                    <View className="flex-row items-baseline gap-1 flex-wrap">
                      <Text className="text-[10px] font-black text-[#6ed6f2]">
                        {formatPrice(food.price)}
                      </Text>
                      {food.originalPrice && (
                        <Text className="text-[8px] text-slate-400 font-medium line-through">
                          {formatPrice(food.originalPrice)}
                        </Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* 🔥 SECTION 3: HÔM NAY ĂN GÌ (BRANDS) */}
        <View className="mb-6">
          <View className="px-4 flex-row items-center justify-between mb-3">
            <Text className="text-sm font-black text-slate-800 uppercase tracking-wider">Hôm nay ăn gì?</Text>
            <Text className="text-[10px] text-slate-400 font-bold">Thương hiệu xịn</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
          >
            {brands.map((brand) => (
              <TouchableOpacity
                key={brand.id}
                activeOpacity={0.9}
                className="w-40 bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm p-3 items-center hover-transition hover:scale-[1.04] hover:shadow-md hover:border-[#6ed6f2]/30 active:scale-[0.97]"
                onPress={() => router.push(`/restaurant/${brand.id}` as any)}
              >
                <View className="w-16 h-16 rounded-full overflow-hidden bg-slate-50 border border-slate-100 mb-2">
                  <Image source={{ uri: brand.image }} className="w-full h-full" resizeMode="cover" />
                </View>
                <Text className="text-xs font-black text-slate-800 text-center" numberOfLines={1}>
                  {brand.name}
                </Text>
                <View className="flex-row items-center gap-1 mt-1">
                  <MaterialIcons name="star" size={12} color="#F59E0B" />
                  <Text className="text-[10px] font-black text-slate-700">{brand.rating}</Text>
                  <Text className="text-[8px] text-slate-400">({brand.reviewCount})</Text>
                </View>
                <View className="bg-sky-50 border border-sky-100/50 px-2 py-0.5 rounded-lg mt-2">
                  <Text className="text-[8px] text-[#6ed6f2] font-extrabold">GIẢM ĐẾN 60K</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* 🔥 SECTION 4: MÓN NGỌT NGON NHẤT */}
        {monNgotFoods.length > 0 && (
          <View className="mb-6">
            <View className="px-4 flex-row items-center justify-between mb-3">
              <Text className="text-sm font-black text-slate-800 uppercase tracking-wider">Món ngọt ngon nhất</Text>
              <Text className="text-[10px] text-slate-400 font-bold">Trà sữa & bánh</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
            >
              {monNgotFoods.map((food) => (
                <TouchableOpacity
                  key={food.id}
                  activeOpacity={0.9}
                  className="w-32 bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover-transition hover:scale-[1.04] hover:shadow-md hover:border-[#6ed6f2]/30 active:scale-[0.97]"
                  onPress={() => router.push(`/food/${food.id}` as any)}
                >
                  <View className="w-full h-32 bg-slate-50 relative">
                    <Image source={{ uri: food.image }} className="w-full h-full" resizeMode="cover" />
                    <View className="absolute top-1 right-1 bg-sky-500 px-1.5 py-0.5 rounded-md">
                      <Text className="text-[8px] text-white font-black">YÊU THÍCH</Text>
                    </View>
                  </View>
                  <View className="p-2 justify-between h-[75px]">
                    <Text className="text-[11px] font-black text-slate-800 leading-tight" numberOfLines={2}>
                      {food.name}
                    </Text>
                    <View className="mt-1 flex-row items-baseline gap-1">
                      <Text className="text-[11px] font-black text-[#6ed6f2]">
                        {formatPrice(food.price)}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Main Vertical List Header title */}
        <View className="px-4 pt-2 pb-3.5 flex-row items-center justify-between">
          <View className="flex-row items-center gap-1.5">
            <Text className="text-sm font-black text-slate-800 uppercase tracking-wider">Bán chạy gần đây</Text>
            <View className="bg-sky-100 px-1 py-0.5 rounded">
              <Text className="text-[8px] text-[#6ed6f2] font-extrabold">QUÁN NGON</Text>
            </View>
          </View>
          <MaterialIcons name="restaurant-menu" size={16} color="#6ed6f2" />
        </View>
      </>
    );
  }, [selectedCategory, dealDinhFoods, sieuTiecFoods, brands, monNgotFoods, router]);

  return (
    <View className="flex-1 bg-[#F9FAFB]">
      <HomeHeader scrollY={scrollY} />

      <Animated.FlatList
        data={filteredBrands}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingTop: 156, paddingHorizontal: 16, paddingBottom: 32 }}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        progressViewOffset={156}

        ListEmptyComponent={
          isLoading ? (
            <View className="py-16 items-center">
              <ActivityIndicator size="large" color="#6ed6f2" />
              <Text className="text-slate-400 mt-3 text-xs font-semibold">
                Đang tải danh sách nhà hàng...
              </Text>
            </View>
          ) : (
            <EmptyState onRetry={refetch} />
          )
        }

        onRefresh={refetch}
        refreshing={isLoading && brands.length > 0}
      />
    </View>
  );
}
