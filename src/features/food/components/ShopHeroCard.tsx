// ──────────────────────────────────────────────────────────────────
// features/food/components/ShopHeroCard.tsx
// Thiết kế lại giao diện chi tiết cửa hàng theo phong cách Highlands
// ──────────────────────────────────────────────────────────────────

import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import type { IShop } from '../types';

interface ShopHeroCardProps {
  shop?: IShop | null;
}

export function ShopHeroCard({ shop }: ShopHeroCardProps) {
  const router = useRouter();

  // Fallback values khi chưa có data
  const coverImage = shop?.coverImage
    ?? 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80';
  const logo = shop?.image
    ?? 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=150&q=80';
  const name = shop?.name ?? 'Đang tải...';
  const address = shop?.address ?? '';
  const rating = shop?.rating?.toFixed(1) ?? '4.5';
  const reviewCount = shop?.reviewCount
    ? shop.reviewCount >= 1000
      ? `${(shop.reviewCount / 1000).toFixed(0)}K+`
      : `${shop.reviewCount}`
    : '10';
  const distance = shop?.distance ? `${shop.distance} km` : '0.7 km';
  const deliveryTime = shop?.deliveryTime ? `${shop.deliveryTime} phút` : '11 phút';
  const deliveryFee = shop?.deliveryFee === 0 ? 'Freeship 0đ' : `Phí giao ${shop?.deliveryFee?.toLocaleString('vi-VN')}đ`;

  // Vouchers/Promotions from shop.promotions or fallback
  const vouchers = shop?.promotions && shop.promotions.length > 0
    ? shop.promotions
    : ['Giảm 20.000đ', 'Giảm 30.000đ', 'Freeship'];

  return (
    <View className="bg-white pb-3 border-b border-gray-100">
      {/* Cover Image */}
      <View className="h-52 bg-gray-200 relative">
        <Image source={{ uri: coverImage }} className="absolute w-full h-full" resizeMode="cover" />
        <View className="absolute w-full h-full bg-black/20" />
        
        {/* Header Actions Overlay */}
        <View className="flex-row justify-between items-center p-4 pt-12 z-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-9 h-9 bg-black/40 rounded-full items-center justify-center"
            accessibilityLabel="Quay lại"
            accessibilityRole="button"
          >
            <MaterialIcons name="arrow-back" size={22} color="white" />
          </TouchableOpacity>
          
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="w-9 h-9 bg-black/40 rounded-full items-center justify-center"
              accessibilityLabel="Tìm kiếm"
            >
              <MaterialIcons name="search" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className="w-9 h-9 bg-black/40 rounded-full items-center justify-center"
              accessibilityLabel="Chia sẻ"
            >
              <MaterialIcons name="share" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className="w-9 h-9 bg-black/40 rounded-full items-center justify-center"
              accessibilityLabel="Yêu thích"
            >
              <MaterialIcons name="favorite-border" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Info Block (Under cover image) */}
      <View className="px-4 pt-3">
        {/* Partner badge & Group order button row */}
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center bg-green-50 border border-green-200 px-2 py-0.5 rounded">
            <MaterialIcons name="verified" size={14} color="#10B981" />
            <Text className="text-green-700 text-[11px] font-extrabold ml-1">ĐỐI TÁC</Text>
          </View>
          
          <TouchableOpacity 
            className="bg-slate-800 px-3.5 py-1.5 rounded-full flex-row items-center"
            activeOpacity={0.8}
          >
            <MaterialIcons name="group-add" size={14} color="white" />
            <Text className="text-white text-xs font-bold ml-1">Đặt nhóm</Text>
          </TouchableOpacity>
        </View>

        {/* Shop Name */}
        <Text className="text-xl font-black text-on-surface tracking-tight">{name}</Text>
        
        {/* Address */}
        {address ? (
          <Text className="text-xs text-on-surface-variant mt-1" numberOfLines={1}>
            {address}
          </Text>
        ) : null}

        {/* Details Row: Rating, distance, time, delivery fee */}
        <View className="flex-row items-center flex-wrap mt-2.5 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
          <View className="flex-row items-center mr-3">
            <MaterialIcons name="star" size={16} color="#F59E0B" />
            <Text className="text-on-surface font-extrabold text-xs ml-0.5">{rating}</Text>
            <Text className="text-on-surface-variant text-[11px] font-medium ml-0.5">({reviewCount})</Text>
          </View>
          
          <Text className="text-gray-300 text-xs mr-3">•</Text>
          
          <View className="flex-row items-center mr-3">
            <MaterialIcons name="navigation" size={12} color="#6ed6f2" />
            <Text className="text-on-surface-variant text-[11px] font-bold ml-0.5">{distance}</Text>
          </View>
          
          <Text className="text-gray-300 text-xs mr-3">•</Text>

          <View className="flex-row items-center mr-3">
            <MaterialIcons name="access-time" size={12} color="#6ed6f2" />
            <Text className="text-on-surface-variant text-[11px] font-bold ml-0.5">{deliveryTime}</Text>
          </View>
          
          <Text className="text-gray-300 text-xs mr-3">•</Text>

          <View className="flex-row items-center">
            <MaterialIcons name="local-shipping" size={12} color="#6ed6f2" />
            <Text className="text-on-surface-variant text-[11px] font-bold ml-0.5">{deliveryFee}</Text>
          </View>
        </View>

        {/* Voucher Horizontal Row */}
        <View className="mt-3">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {vouchers.map((voucher, index) => (
              <View 
                key={index}
                className="bg-sky-50 border border-sky-100 px-3 py-1 rounded-lg flex-row items-center"
              >
                <MaterialIcons name="confirmation-number" size={12} color="#6ed6f2" />
                <Text className="text-[#6ed6f2] text-xs font-black ml-1.5">{voucher}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
