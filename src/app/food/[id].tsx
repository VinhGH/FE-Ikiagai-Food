import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFoodDetail } from '../../features/food/hooks/useFoodDetail';

export default function FoodDetailPage() {
  const params = useLocalSearchParams<{ id: string }>();
  const { food, isLoading, error } = useFoodDetail(params.id);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator color="#00687b" />
      </SafeAreaView>
    );
  }

  if (error || !food) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center px-6">
        <Text className="text-on-surface-variant text-center">{error ?? 'Không tìm thấy món ăn'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView>
        <Image source={{ uri: food.image }} className="w-full h-72 bg-surface-container-low" resizeMode="cover" />
        <View className="p-5">
          <Text className="text-2xl font-bold text-on-surface">{food.name}</Text>
          <Text className="text-xl font-bold text-primary-container mt-2">
            {food.price.toLocaleString('vi-VN')}đ
          </Text>
          {food.description && (
            <Text className="text-base text-on-surface-variant mt-3 leading-6">{food.description}</Text>
          )}

          {food.toppings?.map((section) => (
            <View key={section.id} className="mt-6">
              <Text className="text-base font-bold text-on-surface">{section.title}</Text>
              {section.options.map((option) => (
                <View key={option.id} className="flex-row items-center justify-between py-3 border-b border-outline-variant">
                  <Text className="text-on-surface">{option.name}</Text>
                  <Text className="text-on-surface-variant">+{option.price.toLocaleString('vi-VN')}đ</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
