import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '../../store/cartStore';

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCartStore();

  if (items.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-3xl mb-2">🛒</Text>
          <Text className="text-xl font-bold text-on-surface mb-1">Giỏ hàng</Text>
          <Text className="text-base text-on-surface-variant">Giỏ hàng của bạn đang trống</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12 }}
        renderItem={({ item }) => (
          <View className="bg-white rounded-lg border border-outline-variant p-4">
            <View className="flex-row justify-between gap-3">
              <View className="flex-1">
                <Text className="font-bold text-on-surface">{item.food.name}</Text>
                <Text className="text-primary-container font-semibold mt-1">
                  {item.food.price.toLocaleString('vi-VN')}đ
                </Text>
              </View>
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Text className="text-red-600">Xóa</Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center gap-4 mt-4">
              <TouchableOpacity
                className="w-9 h-9 rounded-full bg-surface-container-low items-center justify-center"
                onPress={() => updateQuantity(item.id, item.quantity - 1)}
              >
                <Text className="text-lg">-</Text>
              </TouchableOpacity>
              <Text className="font-bold">{item.quantity}</Text>
              <TouchableOpacity
                className="w-9 h-9 rounded-full bg-primary-container items-center justify-center"
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Text className="text-lg text-on-primary-container">+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={
          <View className="mt-4 bg-white rounded-lg border border-outline-variant p-4">
            <View className="flex-row justify-between">
              <Text className="font-bold text-on-surface">Tạm tính</Text>
              <Text className="font-bold text-primary-container">{subtotal().toLocaleString('vi-VN')}đ</Text>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
