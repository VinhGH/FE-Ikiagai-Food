import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PROMOS = [
  {
    id: '1',
    title: 'KOI Thé',
    subtitle: 'ƯU ĐÃI ĐẾN 50K',
    desc: 'Cho đơn tối thiểu 100k',
    code: 'KOI50',
    bgColor: '#FF9A3C',
    image: 'https://images.unsplash.com/photo-1558857563-b37102e99e00?auto=format&fit=crop&w=250&q=80',
  },
  {
    id: '2',
    title: 'Jollibee',
    subtitle: 'FREESHIP 0Đ',
    desc: 'Ăn gà giòn cực đã',
    code: 'JOLLI0D',
    bgColor: '#E63946',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=250&q=80',
  },
];

export function PromoBanner() {
  return (
    <View className="mb-6">
      <View className="px-4 flex-row items-center justify-between mb-3">
        <Text className="text-lg font-bold text-on-surface">Khuyến mãi cực hot</Text>
        <TouchableOpacity className="flex-row items-center">
          <Text className="text-xs text-primary font-semibold mr-0.5">Tất cả</Text>
          <MaterialIcons name="chevron-right" size={16} color="#2D8A6B" />
        </TouchableOpacity>
      </View>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, gap: 12 }}
      >
        {PROMOS.map((promo) => (
          <TouchableOpacity
            key={promo.id}
            activeOpacity={0.9}
            className="w-60 rounded-xl overflow-hidden flex-row h-[95px] shadow-sm"
            style={{
              backgroundColor: promo.bgColor
            }}
          >
            <View className="flex-1 p-3 justify-between z-10">
              <View>
                <Text className="text-white font-extrabold text-[9px] uppercase tracking-wider">{promo.title}</Text>
                <Text className="text-white font-black text-sm mb-0.5" numberOfLines={1}>{promo.subtitle}</Text>
                <Text className="text-white/80 text-[10px] font-medium" numberOfLines={1}>{promo.desc}</Text>
              </View>
              <View className="bg-white/20 self-start px-1.5 py-0.5 rounded border border-white/15">
                <Text className="text-white text-[8px] font-bold">MÃ: {promo.code}</Text>
              </View>
            </View>

            <View className="w-[80px] h-full relative justify-center items-center">
              <View className="absolute left-[-12px] top-0 bottom-0 w-[100px] bg-white/10 rounded-l-full rotate-[15deg]" />
              <Image
                source={{ uri: promo.image }}
                className="rounded-xl"
                resizeMode="cover"
                style={{ width: 50, height: 50 }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
