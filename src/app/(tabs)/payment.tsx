import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { usePaymentStore } from '../../store/paymentStore';
import { useRouter } from 'expo-router';

export default function PaymentScreen() {
  const router = useRouter();
  const { egreenBalance, transactions, depositEGreen } = usePaymentStore();

  const [isDepositVisible, setIsDepositVisible] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

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
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-slate-100 flex-row justify-between items-center">
        <Text className="text-2xl font-black text-slate-800 tracking-tight">Ví & Thanh toán</Text>
        <TouchableOpacity
          onPress={() => router.push('/payment/methods')}
          className="bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-full flex-row items-center"
          activeOpacity={0.7}
        >
          <MaterialIcons name="credit-card" size={14} color="#00b4d8" />
          <Text className="text-[10px] text-[#00b4d8] font-black ml-1">Đổi phương thức</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
        {/* Premium E-Green Card Display */}
        <View className="bg-gradient-to-br from-[#00b4d8] to-[#0d9488] rounded-3xl p-6 shadow-lg shadow-teal-500/20 mb-6 relative overflow-hidden bg-[#0d9488]">
          {/* Decorative shapes inside card */}
          <View className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full" />
          <View className="absolute -left-6 -top-6 w-24 h-24 bg-white/5 rounded-full" />
          
          <View className="flex-row justify-between items-start mb-6 z-10">
            <View>
              <Text className="text-[10px] text-teal-100 font-extrabold uppercase tracking-widest">Thẻ Thành Viên</Text>
              <Text className="text-lg font-black text-white mt-0.5">E-Green Card</Text>
            </View>
            <View className="w-10 h-10 rounded-2xl bg-white/20 items-center justify-center">
              <MaterialIcons name="eco" size={24} color="white" />
            </View>
          </View>

          <View className="mb-6 z-10">
            <Text className="text-[10px] text-teal-100 font-bold">Số dư khả dụng</Text>
            <Text className="text-3xl font-black text-white mt-1">
              {egreenBalance.toLocaleString('vi-VN')}đ
            </Text>
          </View>

          <View className="flex-row justify-between items-center z-10">
            <Text className="text-[11px] text-teal-100/80 font-mono tracking-widest">**** **** **** 8888</Text>
            <TouchableOpacity 
              onPress={() => setIsDepositVisible(true)}
              className="bg-white px-4 py-2 rounded-xl flex-row items-center shadow-sm"
              activeOpacity={0.9}
            >
              <MaterialIcons name="add-circle" size={14} color="#0d9488" />
              <Text className="text-[11px] text-[#0d9488] font-black ml-1">Nạp tiền</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Transactions List */}
        <Text className="text-sm font-black text-slate-800 mb-3 px-1">Lịch sử hoạt động</Text>

        {transactions.length === 0 ? (
          <View className="bg-white rounded-2xl border border-slate-100 p-8 items-center justify-center">
            <View className="w-16 h-16 bg-slate-50 rounded-2xl items-center justify-center mb-4 border border-slate-100">
              <MaterialIcons name="receipt" size={32} color="#94A3B8" />
            </View>
            <Text className="text-sm font-black text-slate-700">Chưa có giao dịch nào</Text>
            <Text className="text-[11px] text-slate-400 mt-1 text-center leading-relaxed max-w-[200px]">
              Các giao dịch nạp tiền và mua hàng sẽ xuất hiện tại đây.
            </Text>
          </View>
        ) : (
          <View className="bg-white rounded-2xl border border-slate-100 p-1 mb-10">
            {transactions.map((tx, idx) => {
              const isDeposit = tx.type === 'deposit';
              
              // Map method string to readable tag
              let methodTag = '';
              if (tx.paymentMethod === 'egreen') methodTag = 'E-Green';
              else if (tx.paymentMethod === 'cash') methodTag = 'Tiền mặt';
              else if (tx.paymentMethod === 'shopeepay') methodTag = 'ShopeePay';
              else if (tx.paymentMethod === 'zalopay') methodTag = 'Zalopay';
              else if (tx.paymentMethod === 'momo') methodTag = 'MoMo';
              else if (tx.paymentMethod === 'card') methodTag = 'Thẻ Visa/MC';

              return (
                <View 
                  key={tx.id} 
                  className={`flex-row items-center p-3.5 ${idx !== transactions.length - 1 ? 'border-b border-slate-50' : ''}`}
                >
                  <View className={`w-9 h-9 rounded-full items-center justify-center mr-3 ${isDeposit ? 'bg-emerald-50 border border-emerald-100' : 'bg-rose-50 border border-rose-100'}`}>
                    <MaterialIcons 
                      name={isDeposit ? 'add' : 'shopping-bag'} 
                      size={18} 
                      color={isDeposit ? '#10b981' : '#f43f5e'} 
                    />
                  </View>

                  <View className="flex-1 mr-2">
                    <Text className="text-xs font-black text-slate-800" numberOfLines={1}>
                      {tx.title}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Text className="text-[9px] text-slate-400 font-bold">{tx.date}</Text>
                      <View className="w-1 h-1 bg-slate-300 rounded-full mx-1.5" />
                      <Text className="text-[9px] text-slate-400 font-extrabold">{methodTag}</Text>
                    </View>
                  </View>

                  <Text className={`text-xs font-black ${isDeposit ? 'text-emerald-600' : 'text-slate-800'}`}>
                    {isDeposit ? '+' : ''}{tx.amount.toLocaleString('vi-VN')}đ
                  </Text>
                </View>
              );
            })}
          </View>
        )}
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
