import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const MOCK_HISTORY_ADDRESSES = [
  {
    id: '1',
    title: 'Nhà',
    address: '6 Đường Nguyễn Công Hoan, Phường An Khê, Thành phố Đà Nẵng, Việt Nam',
    distance: '5 m',
    icon: 'location-on',
    isHome: true,
    isFavorite: true,
  },
  {
    id: '2',
    title: '06 Đường Nguyễn Công Hoan',
    address: 'Phường An Khê, Thành phố Đà Nẵng, Việt Nam',
    distance: '1.1 km',
    icon: 'history',
    isHome: false,
    isFavorite: false,
  },
  {
    id: '3',
    title: '5 Đường Nguyễn Công Hoan',
    address: 'Phường An Khê, Thành phố Đà Nẵng, Việt Nam',
    distance: '',
    icon: 'history',
    isHome: false,
    isFavorite: false,
  },
  {
    id: '4',
    title: 'Sửa Xe Phụng Hoàng Tôn Đản',
    address: 'Phường An Khê, Thành phố Đà Nẵng, Việt Nam',
    distance: '968 m',
    icon: 'history',
    isHome: false,
    isFavorite: false,
  },
  {
    id: '5',
    title: 'ZONE SIX',
    address: '19 Đường Phạm Như Xương, Phường Hòa Khánh, Thành phố Đà Nẵng, Việt Nam',
    distance: '2 km',
    icon: 'history',
    isHome: false,
    isFavorite: false,
  },
  {
    id: '6',
    title: 'Quán Nhậu Bình Dân Thanh Vân Quán Yên Khê',
    address: '2 Đường Yên Khê 2, Phường Thanh Khê, Thành Phố Đà Nẵng, Việt Nam',
    distance: '1.5 km',
    icon: 'history',
    isHome: false,
    isFavorite: false,
  },
];

export default function AddressPickerScreen() {
  const router = useRouter();
  const [isMergeProvinceEnabled, setIsMergeProvinceEnabled] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 gap-3">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="p-1"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
        </TouchableOpacity>
        
        <View className="flex-1 bg-slate-100 rounded-full h-11 flex-row items-center px-3 gap-2">
          <View className="bg-blue-600 rounded-full w-6 h-6 items-center justify-center">
            <MaterialIcons name="person" size={16} color="white" />
          </View>
          <TextInput 
            className="flex-1 text-slate-800 text-sm font-medium"
            placeholder="Nhập địa chỉ của bạn"
            placeholderTextColor="#64748B"
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Address History List */}
        <View className="px-4">
          {MOCK_HISTORY_ADDRESSES.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              className={`flex-row items-start py-4 ${index !== MOCK_HISTORY_ADDRESSES.length - 1 ? 'border-b border-slate-100' : ''}`}
            >
              {/* Left Icon & Distance */}
              <View className="w-10 items-center mt-0.5">
                {item.isHome ? (
                  <MaterialIcons name="location-on" size={20} color="#64748B" />
                ) : (
                  <MaterialIcons name="history" size={20} color="#64748B" />
                )}
                {!!item.distance && (
                  <Text className="text-[10px] text-slate-500 font-medium mt-1 text-center">
                    {item.distance}
                  </Text>
                )}
              </View>

              {/* Address Info */}
              <View className="flex-1 px-2">
                <Text className="text-base text-slate-800 font-medium mb-1">
                  {item.title}
                </Text>
                <Text className="text-xs text-slate-500" numberOfLines={2}>
                  {item.address}
                </Text>
              </View>

              {/* Right Icons */}
              <View className="flex-row items-center gap-3">
                <TouchableOpacity>
                  {item.isFavorite ? (
                    <MaterialIcons name="favorite" size={20} color="#EF4444" />
                  ) : (
                    <MaterialIcons name="favorite-border" size={20} color="#94A3B8" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity>
                  <MaterialIcons name="more-vert" size={20} color="#94A3B8" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="h-2 w-full bg-slate-50" />

        {/* Options List */}
        <View className="px-4 py-2">
          {/* Saved Addresses */}
          <TouchableOpacity className="flex-row items-center py-4 border-b border-slate-100">
            <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center">
              <MaterialIcons name="favorite" size={20} color="#EF4444" />
            </View>
            <View className="flex-1 px-3">
              <Text className="text-[15px] font-semibold text-slate-800">Địa chỉ đã lưu</Text>
              <Text className="text-xs text-slate-500 mt-0.5">2 địa chỉ</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#94A3B8" />
          </TouchableOpacity>

          {/* Choose on Map */}
          <TouchableOpacity className="flex-row items-center py-4 border-b border-slate-100">
            <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center">
              <MaterialIcons name="map" size={20} color="#1E293B" />
            </View>
            <View className="flex-1 px-3">
              <Text className="text-[15px] font-semibold text-slate-800">Chọn trên bản đồ</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#94A3B8" />
          </TouchableOpacity>

          {/* Show Address After Province Merge */}
          <View className="flex-row items-center py-4">
            <View className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center">
              <Feather name="sun" size={20} color="#1E293B" />
            </View>
            <View className="flex-1 px-3">
              <Text className="text-[15px] font-semibold text-slate-800">Hiển thị địa chỉ sau sáp nhập tỉnh</Text>
            </View>
            <Switch
              trackColor={{ false: '#E2E8F0', true: '#A5F3FC' }}
              thumbColor={isMergeProvinceEnabled ? '#06B6D4' : '#F8FAFC'}
              ios_backgroundColor="#E2E8F0"
              onValueChange={setIsMergeProvinceEnabled}
              value={isMergeProvinceEnabled}
              style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
            />
          </View>
        </View>

        <View className="h-2 w-full bg-slate-50" />

        {/* Footer: Add new address */}
        <View className="px-4 py-5">
          <Text className="text-base font-bold text-slate-800 mb-4">Không thấy địa điểm bạn cần?</Text>
          
          <TouchableOpacity className="flex-row items-center">
            <View className="w-12 h-12 rounded-full bg-slate-100 items-center justify-center border border-slate-200">
              <MaterialIcons name="add" size={24} color="#1E293B" />
            </View>
            <View className="flex-1 px-3">
              <Text className="text-[15px] font-semibold text-slate-800 leading-tight">
                Thêm ngay địa điểm mới để chuyến đi luôn chuẩn xác!
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#94A3B8" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
