import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { memo, useCallback, useState, useMemo } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { HomeHeader }   from '../../features/home/components/HomeHeader';
import { FoodCategorySection } from '../../features/home/components/FoodCategorySection';
import { PromoBanner }  from '../../features/home/components/PromoBanner';
import { useHomeFeed }  from '../../features/home/hooks/useHomeFeed';
import type { IBrand }   from '../../features/food/types';
import { useRouter } from 'expo-router';

// ── Memoized brand list item (UX Skill RN #23) ──────────────────────────
const BrandItem = memo(({ item }: { item: IBrand }) => {
  const router = useRouter();
  
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(`/restaurant/${item.id}` as any)}
      className="bg-white rounded-2xl border border-outline-variant/30 shadow-sm p-4 flex-row gap-4 mb-3"
    >
      {/* Brand Logo/Image */}
      <View className="relative w-20 h-20 rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/20">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />
      </View>

      {/* Brand Info */}
      <View className="flex-1 justify-between py-0.5">
        <View>
          <Text className="font-extrabold text-base text-on-surface leading-tight" numberOfLines={1}>
            {item.name}
          </Text>
          
          {/* Categories tag row */}
          <Text className="text-xs text-on-surface-variant/80 mt-1" numberOfLines={1}>
            {item.categories.join(' • ')}
          </Text>
        </View>

        {/* Rating and Delivery Row */}
        <View className="flex-row items-center justify-between mt-2 flex-wrap gap-2">
          <View className="flex-row items-center gap-1">
            <MaterialIcons name="star" size={16} color="#F59E0B" />
            <Text className="text-xs font-bold text-on-surface">
              {item.rating}
            </Text>
            <Text className="text-[10px] text-on-surface-variant">
              ({item.reviewCount > 999 ? `${(item.reviewCount/1000).toFixed(0)}k+` : item.reviewCount})
            </Text>
          </View>

          <View className="flex-row items-center gap-1">
            <MaterialIcons name="access-time" size={14} color="#6B7280" />
            <Text className="text-[10px] text-on-surface-variant font-medium">
              {item.minDeliveryTime} phút
            </Text>
          </View>

          <View className="bg-primary-light px-2 py-0.5 rounded border border-primary/10">
            <Text className="text-[10px] text-primary-dark font-extrabold">
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
      <Text className="text-on-surface-variant text-base text-center mt-3 mb-4">
        Chưa có nhà hàng nào.{'\n'}Kéo để thử lại nhé!
      </Text>
      <TouchableOpacity
        onPress={onRetry}
        className="bg-primary px-6 py-3 rounded-full"
        activeOpacity={0.8}
      >
        <Text className="text-white font-bold">Thử lại</Text>
      </TouchableOpacity>
    </View>
  );
}

// ── Screen ─────────────────────────────────────────────────────────
export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const { brands, isLoading, error, refetch } = useHomeFeed();

  // Filter brands locally by category selection
  const filteredBrands = useMemo(() => {
    if (!selectedCategory) return brands;
    return brands.filter((brand) =>
      brand.categories.some((cat) =>
        cat.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    );
  }, [brands, selectedCategory]);

  // UX Skill RN #24: useCallback cho renderItem
  const renderItem = useCallback(
    ({ item }: { item: IBrand }) => <BrandItem item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: IBrand) => item.id, []);

  // Inline List Header with Category Section
  const renderHeader = useCallback(() => {
    return (
      <>
        <FoodCategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <PromoBanner />
        <View className="px-4 pt-2 pb-3 flex-row items-center justify-between">
          <Text className="text-lg font-bold text-on-surface">Danh sách nhà hàng</Text>
          <MaterialIcons name="restaurant" size={20} color="#2D8A6B" />
        </View>
      </>
    );
  }, [selectedCategory]);

  return (
    <View className="flex-1 bg-background">
      <HomeHeader />

      {/* UX Skill RN #18: FlatList thay ScrollView.map */}
      <FlatList
        data={filteredBrands}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 32 }}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}

        // UX Skill #78: Loading indicator
        ListEmptyComponent={
          isLoading ? (
            <View className="py-16 items-center">
              <ActivityIndicator size="large" color="#2D8A6B" />
              <Text className="text-on-surface-variant mt-3 text-sm">
                Đang tải danh sách nhà hàng...
              </Text>
            </View>
          ) : (
            <EmptyState onRetry={refetch} />
          )
        }

        // Pull to refresh (UX Skill RN)
        onRefresh={refetch}
        refreshing={isLoading && brands.length > 0}
      />
    </View>
  );
}
