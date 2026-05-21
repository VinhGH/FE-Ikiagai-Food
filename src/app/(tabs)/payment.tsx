import { View, Text, ScrollView } from 'react-native';
import { WalletHeader } from '../../features/wallet/components/WalletHeader';
import { TransactionEmptyState } from '../../features/wallet/components/TransactionEmptyState';

export default function PaymentScreen() {
  return (
    <View className="flex-1 bg-white">
      <WalletHeader />
      <ScrollView className="flex-1 bg-white rounded-t-3xl -mt-6 pt-6">
        <View className="px-6">
          <Text className="text-xl font-bold text-on-surface mb-4">Giao dịch gần đây</Text>
          <TransactionEmptyState />
        </View>
      </ScrollView>
    </View>
  );
}
