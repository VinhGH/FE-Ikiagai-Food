import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { CategoryFilter } from '../../features/food/components/CategoryFilter';
import { FoodCard } from '../../features/food/components/FoodCard';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Cheese Burger',
    price: 45000,
    originalPrice: 60000,
    discount: 25,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDYtvt4jHzWYELEuLsDVGC3mlGLhucdGOTXz6pg4GlX1I1RzVSNYhsn3AtYVPO2USCK9DCsF2vifQ1G9-vM1HXtcsKA0HqmPVgBFtHCa9xy8wXftK62BSoDzXCxDGvhmH7ayaagUkXovclHEGHLE1J84hlp0sQ8rX3vFBZpzfaGqs5xdGvH60jxr1X-_S8ADTlztdyxn3FNfurhBH2l8m4QfL_E_2VyJTv8VWDIIKpKJIJUXPpG2yPmK3JbtzKqfh-qj4lE1StJ',
  },
  {
    id: '2',
    name: 'Double Burger',
    price: 65000,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAhmAjq3T1geRq4x4PVjKaHgB_EBZrYFznPDVozgOOslwi14RC6LWpE7hLJi9Y1W8u_rWMtW5KMpQ76gRtMGE2DAUMju9ZQ3L7IbwfwaRU9iXH5QstjmsqLuZx63rcgETnC-7-y4JeBLZh0dXn0bsElPolh8esB2TkFw3Yn9FB8e7glQh5W-JqNUkaJ7O8FdHan5NX1J03DXRIv00lJqe9boo3iogEmQooS-KO3FGhDyK0D0k9UbXrFpgX9sRunaqyLVo8VWLex',
  },
  {
    id: '3',
    name: 'Pizza Pepperoni',
    price: 89000,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD__Jg1GKqdFWVyZ6FdFYuJHJgwW8q14RG_KeqcJUCs4CLz-PoA64joK23BGSysj-fbQjDkCNlrOUa2ibf0OYNv8trMfyCYFLG3XrxK3jH8UxXA_teScfBNa4M5trO5cPcv45GsTnIeJa6CS5bSLzPYxVTtRPCDcyDqqovOe0yWvr0J8Mhzcigfdq6ixGscNX6VV-ifo5tFGuwyHqb5F2XhZVou2Mh9D4Rhb-SzrURgoC7WMfxpTbTcmFr6Ab8AQU9s-s6oelvG',
  },
  {
    id: '4',
    name: 'Gà Rán Combo',
    price: 55000,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHWqQb5W9s5P7sC9sbLYPiPfaW5xBeAqni6GDSE4X2vdeCdM8h6n05EOVz4T3wJSNP71DNMnfR6sr7LJFLFWyHp9SRkxl6F5KlmeLQP0VnAhQBhWB4EaCXywlr5zzyENBUwiJYlH08A1L4rl33QfA-s-bNTySO13YjB8T6IqL3e5ZlWFUgTGishGOm_eCwT_MKafjnYC-tlIroLxcBnuwgSVFX2OFqcabkANwgZ60DHYIjywz3bvv77_IrhjL47FpUBsGQKMmE',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

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
      <CategoryFilter />

      {/* Section Title */}
      <View className="px-4 pt-4 pb-2">
        <Text className="text-on-surface text-lg font-bold">Món bán chạy 🔥</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={MOCK_PRODUCTS}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        columnWrapperStyle={{ paddingHorizontal: 8, gap: 8 }}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <FoodCard item={item} />
        )}
      />
    </SafeAreaView>
  );
}
