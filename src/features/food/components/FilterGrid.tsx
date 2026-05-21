import { ScrollView, View, Text, Image } from 'react-native';
import { Card } from '../../../components/ui/Card';

const FILTERS = [
  { id: '1', title: 'Gần tôi', subtitle: 'Get it quick', image: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=150&q=80' },
  { id: '2', title: 'Một Người Ăn', subtitle: 'Bao trọn gói', image: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=150&q=80' },
  { id: '3', title: 'Grab Ngon Rẻ', subtitle: 'Quán ăn ngon', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=150&q=80' },
];

export function FilterGrid() {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-4 mb-6">
      {FILTERS.map((item) => (
        <Card key={item.id} className="w-36 mr-4 p-4 items-center border-0 bg-gray-50">
          <View className="bg-white w-16 h-16 rounded-full items-center justify-center mb-3 shadow-sm elevation-2 overflow-hidden">
            <Image source={{ uri: item.image }} className="w-full h-full" resizeMode="cover" />
          </View>
          <Text className="font-bold text-on-surface text-center mb-1">{item.title}</Text>
          <Text className="text-xs text-on-surface-variant text-center">{item.subtitle}</Text>
        </Card>
      ))}
      <View className="w-4" />
    </ScrollView>
  );
}
