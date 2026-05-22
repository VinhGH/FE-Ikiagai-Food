import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useCartStore } from '../../store/cartStore';
import type { IFood, IShop } from '../../features/food/types';

// Enable LayoutAnimation on Android for smooth item removal
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MOCK_SHOPS: IShop[] = [
  {
    id: 's1',
    brandId: 'b1',
    name: 'Gogi House - Nướng Hàn Quốc',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=600&auto=format&fit=crop',
    rating: 4.8,
    reviewCount: 1250,
    deliveryTime: 25,
    deliveryFee: 15000,
    address: '123 Nguyễn Văn Linh',
    distance: 1.2,
    promotions: ['Giảm 20k', 'Freeship'],
  },
  {
    id: 's2',
    brandId: 'b2',
    name: 'Highlands Coffee - Hàm Nghi',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=200&auto=format&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop',
    rating: 4.5,
    reviewCount: 300,
    deliveryTime: 15,
    deliveryFee: 10000,
    address: '45 Hàm Nghi',
    distance: 2.5,
    promotions: ['Freeship Extra'],
  }
];

const MOCK_FOODS: IFood[] = [
  {
    id: 'f1',
    name: 'Cơm tấm Sườn Bì Chả',
    price: 45000,
    originalPrice: 55000,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1626804475297-41609ea004eb?q=80&w=400&auto=format&fit=crop',
    shopId: 's3',
    rating: 4.7,
  },
  {
    id: 'f2',
    name: 'Trà sữa Trân châu Đường đen',
    price: 35000,
    originalPrice: 40000,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1558857563-b371034d7088?q=80&w=400&auto=format&fit=crop',
    shopId: 's4',
    rating: 4.9,
  }
];

