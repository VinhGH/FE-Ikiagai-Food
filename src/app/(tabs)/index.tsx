// ──────────────────────────────────────────────────────────────────
// app/(tabs)/index.tsx  ← chỉ render, không chứa logic API
// ──────────────────────────────────────────────────────────────────

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { memo, useCallback } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { HomeHeader }   from '../../features/home/components/HomeHeader';
import { ServiceGrid }  from '../../features/home/components/ServiceGrid';
import { PromoBanner }  from '../../features/home/components/PromoBanner';
import { FoodCard }     from '../../features/food/components/FoodCard';
import { useHomeFeed }  from '../../features/home/hooks/useHomeFeed';
import type { IFood }   from '../../features/food/types';

// ── Memoized list item (UX Skill RN #23) ──────────────────────────
const FoodItem = memo(({ item }: { item: IFood }) => (
  <View className="w-[48%]">
    <FoodCard item={item} />
  </View>
));

// ── Header injected into FlatList (tránh ScrollView lồng nhau) ────
function ListHeader() {
  return (
    <>
      <ServiceGrid />
      <PromoBanner />
      <View className="px-4 pt-2 pb-3 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-on-surface">Món ngon cho bạn</Text>
        <MaterialIcons name="arrow-forward" size={24} color="#6ed6f2" />
      </View>
    </>
  );
}

// ── Empty state (UX Skill #79) ─────────────────────────────────────
function EmptyState({ onRetry }: { onRetry: () => void }) {
  return (
    <View className="flex-1 items-center justify-center py-16 px-8">
      <MaterialIcons name="restaurant" size={48} color="#D1D5DB" />
      <Text className="text-on-surface-variant text-base text-center mt-3 mb-4">
        Chưa có món ăn nào.{'\n'}Kéo để thử lại nhé!
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
  const { foods, isLoading, error, refetch } = useHomeFeed();

  // UX Skill RN #24: useCallback cho renderItem
  const renderItem = useCallback(
    ({ item }: { item: IFood }) => <FoodItem item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: IFood) => item.id, []);

  return (
    <View className="flex-1 bg-background">
      <HomeHeader />

      {/* UX Skill RN #18: FlatList thay ScrollView.map */}
      <FlatList
        data={foods}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        numColumns={2}
        columnWrapperStyle={{ paddingHorizontal: 16, gap: 12, marginBottom: 12 }}
        ListHeaderComponent={<ListHeader />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}

        // UX Skill #78: Loading indicator
        ListEmptyComponent={
          isLoading ? (
            <View className="py-16 items-center">
              <ActivityIndicator size="large" color="#00687b" />
              <Text className="text-on-surface-variant mt-3 text-sm">
                Đang tải món ăn...
              </Text>
            </View>
          ) : error ? (
            // UX Skill #80: Error recovery
            <EmptyState onRetry={refetch} />
          ) : (
            <EmptyState onRetry={refetch} />
          )
        }

        // Pull to refresh (UX Skill RN)
        onRefresh={refetch}
        refreshing={isLoading && foods.length > 0}
      />
    </View>
  );
}
