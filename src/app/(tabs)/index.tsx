import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { CategoryFilter } from '../../features/food/components/CategoryFilter';
import { FoodCard } from '../../features/food/components/FoodCard';
import { useFoodCategories, useGetFoods } from '../../features/food/hooks/useGetFoods';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = useFoodCategories();
  const { foods, isLoading, error } = useGetFoods(searchQuery, selectedCategory);

  const renderHeader = () => (
    <View>
      {/* Header */}
      <View className="px-4 pt-2 pb-3">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-row items-center gap-2">
            <View className="w-8 h-8 bg-primary-container rounded-full items-center justify-center">
              <Text className="text-on-primary-container text-xs font-bold">BH</Text>
            </View>
            <Text className="text-on-surface text-xl font-bold">Burger House</Text>
          </View>
          <Pressable className="p-2">
            <MaterialIcons name="shopping-cart" size={24} color="#49454F" />
          </Pressable>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center bg-surface-container-low rounded-full px-4 py-2">
          <MaterialIcons name="search" size={20} color="#79747E" />
          <TextInput
            className="flex-1 ml-2 text-on-surface text-sm"
            placeholder="Tìm món ăn..."
            placeholderTextColor="#79747E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Category Filter */}
      <CategoryFilter categories={categories} selected={selectedCategory} onChange={setSelectedCategory} />

      {/* Section Title */}
      <View className="px-4 pt-4 pb-2">
        <Text className="text-on-surface text-lg font-bold">Món bán chạy 🔥</Text>
        {error && <Text className="text-red-600 text-sm mt-1">{error}</Text>}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={foods}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={
          isLoading ? (
            <View className="py-10">
              <ActivityIndicator color="#00687b" />
            </View>
          ) : (
            <Text className="text-center text-on-surface-variant py-10">Chưa có món phù hợp</Text>
          )
        }
        columnWrapperStyle={{ paddingHorizontal: 8, gap: 8 }}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <FoodCard item={item} />
        )}
      />
    </SafeAreaView>
  );
}
