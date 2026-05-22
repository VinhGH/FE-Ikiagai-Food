// ──────────────────────────────────────────────────────────────────
// features/food/components/ShopHeroCard.tsx
// Giữ nguyên UI, cập nhật để nhận shop data qua props
// ──────────────────────────────────────────────────────────────────

import { View, Text, Image, TouchableOpacity } from 'react-native';
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
  const rating = shop?.rating?.toFixed(1) ?? '—';
  const reviewCount = shop?.reviewCount
    ? shop.reviewCount >= 1000
      ? `${(shop.reviewCount / 1000).toFixed(0)}K+`
      : `${shop.reviewCount}+`
    : '';
  const deliveryFee = shop?.deliveryFee === 0 ? 'Miễn phí' : `${shop?.deliveryFee?.toLocaleString('vi-VN')}đ`;
  const deliveryTime = shop?.deliveryTime ? `${shop.deliveryTime} phút trở lên` : '';

  return (
    <View className="relative bg-white pb-4 shadow-sm z-10">
      {/* Cover Image */}
      <View className="h-48 bg-gray-200 relative">
        <Image source={{ uri: coverImage }} className="absolute w-full h-full" resizeMode="cover" />
        <View className="absolute w-full h-full bg-black/20" />
        
        <View className="flex-row justify-between p-4 pt-12 z-10">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-11 h-11 bg-black/30 rounded-full items-center justify-center"
            accessibilityLabel="Quay lại"
            accessibilityRole="button"
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-row gap-3">
            <TouchableOpacity
              className="w-11 h-11 bg-black/30 rounded-full items-center justify-center"
              accessibilityLabel="Yêu thích"
            >
              <MaterialIcons name="favorite-border" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className="px-3 h-11 bg-black/30 rounded-full flex-row items-center justify-center"
              accessibilityLabel="Giao hàng"
            >
              <MaterialIcons name="delivery-dining" size={16} color="white" />
              <Text className="text-white ml-1 text-xs font-bold">Giao hàng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Floating Info Card */}
      <View className="mx-4 -mt-10 bg-white rounded-2xl shadow-lg elevation-5 p-4 flex-row items-start border border-outline-variant z-20">
        <View className="w-16 h-16 bg-gray-100 rounded-full mr-4 border border-outline-variant items-center justify-center overflow-hidden">
          <Image source={{ uri: logo }} className="w-full h-full" resizeMode="cover" />
        </View>
        <View className="flex-1">
          <Text className="text-xl font-extrabold text-on-surface mb-1">{name}</Text>
          {address ? (
            <Text className="text-sm text-on-surface-variant mb-2">{address}</Text>
          ) : null}
          
          <View className="flex-row items-center mb-1">
            <MaterialIcons name="star" size={16} color="#F59E0B" />
            <Text className="text-on-surface font-bold text-sm ml-1">
              {rating}{' '}
              {reviewCount ? (
                <Text className="text-on-surface-variant font-normal">({reviewCount})</Text>
              ) : null}
            </Text>
          </View>
          
          <View className="flex-row items-center">
            <MaterialIcons name="local-shipping" size={14} color="#6ed6f2" />
            <Text className="text-sm text-on-surface-variant ml-1">
              <Text className="text-on-surface">{deliveryFee}</Text>
              {deliveryTime ? `  •  ${deliveryTime}` : ''}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
