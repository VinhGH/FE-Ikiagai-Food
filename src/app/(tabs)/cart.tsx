import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore } from '../../store/cartStore';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function CartPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeFromCart, clearCart, getTotalPrice } = useCartStore();

  const handleCheckout = () => {
    Alert.alert(
      'Đặt hàng thành công',
      'Đơn hàng của bạn đang được chuẩn bị và sẽ giao đến trong thời gian sớm nhất!',
      [
        {
          text: 'Tuyệt vời',
          onPress: () => {
            clearCart();
            router.push('/(tabs)');
          },
        },
      ]
    );
  };

  const totalPrice = getTotalPrice();

  if (cartItems.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
        <View className="flex-1 justify-center items-center px-6">
          <View className="w-20 h-20 bg-primary-light rounded-full items-center justify-center mb-4 border border-primary/20">
            <MaterialIcons name="shopping-cart" size={40} color="#2D8A6B" />
          </View>
          <Text className="text-xl font-black text-on-surface mb-2">Giỏ hàng của bạn đang trống</Text>
          <Text className="text-sm text-on-surface-variant text-center mb-6 leading-relaxed">
            Có vẻ bạn chưa thêm món ăn nào vào giỏ hàng. Hãy lấp đầy dạ dày của bạn bằng những món ngon ngay nhé!
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(tabs)')}
            className="bg-primary-dark px-8 py-3.5 rounded-full shadow-sm"
            activeOpacity={0.8}
          >
            <Text className="text-white font-extrabold text-sm">Khám phá món ngon ngay</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top', 'left', 'right']}>
      {/* Title Header */}
      <View className="px-4 py-3 bg-white flex-row justify-between items-center border-b border-outline-variant/30">
        <Text className="text-lg font-black text-on-surface">Giỏ hàng của bạn</Text>
        <TouchableOpacity
          onPress={() => {
            Alert.alert('Xác nhận', 'Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?', [
              { text: 'Hủy', style: 'cancel' },
              { text: 'Xóa sạch', style: 'destructive', onPress: clearCart },
            ]);
          }}
          className="flex-row items-center p-1"
        >
          <MaterialIcons name="delete-sweep" size={18} color="#EF4444" />
          <Text className="text-xs text-red-500 font-bold ml-0.5">Xóa tất cả</Text>
        </TouchableOpacity>
      </View>

      {/* Cart List */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 160 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const itemSinglePrice = item.food.price + item.selectedToppings.reduce((acc, t) => acc + t.price, 0);

          return (
            <View className="bg-white rounded-2xl p-4 flex-row items-center border border-outline-variant/30 shadow-sm">
              {/* Image */}
              <Image
                source={{ uri: item.food.image }}
                className="w-16 h-16 rounded-xl bg-gray-100 mr-4"
                resizeMode="cover"
              />

              {/* Info */}
              <View className="flex-1 gap-1">
                <Text className="text-base font-extrabold text-on-surface" numberOfLines={1}>
                  {item.food.name}
                </Text>
                
                <Text className="text-sm font-bold text-primary-dark">
                  {itemSinglePrice.toLocaleString('vi-VN')}đ
                </Text>

                {/* Toppings list */}
                {item.selectedToppings && item.selectedToppings.length > 0 && (
                  <View className="flex-row flex-wrap gap-1 mt-0.5 mb-1">
                    {item.selectedToppings.map((t) => (
                      <View key={t.id} className="bg-surface-container-low px-1.5 py-0.5 rounded border border-outline-variant/30">
                        <Text className="text-[10px] text-on-surface-variant font-medium">
                          +{t.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                {item.notes ? (
                  <Text className="text-xs text-on-surface-variant italic" numberOfLines={1}>
                    Ghi chú: {item.notes}
                  </Text>
                ) : null}
              </View>

              {/* Controls */}
              <View className="items-end gap-2.5">
                {/* Trash button */}
                <TouchableOpacity
                  onPress={() => removeFromCart(item.id)}
                  className="p-1 rounded-full bg-red-50 border border-red-100"
                >
                  <MaterialIcons name="delete-outline" size={16} color="#EF4444" />
                </TouchableOpacity>

                {/* Quantity selectors */}
                <View className="flex-row items-center bg-background rounded-full border border-outline-variant/40 px-1 py-0.5">
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-full bg-white items-center justify-center border border-outline-variant/60"
                  >
                    <MaterialIcons name="remove" size={12} color="#2D8A6B" />
                  </TouchableOpacity>
                  <Text className="text-xs font-extrabold text-on-surface px-2.5 min-w-[20px] text-center">
                    {item.quantity}
                  </Text>
                  <TouchableOpacity
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-full bg-primary-dark items-center justify-center"
                  >
                    <MaterialIcons name="add" size={12} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />

      {/* Checkout Summary Container */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-outline-variant/50 px-5 pt-4 pb-8 shadow-lg">
        {/* Cost Summary rows */}
        <View className="gap-2 mb-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-xs text-on-surface-variant">Tạm tính</Text>
            <Text className="text-xs text-on-surface font-semibold">{totalPrice.toLocaleString('vi-VN')}đ</Text>
          </View>
          <View className="flex-row justify-between items-center">
            <Text className="text-xs text-on-surface-variant">Phí giao hàng</Text>
            <Text className="text-xs text-green-600 font-bold">Miễn phí</Text>
          </View>
          <View className="h-[1px] bg-outline-variant/40 my-1" />
          <View className="flex-row justify-between items-center">
            <Text className="text-sm font-bold text-on-surface">Tổng cộng</Text>
            <Text className="text-base font-black text-primary-dark">{totalPrice.toLocaleString('vi-VN')}đ</Text>
          </View>
        </View>

        {/* Checkout Button */}
        <TouchableOpacity
          onPress={handleCheckout}
          className="bg-primary-dark h-12 rounded-full flex-row items-center justify-center shadow-md"
          activeOpacity={0.8}
        >
          <Text className="text-white font-extrabold text-sm">
            Đặt hàng ngay • {totalPrice.toLocaleString('vi-VN')}đ
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
