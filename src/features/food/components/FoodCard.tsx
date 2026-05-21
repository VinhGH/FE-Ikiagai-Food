import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

export type FoodItem = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  discount?: number;
};

export function FoodCard({ item }: { item: FoodItem }) {
  const router = useRouter();

  const formattedPrice = item.price.toLocaleString('vi-VN');
  const formattedOriginalPrice = item.originalPrice?.toLocaleString('vi-VN');

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => router.push(`/food/${item.id}`)}
      className="flex-1 rounded-2xl bg-white border border-outline-variant/30 shadow-sm p-2.5"
    >
      {/* Image area */}
      <View className="relative aspect-square w-full rounded-xl overflow-hidden bg-surface-container-low">
        <Image
          source={{ uri: item.image }}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Discount badge */}
        {item.discount != null && item.discount > 0 && (
          <View className="absolute top-1.5 left-1.5 bg-red-500 rounded-lg px-1.5 py-0.5">
            <Text className="text-white text-[10px] font-bold">
              -{item.discount}%
            </Text>
          </View>
        )}
      </View>

      {/* Info area */}
      <View className="mt-2 gap-1">
        <Text
          className="font-semibold text-sm text-on-surface"
          numberOfLines={1}
        >
          {item.name}
        </Text>

        {/* Prices row + add button */}
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-1.5 flex-shrink">
            <Text className="text-sm font-bold text-primary-container">
              {formattedPrice}đ
            </Text>

            {formattedOriginalPrice && (
              <Text className="text-[10px] text-outline line-through">
                {formattedOriginalPrice}đ
              </Text>
            )}
          </View>

          {/* Add button */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={(e) => {
              // Prevent card navigation when tapping add button
              e.stopPropagation();
            }}
            className="w-8 h-8 bg-primary-container rounded-full items-center justify-center"
          >
            <Text className="text-on-primary-container text-lg font-bold leading-none">
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
