import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Dimensions, StyleSheet } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

// Mock Data
const categories = [
  { id: '1', name: 'Cơm & Xôi', icon: 'rice-bowl', color: '#FFF3E0' },
  { id: '2', name: 'Đồ Uống', icon: 'local-cafe', color: '#E0F7FA' },
  { id: '3', name: 'Bún Phở', icon: 'ramen-dining', color: '#FCE4EC' },
  { id: '4', name: 'Đồ Ngọt', icon: 'cake', color: '#F3E5F5' },
];

const nearbyShops = [
  {
    id: 's1',
    name: 'C&N - Cà Phê Tui Pha - Nguyễn Công Hoan',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80',
    rating: 5.0,
    reviewCount: 1,
    sales: '10+',
    deliveryTime: 22,
    distance: 1.2,
    badges: [{ text: '50%', type: 'discount' }, { text: 'Siêu Tốc', type: 'speed' }],
    vouchers: ['40.000đ'],
    freeship: 'Freeship 12.000đ',
    isPartner: true,
  },
  {
    id: 's2',
    name: 'Bún Chả Sinh Viên - Ngọc Khánh',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80',
    rating: 4.8,
    reviewCount: 156,
    sales: '500+',
    deliveryTime: 15,
    distance: 0.8,
    badges: [{ text: '11k', type: 'deal' }],
    vouchers: ['Giảm 15%'],
    freeship: 'Freeship 15.000đ',
    isPartner: true,
  },
  {
    id: 's3',
    name: 'Cơm Tấm Sườn Bì - Giảng Võ',
    image: 'https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=300&q=80',
    rating: 4.5,
    reviewCount: 89,
    sales: '100+',
    deliveryTime: 30,
    distance: 2.1,
    badges: [{ text: '65k', type: 'deal' }, { text: 'Siêu Tốc', type: 'speed' }],
    vouchers: ['Giảm 20k', 'Tặng Coca'],
    freeship: '',
    isPartner: false,
  },
];