export default function HeartScreen() {
  const router = useRouter();
  const { addToCart } = useCartStore();
  
  const [activeTab, setActiveTab] = useState<'shops' | 'foods'>('shops');
  
  const [favShops, setFavShops] = useState<IShop[]>(MOCK_SHOPS);
  const [favFoods, setFavFoods] = useState<IFood[]>(MOCK_FOODS);

  const handleUnfavoriteShop = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFavShops(prev => prev.filter(s => s.id !== id));
  };

  const handleUnfavoriteFood = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFavFoods(prev => prev.filter(f => f.id !== id));
  };

  const handleAddFood = (food: IFood) => {
    addToCart(food, 1);
    Alert.alert('Thành công', `Đã thêm ${food.name} vào giỏ hàng!`);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      {/* Header */}
      <View className="px-4 py-3 bg-white flex-row items-center justify-between border-b border-slate-100">
        <Text className="text-xl font-black text-slate-800 tracking-tight">Yêu thích</Text>
        <TouchableOpacity className="w-10 h-10 items-center justify-center rounded-full bg-slate-50 border border-slate-100">
          <MaterialIcons name="search" size={22} color="#64748B" />
        </TouchableOpacity>
      </View>

      {/* Top Tabs */}
      <View className="flex-row bg-white px-4 border-b border-slate-100">
        <TouchableOpacity 
          className="flex-1 py-3.5 items-center justify-center relative"
          onPress={() => setActiveTab('shops')}
          activeOpacity={0.7}
        >
          <Text className={`text-[13px] font-bold ${activeTab === 'shops' ? 'text-[#00b4d8]' : 'text-slate-500'}`}>Nhà hàng</Text>
          {activeTab === 'shops' && (
            <View className="absolute bottom-0 left-4 right-4 h-[3px] bg-[#6ed6f2] rounded-t-full shadow-sm shadow-cyan-200" />
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-1 py-3.5 items-center justify-center relative"
          onPress={() => setActiveTab('foods')}
          activeOpacity={0.7}
        >
          <Text className={`text-[13px] font-bold ${activeTab === 'foods' ? 'text-[#00b4d8]' : 'text-slate-500'}`}>Món ăn</Text>
          {activeTab === 'foods' && (
            <View className="absolute bottom-0 left-4 right-4 h-[3px] bg-[#6ed6f2] rounded-t-full shadow-sm shadow-cyan-200" />
          )}
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {activeTab === 'shops' ? (
          favShops.length > 0 ? (
            <View className="gap-4">
              {favShops.map(shop => (
                <TouchableOpacity 
                  key={shop.id} 
                  activeOpacity={0.95}
                  onPress={() => router.push(`/shop/${shop.id}` as any)}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm"
                >
                  {/* Shop Cover */}
                  <View className="h-32 w-full bg-slate-200 relative">
                    <Image source={{ uri: shop.coverImage }} className="w-full h-full" resizeMode="cover" />
                    
                    {/* Gradient overlay for better text contrast */}
                    <View className="absolute inset-0 bg-black/10" />
                    
                    {/* Heart Button */}
                    <TouchableOpacity 
                      className="absolute top-3 right-3 w-8 h-8 bg-white/95 rounded-full items-center justify-center shadow-sm"
                      onPress={(e) => { e.stopPropagation(); handleUnfavoriteShop(shop.id); }}
                      activeOpacity={0.7}
                    >
                      <MaterialIcons name="favorite" size={18} color="#ef4444" />
                    </TouchableOpacity>

                    {/* Promo Tags */}
                    {shop.promotions && shop.promotions.length > 0 && (
                      <View className="absolute bottom-3 left-3 flex-row gap-2">
                        {shop.promotions.map((promo, idx) => (
                          <View key={idx} className="bg-[#6ed6f2]/95 px-2 py-1 rounded-md border border-[#48cae4]">
                            <Text className="text-white text-[10px] font-bold tracking-wide">{promo}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>

                  {/* Shop Info */}
                  <View className="p-3.5">
                    <Text className="text-base font-bold text-slate-800" numberOfLines={1}>{shop.name}</Text>
                    
                    <View className="flex-row items-center mt-2 gap-3">
                      <View className="flex-row items-center">
                        <MaterialIcons name="star" size={14} color="#F59E0B" />
                        <Text className="text-xs font-bold text-slate-700 ml-1">{shop.rating}</Text>
                        <Text className="text-xs text-slate-400 ml-1">({shop.reviewCount})</Text>
                      </View>
                      
                      <View className="w-1 h-1 rounded-full bg-slate-300" />
                      
                      <View className="flex-row items-center">
                        <MaterialIcons name="location-on" size={14} color="#64748B" />
                        <Text className="text-xs text-slate-600 ml-0.5 font-medium">{shop.distance} km</Text>
                      </View>
                      
                      <View className="w-1 h-1 rounded-full bg-slate-300" />
                      
                      <View className="flex-row items-center">
                        <MaterialIcons name="access-time" size={14} color="#64748B" />
                        <Text className="text-xs text-slate-600 ml-0.5 font-medium">{shop.deliveryTime} phút</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <EmptyState 
              title="Chưa có nhà hàng yêu thích" 
              desc="Lưu lại những nhà hàng bạn yêu thích để đặt món nhanh hơn nhé." 
              onExplore={() => router.push('/')} 
            />
          )
        ) : (
          favFoods.length > 0 ? (
            <View className="gap-3">
              {favFoods.map(food => (
                <TouchableOpacity 
                  key={food.id}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/food/${food.id}` as any)}
                  className="bg-white rounded-2xl p-3 flex-row border border-slate-100 shadow-sm"
                >
                  <View className="w-24 h-24 rounded-xl bg-slate-100 overflow-hidden relative">
                    <Image source={{ uri: food.image }} className="w-full h-full" resizeMode="cover" />
                    {food.discount && (
                      <View className="absolute top-1 left-1 bg-red-500/95 px-1.5 py-0.5 rounded border border-red-400">
                        <Text className="text-white text-[9px] font-bold">-{food.discount}%</Text>
                      </View>
                    )}
                  </View>

                  <View className="flex-1 ml-3.5 justify-between py-0.5">
                    <View>
                      <View className="flex-row justify-between items-start">
                        <Text className="text-sm font-bold text-slate-800 flex-1 mr-2 leading-tight" numberOfLines={2}>
                          {food.name}
                        </Text>
                        <TouchableOpacity 
                          onPress={(e) => { e.stopPropagation(); handleUnfavoriteFood(food.id); }}
                          activeOpacity={0.7}
                          className="p-1 -mr-1 -mt-1"
                        >
                          <MaterialIcons name="favorite" size={20} color="#ef4444" />
                        </TouchableOpacity>
                      </View>
                      
                      <View className="flex-row items-center mt-1.5">
                        <MaterialIcons name="star" size={12} color="#F59E0B" />
                        <Text className="text-[11px] text-slate-600 ml-1 font-bold">{food.rating}</Text>
                      </View>
                    </View>

                    <View className="flex-row items-end justify-between mt-2">
                      <View>
                        <Text className="text-sm font-black text-[#00b4d8]">
                          {food.price.toLocaleString('vi-VN')}đ
                        </Text>
                        {food.originalPrice && (
                          <Text className="text-[10px] text-slate-400 line-through mt-0.5">
                            {food.originalPrice.toLocaleString('vi-VN')}đ
                          </Text>
                        )}
                      </View>
                      
                      <TouchableOpacity 
                        className="bg-[#e0f2fe] w-8 h-8 rounded-full border border-[#bae6fd] items-center justify-center"
                        onPress={(e) => { e.stopPropagation(); handleAddFood(food); }}
                        activeOpacity={0.7}
                      >
                        <MaterialIcons name="add-shopping-cart" size={16} color="#00b4d8" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <EmptyState 
              title="Chưa có món ăn yêu thích" 
              desc="Thả tim cho những món ăn ngon để dễ dàng tìm lại lúc đói bụng nhé!" 
              onExplore={() => router.push('/')} 
            />
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function EmptyState({ title, desc, onExplore }: { title: string; desc: string; onExplore: () => void }) {
  return (
    <View className="flex-1 items-center justify-center py-24 px-6">
      <View className="w-28 h-28 bg-slate-100 rounded-full items-center justify-center mb-6">
        <MaterialIcons name="favorite-border" size={56} color="#CBD5E1" />
      </View>
      <Text className="text-lg font-black text-slate-800 text-center mb-2">{title}</Text>
      <Text className="text-sm text-slate-500 text-center mb-8 leading-relaxed px-4">
        {desc}
      </Text>
      <TouchableOpacity 
        onPress={onExplore}
        activeOpacity={0.8}
        className="bg-[#6ed6f2] px-8 py-3.5 rounded-full shadow-md shadow-cyan-200/50"
      >
        <Text className="text-white font-bold text-sm tracking-wide">Khám phá ngay</Text>
      </TouchableOpacity>
    </View>
  );
}
