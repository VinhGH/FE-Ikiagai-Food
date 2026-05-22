import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert, ActivityIndicator, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useCartStore } from '../../store/cartStore';
import { useOrderStore } from '../../store/orderStore';
import { usePaymentStore } from '../../store/paymentStore';
import { useMessageStore } from '../../store/messageStore';
import { MOCK_SHOPS } from '../../features/food/api/foodApi';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCartStore();
  const { addOrder } = useOrderStore();
  const { selectedMethod, egreenBalance, deductEGreen, addTransaction, paymentMethods } = usePaymentStore();
  const { addMessage } = useMessageStore();

  const [isOrdering, setIsOrdering] = useState(false);
  const [driverNote, setDriverNote] = useState('Gửi xe bảo vệ, đi thang máy lên tầng 3. Gọi điện khi tới.');
  const [selectedVoucher, setSelectedVoucher] = useState<'FREESHIP' | 'IKIGAIFOOD' | 'IKIGAI50' | null>(null);

  const subtotal = getTotalPrice();

  // Find merchant details based on items in the cart
  const activeShopId = cartItems.length > 0 ? cartItems[0].food.shopId : null;
  const shop = MOCK_SHOPS.find((s) => s.id === activeShopId) || {
    name: 'Cửa hàng Ikigai Food',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=200&auto=format&fit=crop',
    address: 'Hà Nội, Việt Nam'
  };

  const deliveryFee = 15000;
  const platformFee = 2000;

  // Calculate voucher discounts
  let voucherDiscount = 0;
  if (selectedVoucher === 'FREESHIP') {
    voucherDiscount = deliveryFee;
  } else if (selectedVoucher === 'IKIGAI50') {
    voucherDiscount = Math.round(deliveryFee * 0.5);
  } else if (selectedVoucher === 'IKIGAIFOOD') {
    if (subtotal >= 100000) {
      voucherDiscount = 25000;
    }
  }

  const finalTotal = Math.max(0, subtotal + deliveryFee + platformFee - voucherDiscount);

  const currentPayment = paymentMethods.find(m => m.id === selectedMethod) || {
    id: 'cash',
    name: 'Tiền mặt khi nhận hàng (COD)',
    type: 'other' as const,
    icon: 'money',
    detail: ''
  };

  const handleApplyVoucher = (code: 'FREESHIP' | 'IKIGAIFOOD' | 'IKIGAI50') => {
    if (selectedVoucher === code) {
      // Toggle off
      setSelectedVoucher(null);
      return;
    }

    if (code === 'IKIGAIFOOD' && subtotal < 100000) {
      Alert.alert(
        'Không đủ điều kiện',
        'Mã IKIGAIFOOD chỉ áp dụng cho đơn hàng từ 100.000đ trở lên. Vui lòng chọn món thêm!'
      );
      return;
    }

    setSelectedVoucher(code);
  };

  const handleDecreaseQuantity = (itemId: string, currentQty: number) => {
    if (currentQty === 1) {
      Alert.alert(
        'Xóa món ăn',
        'Bạn có muốn xóa món ăn này khỏi giỏ hàng không?',
        [
          { text: 'Bỏ qua', style: 'cancel' },
          { 
            text: 'Đồng ý xóa', 
            style: 'destructive', 
            onPress: () => removeFromCart(itemId) 
          }
        ]
      );
    } else {
      updateQuantity(itemId, currentQty - 1);
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    // Check E-Green balance
    if (selectedMethod === 'egreen') {
      if (egreenBalance < finalTotal) {
        Alert.alert(
          'Số dư không đủ',
          `Số dư Thẻ E-Green của bạn (${egreenBalance.toLocaleString('vi-VN')}đ) không đủ để thanh toán đơn hàng này (${finalTotal.toLocaleString('vi-VN')}đ). Vui lòng nạp thêm tiền!`,
          [
            { text: 'Bỏ qua', style: 'cancel' },
            { 
              text: 'Nạp tiền ngay', 
              onPress: () => router.push('/payment/methods' as any) 
            }
          ]
        );
        return;
      }
    }

    setIsOrdering(true);

    // Simulate ordering network process
    setTimeout(() => {
      // Deduct from E-Green or record transaction
      if (selectedMethod === 'egreen') {
        deductEGreen(finalTotal);
      } else {
        // Record payment transaction for other methods
        addTransaction(
          `Thanh toán đơn hàng - ${shop.name}`,
          -finalTotal,
          'payment',
          selectedMethod
        );
      }

      // Prepare items list for orderStore
      const orderItems = cartItems.map((item) => {
        let nameWithToppings = item.food.name;
        if (item.selectedToppings.length > 0) {
          const toppingsStr = item.selectedToppings.map(t => t.name).join(', ');
          nameWithToppings += ` (${toppingsStr})`;
        }
        if (item.notes) {
          nameWithToppings += ` - Ghi chú: ${item.notes}`;
        }
        return {
          name: nameWithToppings,
          quantity: item.quantity
        };
      });

      // Add to global ongoing orders
      addOrder(shop.name, shop.image, orderItems, finalTotal);

      // Trigger dynamic messages in app
      // Send message from Restaurant (chat id: '2')
      addMessage('2', `Cửa hàng đã nhận được đơn hàng của bạn trị giá ${finalTotal.toLocaleString('vi-VN')}đ. Chúng tôi đang chuẩn bị chế biến.`);
      
      // Send message from Shipper (chat id: '1')
      addMessage('1', `Tôi nhận đơn giao từ cửa hàng ${shop.name}. Đơn đã thanh toán qua ${currentPayment.name}. Tôi đang đi lấy món.`);

      // Clear local cart
      clearCart();
      setIsOrdering(false);

      Alert.alert(
        'Đặt đơn thành công!',
        'Đơn hàng của bạn đã được tiếp nhận và tài xế đang chuẩn bị đi giao.',
        [
          {
            text: 'Theo dõi đơn hàng',
            onPress: () => {
              router.push('/(tabs)/activity' as any);
            }
          }
        ]
      );
    }, 1500);
  };

  // If cart is empty
  if (cartItems.length === 0) {
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
          <Text className="text-xl font-black text-slate-800 tracking-tight flex-1">Giỏ hàng</Text>
        </View>

        {/* Empty state */}
        <View className="flex-1 justify-center items-center px-6">
          <View className="w-24 h-24 bg-teal-50 rounded-full items-center justify-center mb-6 border border-teal-100">
            <MaterialIcons name="shopping-cart" size={48} color="#0d9488" />
          </View>
          <Text className="text-lg font-black text-slate-800 text-center mb-2">Giỏ hàng của bạn đang trống</Text>
          <Text className="text-xs text-slate-500 text-center mb-8 leading-relaxed px-4">
            Có vẻ bạn chưa thêm món ăn nào vào giỏ hàng. Hãy lấp đầy dạ dày của bạn bằng những món ngon ngay nhé!
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/')}
            className="bg-[#0d9488] px-8 py-3 rounded-full shadow-md shadow-teal-700/20"
            activeOpacity={0.8}
          >
            <Text className="text-white font-bold text-xs tracking-wide">Khám phá món ngon ngay</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      {/* Header */}
      <View className="bg-white px-4 py-3.5 border-b border-slate-100 flex-row justify-between items-center">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-10 h-10 items-center justify-center rounded-full bg-slate-50 border border-slate-100 mr-3"
            activeOpacity={0.7}
          >
            <MaterialIcons name="arrow-back" size={22} color="#475569" />
          </TouchableOpacity>
          <Text className="text-xl font-black text-slate-800 tracking-tight">Thanh toán</Text>
        </View>
        
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?', [
              { text: 'Hủy', style: 'cancel' },
              { text: 'Xóa sạch', style: 'destructive', onPress: clearCart },
            ]);
          }}
          className="flex-row items-center bg-red-50 border border-red-100 px-3 py-1.5 rounded-full"
          activeOpacity={0.7}
        >
          <MaterialIcons name="delete-sweep" size={16} color="#ef4444" />
          <Text className="text-[10px] text-red-500 font-extrabold ml-1">Xóa tất cả</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1" contentContainerStyle={{ padding: 16, paddingBottom: 160 }} showsVerticalScrollIndicator={false}>
        {/* 1. Delivery Address Block */}
        <View className="bg-white rounded-2xl p-4 mb-4 border border-slate-100 shadow-sm">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center">
              <View className="w-8 h-8 rounded-full bg-sky-50 items-center justify-center mr-2.5">
                <MaterialIcons name="location-on" size={18} color="#0284c7" />
              </View>
              <View>
                <Text className="text-xs font-black text-slate-800">Giao đến • Nhà riêng</Text>
                <Text className="text-[10px] text-slate-400 font-bold mt-0.5">Thời gian giao: 20 - 30 phút</Text>
              </View>
            </View>
            <TouchableOpacity className="bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
              <Text className="text-[10px] text-slate-600 font-bold">Thay đổi</Text>
            </TouchableOpacity>
          </View>
          
          <Text className="text-slate-700 text-xs font-semibold leading-relaxed mb-3 pr-2">
            36 Cát Linh, Cát Linh, Đống Đa, Hà Nội
          </Text>

          {/* Driver Notes input box */}
          <View className="bg-slate-50 rounded-xl p-2.5 flex-row items-center border border-slate-100">
            <MaterialIcons name="directions-bike" size={16} color="#64748B" className="mr-2" />
            <TextInput
              value={driverNote}
              onChangeText={setDriverNote}
              placeholder="Ghi chú cho tài xế giao hàng..."
              className="flex-1 text-[11px] text-slate-600 font-medium p-0"
              style={{ includeFontPadding: false }}
            />
          </View>
        </View>

        {/* 2. Restaurant Merchant details */}
        <View className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-4">
          <View className="bg-slate-50 px-4 py-3 flex-row items-center border-b border-slate-100">
            <Image source={{ uri: shop.image }} className="w-6 h-6 rounded-full mr-2.5" />
            <View className="flex-1">
              <Text className="text-xs font-black text-slate-800" numberOfLines={1}>{shop.name}</Text>
              <Text className="text-[9px] text-slate-400 font-bold mt-0.5" numberOfLines={1}>{shop.address}</Text>
            </View>
            <View className="bg-[#6ed6f2]/10 border border-[#6ed6f2]/30 px-2 py-0.5 rounded">
              <Text className="text-[9px] text-[#00b4d8] font-bold">Cửa hàng đang chọn</Text>
            </View>
          </View>

          {/* Cart items list */}
          <View className="p-4 gap-4">
            {cartItems.map((item) => {
              const itemSinglePrice = item.food.price + item.selectedToppings.reduce((acc, t) => acc + t.price, 0);
              const itemTotalPrice = itemSinglePrice * item.quantity;

              return (
                <View key={item.id} className="flex-row items-start border-b border-slate-50 pb-4 last:border-b-0 last:pb-0">
                  {/* Food Image */}
                  <Image source={{ uri: item.food.image }} className="w-14 h-14 rounded-xl bg-slate-50 mr-3" resizeMode="cover" />

                  {/* Food details */}
                  <View className="flex-1">
                    <Text className="text-xs font-black text-slate-800 pr-1 leading-snug" numberOfLines={2}>
                      {item.food.name}
                    </Text>
                    
                    {/* Toppings list */}
                    {item.selectedToppings.length > 0 && (
                      <View className="flex-row flex-wrap gap-1 mt-1">
                        {item.selectedToppings.map((t) => (
                          <Text key={t.id} className="text-[9px] text-slate-400 font-bold bg-slate-50 border border-slate-100 rounded px-1 py-0.5">
                            +{t.name} (+{t.price.toLocaleString('vi-VN')}đ)
                          </Text>
                        ))}
                      </View>
                    )}

                    {/* Individual food note */}
                    {item.notes ? (
                      <Text className="text-[10px] text-slate-400 italic mt-1 leading-none">
                        Ghi chú: {item.notes}
                      </Text>
                    ) : null}

                    {/* Price calculation */}
                    <Text className="text-xs font-black text-slate-800 mt-1.5">
                      {itemTotalPrice.toLocaleString('vi-VN')}đ
                    </Text>
                  </View>

                  {/* Quantity control */}
                  <View className="items-end justify-between h-14">
                    <TouchableOpacity
                      onPress={() => removeFromCart(item.id)}
                      className="p-1 rounded-full bg-slate-50 border border-slate-100"
                      activeOpacity={0.7}
                    >
                      <MaterialIcons name="close" size={12} color="#94A3B8" />
                    </TouchableOpacity>

                    {/* Sleek compact controller */}
                    <View className="flex-row items-center bg-slate-50 rounded-full border border-slate-200/55 p-0.5">
                      <TouchableOpacity
                        onPress={() => handleDecreaseQuantity(item.id, item.quantity)}
                        className="w-5 h-5 rounded-full bg-white items-center justify-center border border-slate-200"
                        activeOpacity={0.7}
                      >
                        <MaterialIcons name="remove" size={10} color="#475569" />
                      </TouchableOpacity>
                      <Text className="text-[11px] font-black text-slate-800 px-2 min-w-[22px] text-center">
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-5 h-5 rounded-full bg-[#6ed6f2] items-center justify-center"
                        activeOpacity={0.7}
                      >
                        <MaterialIcons name="add" size={10} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* 3. Promo Voucher selection */}
        <View className="bg-white rounded-2xl p-4 mb-4 border border-slate-100 shadow-sm">
          <View className="flex-row items-center mb-3">
            <View className="w-8 h-8 rounded-full bg-orange-50 items-center justify-center mr-2.5">
              <MaterialIcons name="confirmation-number" size={18} color="#f97316" />
            </View>
            <View className="flex-1">
              <Text className="text-xs font-black text-slate-800">Ưu đãi khuyến mại</Text>
              <Text className="text-[10px] text-slate-400 font-bold mt-0.5">Áp dụng voucher để nhận ưu đãi</Text>
            </View>
            {selectedVoucher && (
              <View className="bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                <Text className="text-[9px] text-[#16a34a] font-black uppercase">Đang áp dụng</Text>
              </View>
            )}
          </View>

          {/* Horizontal grid of vouchers */}
          <View className="flex-row gap-2 mt-1">
            {/* Voucher 1: FREESHIP */}
            <TouchableOpacity 
              onPress={() => handleApplyVoucher('FREESHIP')}
              className={`flex-1 border p-2.5 rounded-xl items-center justify-center ${selectedVoucher === 'FREESHIP' ? 'bg-sky-50/50 border-[#6ed6f2]' : 'bg-slate-50 border-slate-200'}`}
              activeOpacity={0.7}
            >
              <Text className="text-[10px] font-black text-slate-800">FREESHIP</Text>
              <Text className="text-[8px] text-slate-400 font-bold mt-1 text-center">Freeship tối đa 15k</Text>
            </TouchableOpacity>

            {/* Voucher 2: IKIGAIFOOD */}
            <TouchableOpacity 
              onPress={() => handleApplyVoucher('IKIGAIFOOD')}
              className={`flex-1 border p-2.5 rounded-xl items-center justify-center ${selectedVoucher === 'IKIGAIFOOD' ? 'bg-sky-50/50 border-[#6ed6f2]' : 'bg-slate-50 border-slate-200'}`}
              activeOpacity={0.7}
            >
              <Text className="text-[10px] font-black text-slate-800">IKIGAIFOOD</Text>
              <Text className="text-[8px] text-slate-400 font-bold mt-1 text-center">Giảm 25k cho đơn ≥100k</Text>
            </TouchableOpacity>

            {/* Voucher 3: IKIGAI50 */}
            <TouchableOpacity 
              onPress={() => handleApplyVoucher('IKIGAI50')}
              className={`flex-1 border p-2.5 rounded-xl items-center justify-center ${selectedVoucher === 'IKIGAI50' ? 'bg-sky-50/50 border-[#6ed6f2]' : 'bg-slate-50 border-slate-200'}`}
              activeOpacity={0.7}
            >
              <Text className="text-[10px] font-black text-slate-800">IKIGAI50</Text>
              <Text className="text-[8px] text-slate-400 font-bold mt-1 text-center">Giảm 50% ship (7.5k)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 4. Payment Method Selection */}
        <TouchableOpacity 
          onPress={() => router.push('/payment/methods' as any)}
          className="bg-white rounded-2xl p-4 mb-4 border border-slate-100 shadow-sm flex-row items-center justify-between"
          activeOpacity={0.7}
        >
          <View className="flex-row items-center flex-1 mr-2">
            <View className="w-8 h-8 rounded-full bg-cyan-50 items-center justify-center mr-2.5">
              <MaterialIcons 
                name={
                  currentPayment.icon === 'eco' || currentPayment.id === 'egreen' ? 'eco' :
                  currentPayment.icon === 'money' || currentPayment.id === 'cash' ? 'money' :
                  currentPayment.icon === 'credit-card' ? 'credit-card' : 'payment'
                } 
                size={18} 
                color="#00b4d8" 
              />
            </View>
            <View className="flex-1">
              <Text className="text-[10px] text-slate-400 font-bold">Phương thức thanh toán</Text>
              <Text className="text-xs font-black text-slate-800 mt-0.5">
                {currentPayment.name} {currentPayment.detail ? `(${currentPayment.detail})` : ''}
              </Text>
              {currentPayment.id === 'egreen' && (
                <Text className="text-[9px] text-teal-600 font-black mt-0.5">
                  Số dư ví: {egreenBalance.toLocaleString('vi-VN')}đ
                </Text>
              )}
            </View>
          </View>
          <View className="flex-row items-center">
            <Text className="text-[10px] text-[#00b4d8] font-black mr-1">Thay đổi</Text>
            <MaterialIcons name="chevron-right" size={16} color="#94A3B8" />
          </View>
        </TouchableOpacity>

        {/* 5. Cost Details Breakdown */}
        <View className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
          <Text className="text-xs font-black text-slate-800 mb-3.5">Chi tiết hóa đơn</Text>
          
          <View className="gap-2.5">
            <View className="flex-row justify-between items-center">
              <Text className="text-xs text-slate-500 font-bold">Tạm tính</Text>
              <Text className="text-xs text-slate-800 font-black">{subtotal.toLocaleString('vi-VN')}đ</Text>
            </View>
            
            <View className="flex-row justify-between items-center">
              <Text className="text-xs text-slate-500 font-bold">Phí giao hàng</Text>
              <View className="flex-row items-center">
                {(selectedVoucher === 'FREESHIP' || selectedVoucher === 'IKIGAI50') && (
                  <Text className="text-[10px] text-slate-400 font-bold line-through mr-1.5">
                    {deliveryFee.toLocaleString('vi-VN')}đ
                  </Text>
                )}
                <Text className="text-xs text-slate-800 font-black">
                  {(deliveryFee - (selectedVoucher === 'FREESHIP' ? deliveryFee : selectedVoucher === 'IKIGAI50' ? Math.round(deliveryFee * 0.5) : 0)).toLocaleString('vi-VN')}đ
                </Text>
              </View>
            </View>

            {selectedVoucher === 'IKIGAIFOOD' && (
              <View className="flex-row justify-between items-center">
                <Text className="text-xs text-slate-500 font-bold">Giảm giá voucher (IKIGAIFOOD)</Text>
                <Text className="text-xs text-red-500 font-black">-25.000đ</Text>
              </View>
            )}

            <View className="flex-row justify-between items-center">
              <Text className="text-xs text-slate-500 font-bold">Phí dịch vụ hệ thống</Text>
              <Text className="text-xs text-slate-800 font-black">{platformFee.toLocaleString('vi-VN')}đ</Text>
            </View>

            <View className="h-[1px] bg-slate-100 my-1" />

            <View className="flex-row justify-between items-center">
              <Text className="text-sm text-slate-800 font-black">Tổng thanh toán</Text>
              <Text className="text-lg text-[#00b4d8] font-black">{finalTotal.toLocaleString('vi-VN')}đ</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* 6. Checkout action footer container */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-5 pt-3.5 pb-8 shadow-lg flex-row items-center justify-between">
        <View>
          <Text className="text-[10px] text-slate-400 font-bold">Tổng số tiền</Text>
          <Text className="text-lg text-[#00b4d8] font-black mt-0.5">{finalTotal.toLocaleString('vi-VN')}đ</Text>
        </View>

        <TouchableOpacity
          onPress={handleCheckout}
          disabled={isOrdering}
          className={`px-8 py-3 rounded-full flex-row items-center justify-center shadow-md shadow-cyan-200/50 ${isOrdering ? 'bg-slate-300' : 'bg-[#6ed6f2]'}`}
          activeOpacity={0.8}
          style={{ width: '60%' }}
        >
          {isOrdering ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text className="text-white font-extrabold text-xs tracking-wider uppercase">
              Đặt đơn ngay
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
