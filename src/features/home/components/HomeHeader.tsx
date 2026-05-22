import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SearchBar } from '../../../components/ui/SearchBar';
import { useRouter } from 'expo-router';
import { useCartStore } from '../../../store/cartStore';
import { useOrderStore } from '../../../store/orderStore';

interface HomeHeaderProps {
  scrollY?: Animated.Value;
}

export function HomeHeader({ scrollY }: HomeHeaderProps) {
  const router = useRouter();
  const cartItemsCount = useCartStore((state) => state.getTotalItemsCount());
  const ongoingOrdersCount = useOrderStore((state) => state.ongoingOrders.length);

  // Fallback to a dummy value if scrollY is not provided
  const animatedScrollY = scrollY || new Animated.Value(0);

  // 1. Shift the entire header up by 56px to hide the top row
  const translateY = animatedScrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [0, -56],
    extrapolate: 'clamp',
  });

  // 2. Fade out the address/profile row as it scrolls
  const topRowOpacity = animatedScrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // 3. Fade out the blue background color (revealing the white base)
  const blueOpacity = animatedScrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  // 4. Shrink the search bar when scrolling down
  const searchScale = animatedScrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0.90],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View 
      style={{
        transform: [{ translateY }],
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: '#ffffff', // base white background
      }}
    >
      {/* Light blue background overlay that fades out on scroll */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#e0f2fe',
          opacity: blueOpacity,
        }}
      />

      <View className="px-4 pt-12 pb-4 gap-3 border-b border-slate-100">
        {/* Top Address + Profile/Cart Row */}
        <Animated.View style={{ opacity: topRowOpacity }}>
          <View className="flex-row items-center justify-between">
            {/* Location selector */}
            <TouchableOpacity 
              className="flex-1 flex-row items-center gap-1.5"
              activeOpacity={0.8}
              onPress={() => router.push('/address-picker')}
            >
              <View className="bg-sky-500/10 rounded-full w-8 h-8 items-center justify-center">
                <MaterialIcons name="location-on" size={18} color="#0284c7" />
              </View>
              <View className="flex-1">
                <View className="flex-row items-center gap-0.5">
                  <Text className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Giao đến</Text>
                  <MaterialIcons name="keyboard-arrow-down" size={12} color="#475569" />
                </View>
                <Text className="text-slate-850 text-xs font-extrabold" numberOfLines={1}>
                  36 Cát Linh, Cát Linh, Đống Đa, Hà Nội
                </Text>
              </View>
            </TouchableOpacity>

            {/* Right side: Activity, Cart & Profile */}
            <View className="flex-row items-center gap-2.5">
              {/* Activity History Icon */}
              <TouchableOpacity
                className="w-10 h-10 bg-white rounded-full items-center justify-center relative shadow-sm border border-slate-100"
                onPress={() => router.push('/activity')}
                activeOpacity={0.8}
              >
                <MaterialIcons name="receipt-long" size={20} color="#475569" />
                {ongoingOrdersCount > 0 && (
                  <View className="absolute -top-1 -right-1 bg-orange-500 rounded-full min-w-[18px] h-[18px] px-1 items-center justify-center border border-white">
                    <Text className="text-white text-[9px] font-bold leading-none">
                      {ongoingOrdersCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Cart Icon with badge */}
              <TouchableOpacity
                className="w-10 h-10 bg-white rounded-full items-center justify-center relative shadow-sm border border-slate-100"
                onPress={() => router.push('/cart')}
                activeOpacity={0.8}
              >
                <MaterialIcons name="shopping-cart" size={20} color="#475569" />
                {cartItemsCount > 0 && (
                  <View className="absolute -top-1 -right-1 bg-[#6ed6f2] rounded-full min-w-[18px] h-[18px] px-1 items-center justify-center border border-white">
                    <Text className="text-white text-[9px] font-bold leading-none">
                      {cartItemsCount}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>

              {/* Profile Avatar */}
              <TouchableOpacity 
                className="bg-white rounded-full w-10 h-10 items-center justify-center border border-slate-100 shadow-sm overflow-hidden"
                onPress={() => router.push('/profile')}
                activeOpacity={0.8}
              >
                <MaterialIcons name="person" size={24} color="#475569" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>

        {/* Search Bar Row with scroll-driven scale animation */}
        <Animated.View style={{ transform: [{ scale: searchScale }] }} className="w-full">
          <SearchBar placeholder="Tìm món ăn, quán ăn hoặc trà sữa..." className="h-10" />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

