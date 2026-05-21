import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ActivityScreen() {
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('history');

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-white pt-14 pb-2 px-4 shadow-sm border-b border-outline-variant z-10">
        <Text className="text-3xl font-extrabold text-on-surface tracking-tight mb-4">Hoạt động</Text>
        
        {/* Segmented Tabs */}
        <View className="flex-row">
          <TouchableOpacity 
            className={`mr-6 pb-2 border-b-2 ${activeTab === 'current' ? 'border-primary' : 'border-transparent'}`}
            onPress={() => setActiveTab('current')}
          >
            <Text className={`font-bold text-base ${activeTab === 'current' ? 'text-primary' : 'text-on-surface-variant'}`}>
              Hiện tại
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className={`pb-2 border-b-2 ${activeTab === 'history' ? 'border-primary' : 'border-transparent'}`}
            onPress={() => setActiveTab('history')}
          >
            <Text className={`font-bold text-base ${activeTab === 'history' ? 'text-primary' : 'text-on-surface-variant'}`}>
              Lịch sử
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView className="flex-1 pt-4" showsVerticalScrollIndicator={false}>
        {activeTab === 'current' ? (
          <View className="items-center justify-center py-20 px-4">
            <MaterialIcons name="receipt-long" size={64} color="#D1D5DB" />
            <Text className="text-on-surface-variant text-base mt-4 text-center">
              Bạn chưa có đơn hàng nào đang thực hiện.
            </Text>
          </View>
        ) : (
          <View className="px-4">
            {/* History Item 1 */}
            <View className="bg-white rounded-2xl p-4 mb-4 shadow-sm border border-outline-variant">
              <View className="flex-row justify-between items-center mb-3 border-b border-outline-variant pb-3">
                <View className="flex-row items-center">
                  <MaterialIcons name="restaurant" size={20} color="#00687b" />
                  <Text className="ml-2 font-bold text-on-surface text-base">Jollibee - EC Đống Đa</Text>
                </View>
                <Text className="text-xs text-on-surface-variant">12 Th5 10:30</Text>
              </View>
              
              <View className="flex-row mb-4">
                <View className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden mr-3">
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=150&q=80' }} className="w-full h-full" />
                </View>
                <View className="flex-1">
                  <Text className="text-on-surface-variant mb-1" numberOfLines={1}>1 x Combo 3 Gà Giòn Vui Vẻ</Text>
                  <Text className="text-on-surface-variant mb-1" numberOfLines={1}>1 x Khoai Tây Chiên (Lớn)</Text>
                  <View className="flex-row justify-between items-center mt-1">
                    <View className="bg-green-100 px-2 py-0.5 rounded text-xs">
                      <Text className="text-green-700 text-[10px] font-bold">Hoàn thành</Text>
                    </View>
                    <Text className="font-bold text-on-surface">145.000đ</Text>
                  </View>
                </View>
              </View>
              
              <View className="flex-row gap-3">
                <TouchableOpacity className="flex-1 border border-outline-variant py-2 rounded-full items-center">
                  <Text className="font-bold text-on-surface-variant">Đánh giá</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 bg-primary py-2 rounded-full items-center">
                  <Text className="font-bold text-white">Đặt lại</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* History Item 2 */}
            <View className="bg-white rounded-2xl p-4 mb-8 shadow-sm border border-outline-variant">
              <View className="flex-row justify-between items-center mb-3 border-b border-outline-variant pb-3">
                <View className="flex-row items-center">
                  <MaterialIcons name="local-cafe" size={20} color="#00687b" />
                  <Text className="ml-2 font-bold text-on-surface text-base">KOI Thé - Nguyễn Văn Linh</Text>
                </View>
                <Text className="text-xs text-on-surface-variant">10 Th5 14:15</Text>
              </View>
              
              <View className="flex-row mb-4">
                <View className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden mr-3">
                  <Image source={{ uri: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=150&q=80' }} className="w-full h-full" />
                </View>
                <View className="flex-1">
                  <Text className="text-on-surface-variant mb-1" numberOfLines={1}>2 x Lục Trà Trân Châu (M)</Text>
                  <View className="flex-row justify-between items-center mt-1">
                    <View className="bg-red-100 px-2 py-0.5 rounded text-xs">
                      <Text className="text-red-700 text-[10px] font-bold">Đã hủy</Text>
                    </View>
                    <Text className="font-bold text-on-surface">90.000đ</Text>
                  </View>
                </View>
              </View>
              
              <View className="flex-row gap-3">
                <TouchableOpacity className="flex-1 bg-primary py-2 rounded-full items-center">
                  <Text className="font-bold text-white">Đặt lại</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
