import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const MAIN_CATEGORIES = [
  { id: '', name: 'Tất cả', emoji: '🥗', bgColor: 'bg-amber-100', textColor: 'text-amber-800' },
  { id: 'Đồ Ăn', name: 'Đồ Ăn', emoji: '🍜', bgColor: 'bg-emerald-100', textColor: 'text-emerald-800' },
  { id: 'Trà Sữa', name: 'Nước Uống', emoji: '🥤', bgColor: 'bg-sky-100', textColor: 'text-sky-800' },
  { id: 'Ăn Vặt', name: 'Ăn Vặt', emoji: '🍕', bgColor: 'bg-rose-100', textColor: 'text-rose-800' },
];

const PROMO_BADGES = [
  // Hàng 1
  { title: 'Freeship 0đ', sub: 'Tự động áp dụng', badge: 'HOT', color: 'bg-orange-50 border-orange-100', textCol: 'text-orange-700', badgeCol: 'bg-orange-500' },
  { title: 'Deal Đỉnh 1đ', sub: 'Săn mỗi khung giờ', badge: '1Đ', color: 'bg-amber-50 border-amber-100', textCol: 'text-amber-700', badgeCol: 'bg-amber-500' },
  { title: 'Giao Nhanh 15P', sub: 'Nóng hổi tận tay', badge: 'FAST', color: 'bg-blue-50 border-blue-100', textCol: 'text-blue-700', badgeCol: 'bg-blue-500' },
  { title: 'Món Độc Quyền', sub: 'Chỉ có trên app', badge: 'PRO', color: 'bg-pink-50 border-pink-100', textCol: 'text-pink-700', badgeCol: 'bg-pink-500' },
  // Hàng 2
  { title: 'Bánh Mì Giảm 50%', sub: 'Giòn rụm thơm ngon', badge: '-50%', color: 'bg-emerald-50 border-emerald-100', textCol: 'text-emerald-700', badgeCol: 'bg-emerald-500' },
  { title: 'Cơm Trưa Đồng Giá', sub: 'Chỉ từ 35k thôi', badge: '35K', color: 'bg-red-50 border-red-100', textCol: 'text-red-700', badgeCol: 'bg-red-500' },
  { title: 'Trà Sữa Mua 1 Tặng 1', sub: 'Nhận ngay ly nữa', badge: '1+1', color: 'bg-orange-50 border-orange-100', textCol: 'text-orange-700', badgeCol: 'bg-orange-500' },
  { title: 'Ăn Vặt Deal Hời', sub: 'Thả ga ăn uống', badge: 'SAVE', color: 'bg-teal-50 border-teal-100', textCol: 'text-teal-700', badgeCol: 'bg-teal-500' },
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
      {/* 4 Danh mục lớn dạng hình tròn */}
      <View className="flex-row justify-around px-2 mb-5">
        {MAIN_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.id;

          return (
            <TouchableOpacity
              key={cat.id || 'all'}
              activeOpacity={0.85}
              onPress={() => onSelectCategory(cat.id)}
              className="items-center"
            >
              <View 
                className={`w-16 h-16 rounded-full items-center justify-center shadow-sm border ${
                  isActive 
                    ? 'bg-[#6ed6f2] border-[#6ed6f2] scale-105' 
                    : `${cat.bgColor} border-transparent`
                }`}
              >
                <Text className="text-3xl">{cat.emoji}</Text>
              </View>
              <Text 
                className={`text-xs mt-2 font-bold ${
                  isActive ? 'text-[#6ed6f2]' : 'text-slate-700'
                }`}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Lưới thẻ ưu đãi cuộn ngang */}
      <View className="mb-2">
        <Text className="text-sm font-black text-slate-800 uppercase tracking-wider mb-3 px-4">Ưu đãi hôm nay</Text>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, gap: 10 }}
        >
          {PROMO_BADGES.map((badge, idx) => (
            <TouchableOpacity
              key={idx}
              activeOpacity={0.8}
              className={`w-32 h-[80px] p-3 rounded-2xl border ${badge.color} relative overflow-hidden flex-col justify-between`}
              onPress={() => onSelectCategory(
                idx === 0 || idx === 5 ? 'Cơm Tấm' : 
                idx === 1 || idx === 6 ? 'Trà Sữa' : 
                idx === 2 || idx === 7 ? 'Gà Rán' : 'Bún'
              )}
            >
              {/* Badge label */}
              <View className={`absolute top-0 right-0 px-2 py-0.5 rounded-bl-xl ${badge.badgeCol}`}>
                <Text className="text-[8px] text-white font-extrabold">{badge.badge}</Text>
              </View>
              
              <View className="flex-1 justify-between mt-1">
                <Text className={`text-[11px] font-black ${badge.textCol} leading-snug pr-2`} numberOfLines={2}>
                  {badge.title}
                </Text>
                <Text className="text-[9px] text-slate-400 font-bold leading-none mb-0.5" numberOfLines={1}>
                  {badge.sub}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

