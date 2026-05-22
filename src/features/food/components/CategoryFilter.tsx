import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { Category } from '../../../types/api';

const FALLBACK_CATEGORIES: Pick<Category, 'id' | 'slug' | 'name' | 'emoji'>[] = [
  { id: 'all', slug: 'all', name: 'Tất cả', emoji: '📋' },
  { id: 'burger', slug: 'burger', name: 'Burger', emoji: '🍔' },
  { id: 'pizza', slug: 'pizza', name: 'Pizza', emoji: '🍕' },
  { id: 'drinks', slug: 'drinks', name: 'Đồ uống', emoji: '🥤' },
  { id: 'chicken', slug: 'chicken', name: 'Gà rán', emoji: '🍗' },
];

export function CategoryFilter({
  categories,
  selected,
  onChange,
}: {
  categories: Category[];
  selected: string;
  onChange: (slug: string) => void;
}) {
  const visibleCategories = categories.length ? categories : FALLBACK_CATEGORIES;

  return (
    <View className="py-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4 gap-4"
      >
        {visibleCategories.map((cat) => {
          const isActive = selected === cat.slug;

          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.7}
              onPress={() => onChange(cat.slug)}
              className="items-center gap-1.5"
            >
              <View
                className={`w-14 h-14 rounded-full items-center justify-center ${
                  isActive ? 'bg-primary-container' : 'bg-surface-container-low'
                }`}
              >
                <Text className="text-2xl">{cat.emoji ?? '🍽️'}</Text>
              </View>

              <Text
                className={`text-xs ${
                  isActive
                    ? 'font-semibold text-on-primary-container'
                    : 'text-on-surface-variant'
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
