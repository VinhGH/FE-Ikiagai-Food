import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const CATEGORIES = [
  { id: '', name: 'Tất cả', emoji: '📋' },
  { id: 'Cơm', name: 'Cơm Tấm', emoji: '🍚' },
  { id: 'Bún', name: 'Bún Huế', emoji: '🍜' },
  { id: 'Gà', name: 'Gà Rán', emoji: '🍗' },
  { id: 'Bánh mì', name: 'Bánh Mì', emoji: '🥖' },
  { id: 'Phở', name: 'Phở Bò', emoji: '🥣' },
];

interface FoodCategorySectionProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function FoodCategorySection({
  selectedCategory,
  onSelectCategory,
}: FoodCategorySectionProps) {
  return (
    <View className="py-4 bg-white rounded-b-3xl shadow-sm mb-4">
      <View className="px-4 mb-3">
        <Text className="text-lg font-bold text-on-surface">Danh mục món ăn</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;

          return (
            <TouchableOpacity
              key={cat.id || 'all'}
              activeOpacity={0.8}
              onPress={() => onSelectCategory(cat.id)}
              className={`flex-row items-center px-4 py-2.5 rounded-full border ${
                isActive
                  ? 'bg-primary-dark border-primary-dark shadow-sm'
                  : 'bg-background border-outline-variant/30'
              }`}
            >
              <Text className="text-lg mr-2">{cat.emoji}</Text>
              <Text
                className={`text-sm font-semibold ${
                  isActive ? 'text-white' : 'text-on-surface-variant'
                }`}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
