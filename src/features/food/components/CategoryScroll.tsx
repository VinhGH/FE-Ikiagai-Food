import { ScrollView, View, Text } from 'react-native';
import { IconButton } from '../../../components/ui/IconButton';

const CATEGORIES = [
  { id: '1', name: 'Cơm', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=150&q=80' },
  { id: '2', name: 'Thức ăn nhanh', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80' },
  { id: '3', name: 'Cà Phê - Trà\n- Sinh Tố', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=150&q=80' },
  { id: '4', name: 'Trà sữa', image: 'https://images.unsplash.com/photo-1558857563-b37102e99e00?auto=format&fit=crop&w=150&q=80' },
  { id: '5', name: 'Bún - Phở', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=150&q=80' },
];

export function CategoryScroll() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 py-6">
      {CATEGORIES.map((cat) => (
        <View key={cat.id} className="mr-6 items-center w-20">
          <IconButton 
            imageSource={{ uri: cat.image }}
            backgroundColor="#F3F4F6"
            size={24}
            className="mb-1"
          />
          <Text className="text-xs text-on-surface-variant text-center" numberOfLines={2}>{cat.name}</Text>
        </View>
      ))}
      <View className="w-4" />
    </ScrollView>
  );
}