export default function MapScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('1');

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      {/* MAP SECTION (Top Half) */}
      <View style={{ height: height * 0.45 }} className="relative bg-slate-200 w-full">
        {/* Mock Map Image */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }}
          className="w-full h-full opacity-90"
          resizeMode="cover"
        />
        <View className="absolute inset-0 bg-sky-100/20" />

        {/* Top Controls */}
        <SafeAreaView className="absolute top-0 w-full px-4 pt-2">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-md shadow-slate-300"
          >
            <MaterialIcons name="close" size={24} color="#334155" />
          </TouchableOpacity>
        </SafeAreaView>

        {/* Floating Filters on Map */}
        <View className="absolute bottom-6 left-4 right-4 flex-row justify-between items-end">
          <View className="flex-row gap-2 flex-wrap flex-1">
            <TouchableOpacity className="bg-white rounded-full px-4 py-2.5 flex-row items-center shadow-md shadow-slate-300 gap-1.5 border border-slate-100">
              <MaterialIcons name="grid-view" size={16} color="#6ed6f2" />
              <Text className="font-bold text-slate-800 text-xs">Khuyến mại</Text>
            </TouchableOpacity>
            
            <TouchableOpacity className="bg-white rounded-full px-4 py-2.5 flex-row items-center shadow-md shadow-slate-300 gap-1.5 border border-slate-100">
              <MaterialIcons name="verified" size={16} color="#10B981" />
              <Text className="font-bold text-slate-800 text-xs">Chỉ Green Partner</Text>
            </TouchableOpacity>
          </View>

          {/* Locate Me Button */}
          <TouchableOpacity className="w-11 h-11 bg-white rounded-full items-center justify-center shadow-md shadow-slate-300 border border-slate-100 ml-2">
            <MaterialIcons name="my-location" size={22} color="#6ed6f2" />
          </TouchableOpacity>
        </View>
      </View>

      {/* BOTTOM SHEET SECTION */}
      <View className="flex-1 bg-white -mt-4 rounded-t-3xl shadow-lg border-t border-slate-100">
        {/* Drag Handle */}
        <View className="w-full items-center py-3">
          <View className="w-12 h-1.5 bg-slate-200 rounded-full" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          
          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16, gap: 16, paddingBottom: 16 }}>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <TouchableOpacity 
                  key={cat.id} 
                  onPress={() => setActiveCategory(cat.id)}
                  className="items-center gap-2"
                >
                  <View 
                    style={{ backgroundColor: isActive ? '#6ed6f2' : cat.color }} 
                    className="w-14 h-14 rounded-full items-center justify-center shadow-sm"
                  >
                    <MaterialIcons 
                      name={cat.icon as any} 
                      size={24} 
                      color={isActive ? '#FFFFFF' : '#475569'} 
                    />
                  </View>
                  <Text className={`text-xs ${isActive ? 'font-black text-[#6ed6f2]' : 'font-semibold text-slate-600'}`}>
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Location Header */}
          <TouchableOpacity className="flex-row items-center px-4 py-3 border-y border-slate-100 bg-slate-50">
            <Text className="font-bold text-slate-800 flex-1" numberOfLines={1}>
              Quán gần 5 Đường Nguyễn Công Hoan, P...
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={24} color="#64748B" />
          </TouchableOpacity>

          {/* Nearby Shops List */}
          <View className="px-4 pt-4 gap-4">
            {nearbyShops.map((shop) => (
              <TouchableOpacity key={shop.id} className="flex-row gap-3 bg-white" activeOpacity={0.8}>
                {/* Image & Badges */}
                <View className="w-28 h-28 rounded-xl overflow-hidden relative border border-slate-100">
                  <Image source={{ uri: shop.image }} className="w-full h-full" resizeMode="cover" />
                  
                  {/* Top Left Badges */}
                  <View className="absolute top-0 left-0 gap-0.5">
                    {shop.badges.map((badge, idx) => {
                      let bgColor = 'bg-red-500';
                      if (badge.type === 'discount') bgColor = 'bg-amber-400';
                      else if (badge.type === 'speed') bgColor = 'bg-[#6ed6f2]';

                      return (
                        <View key={idx} className={`${bgColor} px-1.5 py-0.5 rounded-br-lg`}>
                          <Text className="text-white text-[9px] font-black">{badge.text}</Text>
                        </View>
                      );
                    })}
                  </View>

                  {/* Bottom Speed Badge */}
                  {shop.badges.some(b => b.type === 'speed') && (
                    <View className="absolute bottom-0 left-0 right-0 bg-[#6ed6f2]/90 py-0.5 items-center">
                      <Text className="text-white text-[9px] font-black">Siêu Tốc</Text>
                    </View>
                  )}
                </View>

                {/* Info */}
                <View className="flex-1 justify-between py-0.5">
                  <View>
                    <View className="flex-row items-start pr-2">
                      {shop.isPartner && (
                        <MaterialIcons name="verified" size={14} color="#10B981" style={{ marginTop: 2, marginRight: 4 }} />
                      )}
                      <Text className="font-black text-slate-800 text-sm leading-tight flex-1" numberOfLines={2}>
                        {shop.name}
                      </Text>
                    </View>

                    {/* Stats Row */}
                    <View className="flex-row items-center gap-1.5 mt-1.5 flex-wrap">
                      <View className="flex-row items-center">
                        <MaterialIcons name="star" size={12} color="#F59E0B" />
                        <Text className="text-[11px] font-bold text-slate-700 ml-0.5">{shop.rating}</Text>
                        <Text className="text-[10px] text-slate-400 ml-0.5">({shop.reviewCount})</Text>
                      </View>
                      <Text className="text-slate-300 text-[10px]">•</Text>
                      <Text className="text-[10px] text-slate-500">{shop.sales} đã bán</Text>
                      <Text className="text-slate-300 text-[10px]">•</Text>
                      <Text className="text-[10px] text-slate-500">{shop.deliveryTime} phút</Text>
                    </View>
                  </View>

                  {/* Promos */}
                  <View className="flex-row items-center gap-2 mt-2 flex-wrap">
                    {shop.vouchers.map((v, i) => (
                      <View key={i} className="flex-row items-center bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                        <MaterialCommunityIcons name="ticket-percent-outline" size={12} color="#EF4444" />
                        <Text className="text-[9px] text-red-600 font-bold ml-1">{v}</Text>
                      </View>
                    ))}
                    {shop.freeship ? (
                      <View className="flex-row items-center bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-100">
                        <MaterialCommunityIcons name="truck-fast-outline" size={12} color="#10B981" />
                        <Text className="text-[9px] text-emerald-600 font-bold ml-1">{shop.freeship}</Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
