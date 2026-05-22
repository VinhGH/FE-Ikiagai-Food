import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useCartStore } from '../../store/cartStore';
import { useOrderStore, IOrder } from '../../store/orderStore';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function ActivityScreen() {
  const router = useRouter();
  const { addToCart } = useCartStore();
  const { ongoingOrders, pastOrders, cancelOrder, reorderItems } = useOrderStore();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'history'>('ongoing');

  const handleReorder = (order: IOrder) => {
    reorderItems(order, addToCart);
    Alert.alert('Thành công', `Đã thêm các món từ ${order.shopName} vào giỏ hàng!`);
    router.push('/cart');
  };

  const handleRateOrder = (order: IOrder) => {
    Alert.alert('Đánh giá', `Cảm ơn bạn đã đặt món tại ${order.shopName}! Bạn muốn đánh giá mấy sao cho đơn hàng này?`, [
      { text: '5 Sao ★★★★★', onPress: () => Alert.alert('Đánh giá', 'Cảm ơn bạn đã đánh giá 5 sao!') },
      { text: '4 Sao ★★★★', onPress: () => Alert.alert('Đánh giá', 'Cảm ơn bạn đã đánh giá!') },
      { text: 'Để sau', style: 'cancel' }
    ]);
  };

  const handleCancelOrder = (id: string) => {
    Alert.alert('Hủy đơn hàng', 'Bạn có chắc chắn muốn hủy đơn hàng này không?', [
      {
        text: 'Đồng ý',
        onPress: () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          cancelOrder(id);
          Alert.alert('Thành công', 'Đã hủy đơn hàng thành công.');
        }
      },
      { text: 'Bỏ qua', style: 'cancel' }
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      {/* Header */}
      <View className="bg-white px-4 py-3.5 border-b border-slate-100 flex-row items-center">
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-10 h-10 items-center justify-center rounded-full bg-slate-50 border border-slate-100 mr-3"
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={22} color="#475569" />
        </TouchableOpacity>
        <Text className="text-xl font-black text-slate-800 tracking-tight flex-1">Hoạt động đặt món</Text>
      </View>

      {/* Segmented Top Tabs */}
      <View className="flex-row bg-white border-b border-slate-100">
        <TouchableOpacity 
          className="flex-1 py-3.5 items-center justify-center relative"
          onPress={() => setActiveTab('ongoing')}
          activeOpacity={0.7}
        >
          <View className="flex-row items-center gap-1.5">
            <Text className={`text-[13px] font-bold ${activeTab === 'ongoing' ? 'text-[#00b4d8]' : 'text-slate-500'}`}>
              Đang giao
            </Text>
            {ongoingOrders.length > 0 && (
              <View className="bg-[#6ed6f2] rounded-full w-4 h-4 items-center justify-center">
                <Text className="text-white text-[8px] font-bold">{ongoingOrders.length}</Text>
              </View>
            )}
          </View>
          {activeTab === 'ongoing' && (
            <View className="absolute bottom-0 left-6 right-6 h-[3px] bg-[#6ed6f2] rounded-t-full shadow-sm shadow-cyan-200" />
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-1 py-3.5 items-center justify-center relative"
          onPress={() => setActiveTab('history')}
          activeOpacity={0.7}
        >
          <Text className={`text-[13px] font-bold ${activeTab === 'history' ? 'text-[#00b4d8]' : 'text-slate-500'}`}>
            Lịch sử đơn
          </Text>
          {activeTab === 'history' && (
            <View className="absolute bottom-0 left-6 right-6 h-[3px] bg-[#6ed6f2] rounded-t-full shadow-sm shadow-cyan-200" />
          )}
        </TouchableOpacity>
      </View>

      {/* List content */}
      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {activeTab === 'ongoing' ? (
          ongoingOrders.length > 0 ? (
            ongoingOrders.map(order => (
              <View key={order.id} className="bg-white rounded-2xl p-4 mb-4 border border-slate-100 shadow-sm">
                {/* Store Header */}
                <View className="flex-row justify-between items-center mb-3 border-b border-slate-100 pb-3">
                  <View className="flex-row items-center flex-1 pr-2">
                    <View className="w-6 h-6 rounded-full bg-sky-50 items-center justify-center">
                      <MaterialIcons name="delivery-dining" size={14} color="#0284c7" />
                    </View>
                    <Text className="ml-2 font-bold text-slate-800 text-sm flex-1" numberOfLines={1}>
                      {order.shopName}
                    </Text>
                  </View>
                  <Text className="text-[10px] text-slate-400 font-bold">{order.date}</Text>
                </View>

                {/* Items List */}
                <View className="flex-row mb-4">
                  <View className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden mr-3">
                    <Image source={{ uri: order.shopImage }} className="w-full h-full" resizeMode="cover" />
                  </View>
                  
                  <View className="flex-1 justify-between">
                    <View>
                      {order.items.map((item, idx) => (
                        <Text key={idx} className="text-slate-600 text-xs font-medium" numberOfLines={1}>
                          {item.quantity}x {item.name}
                        </Text>
                      ))}
                    </View>
                    
                    <View className="flex-row justify-between items-center mt-2">
                      <View className="px-2 py-0.5 rounded border" style={{ backgroundColor: order.statusBg, borderColor: order.statusColor + '30' }}>
                        <Text className="text-[10px] font-black" style={{ color: order.statusColor }}>{order.statusText}</Text>
                      </View>
                      <Text className="font-black text-slate-800 text-sm">{order.totalPrice.toLocaleString('vi-VN')}đ</Text>
                    </View>
                  </View>
                </View>

                {/* Tracking / Action Buttons */}
                <View className="flex-row gap-3">
                  <TouchableOpacity 
                    className="flex-1 bg-slate-50 border border-slate-200 py-2.5 rounded-full items-center"
                    onPress={() => handleCancelOrder(order.id)}
                    activeOpacity={0.7}
                  >
                    <Text className="font-bold text-slate-500 text-xs">Hủy đơn</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    className="flex-1 bg-[#6ed6f2] py-2.5 rounded-full items-center shadow-sm shadow-cyan-200"
                    onPress={() => router.push('/map')}
                    activeOpacity={0.7}
                  >
                    <Text className="font-bold text-white text-xs">Xem bản đồ tài xế</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <EmptyState 
              title="Không có đơn hàng nào đang giao" 
              desc="Hãy thử đặt những món ăn ngon lành tại các cửa hàng yêu thích nhé!" 
              buttonText="Đặt món ngay"
              onPress={() => router.push('/')}
            />
          )
        ) : (
          pastOrders.length > 0 ? (
            pastOrders.map(order => (
              <View key={order.id} className="bg-white rounded-2xl p-4 mb-3 border border-slate-100 shadow-sm">
                {/* Store Header */}
                <View className="flex-row justify-between items-center mb-3 border-b border-slate-100 pb-3">
                  <View className="flex-row items-center flex-1 pr-2">
                    <View className="w-6 h-6 rounded-full bg-slate-50 items-center justify-center">
                      <MaterialIcons 
                        name={order.status === 'completed' ? 'check-circle' : 'cancel'} 
                        size={14} 
                        color={order.status === 'completed' ? '#16a34a' : '#dc2626'} 
                      />
                    </View>
                    <Text className="ml-2 font-bold text-slate-800 text-sm flex-1" numberOfLines={1}>
                      {order.shopName}
                    </Text>
                  </View>
                  <Text className="text-[10px] text-slate-400 font-bold">{order.date}</Text>
                </View>

                {/* Items List */}
                <View className="flex-row mb-4">
                  <View className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden mr-3">
                    <Image source={{ uri: order.shopImage }} className="w-full h-full" resizeMode="cover" />
                  </View>
                  
                  <View className="flex-1 justify-between">
                    <View>
                      {order.items.map((item, idx) => (
                        <Text key={idx} className="text-slate-500 text-xs font-medium" numberOfLines={1}>
                          {item.quantity}x {item.name}
                        </Text>
                      ))}
                    </View>
                    
                    <View className="flex-row justify-between items-center mt-2">
                      <View className="px-2 py-0.5 rounded border" style={{ backgroundColor: order.statusBg, borderColor: order.statusColor + '30' }}>
                        <Text className="text-[10px] font-black" style={{ color: order.statusColor }}>{order.statusText}</Text>
                      </View>
                      <Text className="font-black text-slate-800 text-sm">{order.totalPrice.toLocaleString('vi-VN')}đ</Text>
                    </View>
                  </View>
                </View>

                {/* Re-order & Review buttons */}
                <View className="flex-row gap-3">
                  {order.status === 'completed' && (
                    <TouchableOpacity 
                      className="flex-1 bg-slate-50 border border-slate-200 py-2.5 rounded-full items-center"
                      onPress={() => handleRateOrder(order)}
                      activeOpacity={0.7}
                    >
                      <Text className="font-bold text-slate-600 text-xs">Đánh giá đơn hàng</Text>
                    </TouchableOpacity>
                  )}
                  
                  <TouchableOpacity 
                    className="flex-1 bg-[#e0f2fe] border border-[#bae6fd] py-2.5 rounded-full items-center"
                    onPress={() => handleReorder(order)}
                    activeOpacity={0.7}
                  >
                    <Text className="font-bold text-[#0284c7] text-xs">Đặt lại</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <EmptyState 
              title="Chưa có lịch sử đặt đơn" 
              desc="Lịch sử giao đồ ăn của bạn sẽ xuất hiện tại đây khi hoàn thành đơn đầu tiên." 
              buttonText="Đặt đơn đầu tiên"
              onPress={() => router.push('/')}
            />
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function EmptyState({ title, desc, buttonText, onPress }: { title: string; desc: string; buttonText: string; onPress: () => void }) {
  return (
    <View className="items-center justify-center py-20 px-6">
      <View className="w-24 h-24 bg-slate-100 rounded-full items-center justify-center mb-6">
        <MaterialIcons name="receipt-long" size={48} color="#CBD5E1" />
      </View>
      <Text className="text-base font-black text-slate-800 text-center mb-2">{title}</Text>
      <Text className="text-xs text-slate-500 text-center mb-8 leading-relaxed px-4">
        {desc}
      </Text>
      <TouchableOpacity 
        onPress={onPress}
        activeOpacity={0.8}
        className="bg-[#6ed6f2] px-8 py-3 rounded-full shadow-md shadow-cyan-200/50"
      >
        <Text className="text-white font-bold text-xs tracking-wide">{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}
