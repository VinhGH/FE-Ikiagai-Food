import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SearchBar } from '../../../components/ui/SearchBar';
import { useRouter } from 'expo-router';
import { useCartStore } from '../../../store/cartStore';

export function HomeHeader() {
  const router = useRouter();
  const cartItemsCount = useCartStore((state) => state.getTotalItemsCount());

  return (
    <View className="bg-primary-dark px-4 pt-12 pb-4 gap-3">
      {/* Top Address + Profile/Cart Row */}
      <View className="flex-row items-center justify-between">
        {/* Location selector */}
        <TouchableOpacity 
          className="flex-1 flex-row items-center gap-1.5"
          activeOpacity={0.8}
        >
          <View className="bg-white/10 rounded-full w-8 h-8 items-center justify-center">
            <MaterialIcons name="location-on" size={18} color="#6ed6f2" />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-0.5">
              <Text className="text-[10px] text-white/70 uppercase font-bold tracking-wider">Giao đến</Text>
              <MaterialIcons name="keyboard-arrow-down" size={12} color="white" />
            </View>
            <Text className="text-white text-xs font-semibold" numberOfLines={1}>
              12 Ngõ Tràng Tiền, Hoàn Kiếm, Hà Nội
            </Text>
          </View>
        </TouchableOpacity>

        {/* Right side: Cart & Profile */}
        <View className="flex-row items-center gap-3">
          {/* Cart Icon with badge */}
          <TouchableOpacity
            className="w-10 h-10 bg-white/10 rounded-full items-center justify-center relative"
            onPress={() => router.push('/cart')}
            activeOpacity={0.8}
          >
            <MaterialIcons name="shopping-cart" size={20} color="white" />
            {cartItemsCount > 0 && (
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] px-1 items-center justify-center border border-primary-dark">
                <Text className="text-white text-[9px] font-bold leading-none">
                  {cartItemsCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Profile Avatar */}
          <TouchableOpacity 
            className="bg-gray-200 rounded-full w-10 h-10 items-center justify-center border-2 border-white/20 overflow-hidden"
            onPress={() => router.push('/profile')}
            activeOpacity={0.8}
          >
            <MaterialIcons name="person" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar Row */}
      <View className="w-full">
        <SearchBar placeholder="Tìm món ngon, bún chả, trà sữa..." className="h-10" />
      </View>
    </View>
  );
}
