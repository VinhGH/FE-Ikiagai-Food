import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { usePaymentStore } from '../../store/paymentStore';

export default function PaymentMethodsScreen() {
  const router = useRouter();
  const { paymentMethods, selectedMethod, egreenBalance, selectMethod, depositEGreen } = usePaymentStore();

  const [isDepositVisible, setIsDepositVisible] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  const handleSelect = (id: string) => {
    selectMethod(id);
    Alert.alert('Thành công', 'Đã thay đổi phương thức thanh toán thành mặc định.', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  const handleDeposit = () => {
    const amount = parseInt(depositAmount.replace(/[^0-9]/g, ''), 10);
    if (isNaN(amount) || amount <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập số tiền hợp lệ.');
      return;
    }
    depositEGreen(amount);
    setIsDepositVisible(false);
    setDepositAmount('');
    Alert.alert('Thành công', `Đã nạp thành công ${amount.toLocaleString('vi-VN')}đ vào Thẻ E-Green!`);
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      {/* Custom Header */}
      <View className="px-4 py-3 border-b border-slate-100 flex-row justify-between items-center bg-white">
        <View className="flex-row items-center flex-1 mr-4">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-9 h-9 items-center justify-center rounded-full bg-slate-50 border border-slate-100 mr-2.5 shrink-0"
            activeOpacity={0.7}
          >
            <MaterialIcons name="arrow-back" size={20} color="#1E293B" />
          </TouchableOpacity>
          <Text 
            className="text-base font-black text-slate-800 tracking-tight flex-1 py-1" 
            numberOfLines={1}
            style={{ includeFontPadding: false, lineHeight: 22 }}
          >
            Phương thức thanh toán
          </Text>
        </View>

        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/payment')}
          className="px-2.5 py-1 rounded-full shrink-0 bg-sky-50 border border-sky-100/50"
          activeOpacity={0.7}
        >
          <Text 
            className="text-xs font-black text-[#00b4d8] py-0.5"
            style={{ includeFontPadding: false, lineHeight: 18 }}
          >
            Lịch sử
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
        {/* Section: Ví điện tử */}
        <Text className="text-sm font-black text-slate-800 mb-3">Ví điện tử</Text>
        
        <View className="bg-slate-50/50 rounded-2xl border border-slate-100 p-2.5 mb-6">
          {/* ShopeePay */}
          <TouchableOpacity
            onPress={() => handleSelect('shopeepay')}
            className={`flex-row items-center justify-between p-3.5 rounded-xl bg-white border ${selectedMethod === 'shopeepay' ? 'border-[#6ed6f2] bg-sky-50/10' : 'border-slate-100/60'} mb-2.5`}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-8 h-8 rounded-lg bg-orange-100 items-center justify-center mr-3">
                <Text className="text-orange-600 font-extrabold text-xs">S</Text>
              </View>
              <Text className="text-sm font-bold text-slate-700">ShopeePay **4751</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>

          {/* Zalopay */}
          <TouchableOpacity
            onPress={() => handleSelect('zalopay')}
            className={`flex-row items-center justify-between p-3.5 rounded-xl bg-white border ${selectedMethod === 'zalopay' ? 'border-[#6ed6f2] bg-sky-50/10' : 'border-slate-100/60'}`}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-8 h-8 rounded-lg bg-blue-100 items-center justify-center mr-3">
                <Text className="text-blue-600 font-extrabold text-[10px]">Zalo</Text>
              </View>
              <Text className="text-sm font-bold text-slate-700">Zalopay **4751</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* Section: Phương thức khác */}
        <Text className="text-sm font-black text-slate-800 mb-3">Phương thức khác</Text>

        <View className="bg-slate-50/50 rounded-2xl border border-slate-100 p-2.5 mb-6">
          {/* Thẻ E-Green */}
          <TouchableOpacity
            onPress={() => handleSelect('egreen')}
            className={`flex-row items-center justify-between p-3.5 rounded-xl bg-white border ${selectedMethod === 'egreen' ? 'border-[#6ed6f2] bg-sky-50/10' : 'border-slate-100/60'} mb-2.5`}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center flex-1 mr-2">
              <View className="w-8 h-8 rounded-full bg-teal-50 items-center justify-center mr-3 border border-teal-100">
                <MaterialIcons name="eco" size={18} color="#0d9488" />
              </View>
              <View className="flex-1">
                <Text className="text-sm font-bold text-slate-700">Thẻ E-Green</Text>
                <Text className="text-[11px] text-slate-400 font-semibold mt-0.5">{egreenBalance.toLocaleString('vi-VN')}đ</Text>
              </View>
            </View>
            
            <TouchableOpacity 
              onPress={(e) => {
                e.stopPropagation(); // Ngăn chọn phương thức khi click Nạp tiền
                setIsDepositVisible(true);
              }}
              className="bg-[#00b4d8] px-4 py-1.5 rounded-lg"
              activeOpacity={0.8}
            >
              <Text className="text-white text-xs font-black">Nạp tiền</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          {/* COD Cash */}
          <TouchableOpacity
            onPress={() => handleSelect('cash')}
            className={`flex-row items-center justify-between p-3.5 rounded-xl bg-white border ${selectedMethod === 'cash' ? 'border-[#6ed6f2] bg-sky-50/10' : 'border-slate-100/60'} mb-2.5`}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-8 h-8 rounded-full bg-slate-100 items-center justify-center mr-3">
                <MaterialIcons name="money" size={18} color="#475569" />
              </View>
              <Text className="text-sm font-bold text-slate-700">Tiền mặt khi nhận hàng (COD)</Text>
            </View>
            {selectedMethod === 'cash' && <MaterialIcons name="check-circle" size={18} color="#00b4d8" />}
          </TouchableOpacity>

          {/* MoMo */}
          <TouchableOpacity
            onPress={() => handleSelect('momo')}
            className={`flex-row items-center justify-between p-3.5 rounded-xl bg-white border ${selectedMethod === 'momo' ? 'border-[#6ed6f2] bg-sky-50/10' : 'border-slate-100/60'} mb-2.5`}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-8 h-8 rounded-lg bg-pink-50 items-center justify-center mr-3">
                <Text className="text-pink-600 font-extrabold text-[10px]">MoMo</Text>
              </View>
              <Text className="text-sm font-bold text-slate-700">Ví MoMo</Text>
            </View>
            {selectedMethod === 'momo' && <MaterialIcons name="check-circle" size={18} color="#00b4d8" />}
          </TouchableOpacity>

          {/* Credit Card */}
          <TouchableOpacity
            onPress={() => handleSelect('card')}
            className={`flex-row items-center justify-between p-3.5 rounded-xl bg-white border ${selectedMethod === 'card' ? 'border-[#6ed6f2] bg-sky-50/10' : 'border-slate-100/60'}`}
            activeOpacity={0.7}
          >
            <View className="flex-row items-center flex-1">
              <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-3">
                <MaterialIcons name="credit-card" size={18} color="#2563EB" />
              </View>
              <Text className="text-sm font-bold text-slate-700">Thẻ Visa / Mastercard</Text>
            </View>
            {selectedMethod === 'card' && <MaterialIcons name="check-circle" size={18} color="#00b4d8" />}
          </TouchableOpacity>
        </View>

        {/* Add Payment Method Button */}
        <TouchableOpacity
          onPress={() => Alert.alert('Tính năng', 'Tính năng liên kết thêm thẻ đang được phát triển.')}
          className="flex-row items-center justify-center py-4 rounded-xl border border-dashed border-slate-200"
          activeOpacity={0.7}
        >
          <MaterialIcons name="add" size={20} color="#00b4d8" />
          <Text className="text-sm font-extrabold text-[#00b4d8] ml-1">Thêm phương thức thanh toán</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Deposit Modal */}
      <Modal
        visible={isDepositVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDepositVisible(false)}
      >
        <View className="flex-1 bg-black/50 justify-center items-center px-6">
          <View className="bg-white rounded-3xl p-6 w-full max-w-sm">
            <Text className="text-lg font-black text-slate-800 mb-2">Nạp tiền vào Thẻ E-Green</Text>
            <Text className="text-xs text-slate-500 mb-4 leading-relaxed">
              Nhập số tiền bạn muốn nạp. Tiền nạp sẽ được cộng trực tiếp vào thẻ của bạn ngay tức thì.
            </Text>

            <TextInput
              value={depositAmount}
              onChangeText={setDepositAmount}
              placeholder="Nhập số tiền (ví dụ: 100000)"
              keyboardType="number-pad"
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 font-bold mb-5"
            />

            {/* Quick choices */}
            <View className="flex-row flex-wrap gap-2 mb-6">
              {[50000, 100000, 200000, 500000].map((val) => (
                <TouchableOpacity
                  key={val}
                  onPress={() => setDepositAmount(val.toString())}
                  className="bg-slate-100 border border-slate-200/50 rounded-lg px-3 py-1.5"
                  activeOpacity={0.7}
                >
                  <Text className="text-xs text-slate-600 font-bold">{val.toLocaleString('vi-VN')}đ</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => setIsDepositVisible(false)}
                className="flex-1 py-3 bg-slate-100 rounded-full items-center"
                activeOpacity={0.7}
              >
                <Text className="text-slate-600 font-extrabold text-xs">Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDeposit}
                className="flex-1 py-3 bg-[#00b4d8] rounded-full items-center"
                activeOpacity={0.7}
              >
                <Text className="text-white font-extrabold text-xs">Xác nhận</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
