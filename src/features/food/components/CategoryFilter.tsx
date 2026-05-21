import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const CATEGORIES = [
  { id: 'all', name: 'Tất cả', emoji: '📋' },
  { id: 'burger', name: 'Burger', emoji: '🍔' },
  { id: 'pizza', name: 'Pizza', emoji: '🍕' },
  { id: 'drinks', name: 'Đồ uống', emoji: '🥤' },
  { id: 'salad', name: 'Salad', emoji: '🥗' },
  { id: 'chicken', name: 'Gà rán', emoji: '🍗' },
] as const;

export function CategoryFilter() {
  const [selected, setSelected] = useState<string>('all');

  return (
    <View className="py-3">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-4 gap-4"
      >
        {CATEGORIES.map((cat) => {
          const isActive = selected === cat.id;

          return (
            <TouchableOpacity
              key={cat.id}
              activeOpacity={0.7}
              onPress={() => setSelected(cat.id)}
              className="items-center gap-1.5"
            >
              <View
                className={`w-14 h-14 rounded-full items-center justify-center ${
                  isActive ? 'bg-primary-container' : 'bg-surface-container-low'
                }`}
              >
                <Text className="text-2xl">{cat.emoji}</Text>
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
