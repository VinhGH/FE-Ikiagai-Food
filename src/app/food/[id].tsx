import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useFoodDetail } from '../../features/food/hooks/useFoodDetail';
import { useCartStore } from '../../store/cartStore';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { IToppingSection, IToppingOption } from '../../features/food/types';

export default function ShopDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { food, shop, isLoading, error } = useFoodDetail(id);
  const addToCart = useCartStore((state) => state.addToCart);

  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [selectedToppings, setSelectedToppings] = useState<{ [sectionId: string]: IToppingOption[] }>({});

  // Auto-select first option for required single-selection topping sections
  useEffect(() => {
    if (food?.toppings) {
      const initial: { [sectionId: string]: IToppingOption[] } = {};
      food.toppings.forEach((sec) => {
        if (sec.isRequired && sec.options.length > 0 && sec.maxSelections === 1) {
          initial[sec.id] = [sec.options[0]];
        }
      });
      setSelectedToppings(initial);
    }
  }, [food]);

  // UX Skill #78: Loading state
  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <ActivityIndicator size="large" color="#2D8A6B" />
        <Text className="text-on-surface-variant mt-3 text-sm">Đang tải...</Text>
      </View>
    );
  }

  // UX Skill #80: Error recovery
  if (error || !food) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center px-8">
        <MaterialIcons name="error-outline" size={56} color="#D1D5DB" />
        <Text className="text-on-surface text-lg font-bold mt-4 mb-2 text-center">
          Không tìm thấy món ăn
        </Text>
        <Text className="text-on-surface-variant text-sm text-center mb-6">
          {error ?? 'Món ăn này không còn tồn tại hoặc đã bị xóa.'}
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="bg-primary px-8 py-3 rounded-full min-h-[48px] justify-center"
          activeOpacity={0.8}
        >
          <Text className="text-white font-bold">Quay lại</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleSelectTopping = (section: IToppingSection, option: IToppingOption) => {
    setSelectedToppings((prev) => {
      const current = prev[section.id] || [];
      const exists = current.some((o) => o.id === option.id);

      if (section.maxSelections === 1) {
        // Radio button style: select this one (de-select others)
        // If it's already selected and NOT required, we can toggle it off
        if (exists && !section.isRequired) {
          return { ...prev, [section.id]: [] };
        }
        return { ...prev, [section.id]: [option] };
      } else {
        // Checkbox style: toggle selection
        if (exists) {
          return {
            ...prev,
            [section.id]: current.filter((o) => o.id !== option.id),
          };
        } else {
          // Check limit
          if (section.maxSelections && current.length >= section.maxSelections) {
            Alert.alert('Giới hạn chọn', `Phần này chỉ được chọn tối đa ${section.maxSelections} tùy chọn.`);
            return prev;
          }
          return {
            ...prev,
            [section.id]: [...current, option],
          };
        }
      }
    });
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    // Validate required sections
    const missing = food.toppings?.filter(
      (sec) => sec.isRequired && (!selectedToppings[sec.id] || selectedToppings[sec.id].length === 0)
    );

    if (missing && missing.length > 0) {
      Alert.alert('Vui lòng chọn tùy chọn bắt buộc', `Bạn chưa chọn tùy chọn cho phần "${missing[0].title}".`);
      return;
    }

    const flatSelectedToppings = Object.values(selectedToppings).flat();
    addToCart(food, quantity, flatSelectedToppings, notes);
    
    Alert.alert('Thành công', `Đã thêm ${quantity}x ${food.name} vào giỏ hàng!`, [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  const toppingsPrice = Object.values(selectedToppings)
    .flat()
    .reduce((sum, o) => sum + o.price, 0);
  const totalPrice = (food.price + toppingsPrice) * quantity;
  const savings = food.originalPrice ? (food.originalPrice - food.price) : 0;
  const totalSavings = savings * quantity;

  const getRequirementText = (section: IToppingSection) => {
    if (section.isRequired) {
      if (section.maxSelections === 1) return 'Chọn 1';
      return `Bắt buộc, tối đa ${section.maxSelections}`;
    } else {
      if (section.maxSelections === 1) return 'Không bắt buộc, tối đa 1';
      return `Không bắt buộc, tối đa ${section.maxSelections || 'không giới hạn'}`;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1 bg-white"
    >
      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 bg-background"
        contentContainerStyle={{ paddingBottom: 180 }}
      >
        {/* Parallax Hero Image Cover */}
        <View className="relative h-72 w-full bg-slate-100">
          <Image
            source={{ uri: food.image }}
            className="w-full h-full"
            resizeMode="cover"
          />
          {/* Transparent shadow overlay on top */}
          <View className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
          
          {/* Top navigation overlay buttons */}
          <View className="absolute top-12 left-4 right-4 flex-row justify-between items-center z-20">
            <TouchableOpacity
              onPress={() => router.back()}
              className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-md"
              activeOpacity={0.8}
            >
              <MaterialIcons name="close" size={22} color="#1E293B" />
            </TouchableOpacity>
            
            <TouchableOpacity
              className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-md"
              activeOpacity={0.8}
            >
              <MaterialIcons name="share" size={20} color="#1E293B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Food Detail Card Container */}
        <View className="bg-white px-5 pt-6 pb-5 rounded-t-3xl -mt-6 z-10 shadow-sm">
          {/* Title and Price Row */}
          <View className="flex-row justify-between items-start gap-4">
            <View className="flex-1">
              <Text className="text-xl font-extrabold text-on-surface leading-snug">
                {food.name}
              </Text>
            </View>
            <View className="items-end min-w-[100px]">
              <View className="flex-row items-baseline gap-1.5 justify-end">
                {food.originalPrice && (
                  <Text className="text-sm text-outline line-through font-medium">
                    {food.originalPrice.toLocaleString('vi-VN')}
                  </Text>
                )}
                <Text className="text-xl font-black text-on-surface">
                  {food.price.toLocaleString('vi-VN')}
                </Text>
              </View>
              {food.originalPrice && (
                <Text className="text-[10px] text-outline mt-0.5 font-semibold">Giá gốc</Text>
              )}
            </View>
          </View>

          {/* Discount/Savings Badge */}
          {savings > 0 && (
            <View className="flex-row items-center bg-orange-50 border border-orange-100 px-2 py-1 rounded-md self-start mt-3">
              <MaterialIcons name="local-offer" size={12} color="#EA580C" />
              <Text className="text-[#EA580C] text-[11px] font-extrabold ml-1">
                Giảm {savings.toLocaleString('vi-VN')}đ
              </Text>
            </View>
          )}

          {/* Description */}
          <View className="mt-4">
            <Text className="text-on-surface-variant text-sm leading-relaxed">
              {food.description || "Món ăn thơm ngon, chuẩn vị, được chuẩn bị sạch sẽ từ các nguyên liệu tươi mới mỗi ngày."}
            </Text>
          </View>
        </View>

        {/* Toppings Selector Sections */}
        {food.toppings && food.toppings.length > 0 && (
          <View className="mt-1">
            {food.toppings.map((section) => {
              const currentSelections = selectedToppings[section.id] || [];
              const isSingleSelect = section.maxSelections === 1;

              return (
                <View 
                  key={section.id} 
                  className="bg-white/90 border border-slate-100 rounded-2xl mx-4 mt-3 p-4 shadow-sm"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                >
                  {/* Section Title Header */}
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-base font-extrabold text-on-surface">{section.title}</Text>
                    <View className="bg-slate-100 px-2.5 py-1 rounded-full">
                      <Text className="text-[10px] text-gray-500 font-bold">
                        {getRequirementText(section)}
                      </Text>
                    </View>
                  </View>

                  {/* Toppings Option Rows */}
                  <View>
                    {section.options.map((option) => {
                      const isSelected = currentSelections.some((o) => o.id === option.id);

                      return (
                        <TouchableOpacity
                          key={option.id}
                          activeOpacity={0.8}
                          onPress={() => handleSelectTopping(section, option)}
                          className="flex-row items-center justify-between py-3.5 border-b border-gray-100 last:border-b-0"
                        >
                          <View className="flex-row items-center flex-1 pr-4">
                            {/* Custom Selection Checkbox/Radio on the Left */}
                            {isSingleSelect ? (
                              <View className={`w-5 h-5 rounded-full border items-center justify-center mr-3 ${isSelected ? 'border-primary bg-white' : 'border-gray-300 bg-white'}`}>
                                {isSelected && <View className="w-2.5 h-2.5 rounded-full bg-primary" />}
                              </View>
                            ) : (
                              <View className={`w-5 h-5 rounded border items-center justify-center mr-3 ${isSelected ? 'bg-primary border-primary' : 'border-gray-300 bg-white'}`}>
                                {isSelected && <MaterialIcons name="check" size={14} color="white" />}
                              </View>
                            )}
                            
                            <Text className="text-sm font-semibold text-on-surface">
                              {option.name}
                            </Text>
                          </View>
                          
                          {option.price > 0 && (
                            <Text className="text-xs text-gray-500 font-bold">
                              +{option.price.toLocaleString('vi-VN')}đ
                            </Text>
                          )}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {/* Shop Info Card */}
        {shop && (
          <View 
            className="bg-white/90 border border-slate-100 rounded-2xl mx-4 mt-3 p-4 shadow-sm flex-row items-center gap-4"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          >
            <Image
              source={{ uri: shop.image }}
              className="w-12 h-12 rounded-full border border-outline-variant"
              resizeMode="cover"
            />
            <View className="flex-1">
              <Text className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wide">Cửa hàng</Text>
              <Text className="text-base font-extrabold text-on-surface">{shop.name}</Text>
              <Text className="text-xs text-on-surface-variant" numberOfLines={1}>{shop.address}</Text>
            </View>
            <View className="bg-primary-light px-3 py-1.5 rounded-full flex-row items-center">
              <MaterialIcons name="local-shipping" size={14} color="#2D8A6B" />
              <Text className="text-xs text-primary font-bold ml-1">Freeship</Text>
            </View>
          </View>
        )}

        {/* Note Customization Section */}
        <View 
          className="bg-white/90 border border-slate-100 rounded-2xl mx-4 mt-3 p-4 shadow-sm"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        >
          <View className="flex-row items-center gap-1.5 mb-3">
            <MaterialIcons name="edit-note" size={20} color="#4B5563" />
            <Text className="text-sm font-bold text-on-surface">Ghi chú cho cửa hàng</Text>
          </View>
          <TextInput
            placeholder="Ví dụ: Ít cay, không lấy hành, nhiều đá..."
            placeholderTextColor="#9CA3AF"
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={2}
            className="w-full bg-slate-50/50 border border-slate-200/50 rounded-xl px-4 py-3 text-sm text-on-surface min-h-[70px] text-left"
            style={{ textAlignVertical: 'top' }}
          />
        </View>
      </ScrollView>

      {/* Floating Bottom Action Sheet */}
      <View 
        className="absolute bottom-0 left-0 right-0 bg-white/90 border-t border-slate-200/50 px-5 pt-4 pb-8 shadow-lg"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}
      >
        {/* Savings Tip inside Action Sheet */}
        {totalSavings > 0 && (
          <View className="bg-orange-50/80 border border-orange-100/50 rounded-full px-4 py-1.5 mb-3 self-center">
            <Text className="text-orange-600 text-xs font-bold text-center">
              Bạn tiết kiệm được {totalSavings.toLocaleString('vi-VN')}đ sau khi giảm giá.
            </Text>
          </View>
        )}

        <View className="flex-row items-center justify-between gap-4">
          {/* Quantity Controller */}
          <View className="flex-row items-center bg-slate-100/80 rounded-full border border-slate-200/40 px-2 py-1">
            <TouchableOpacity
              onPress={handleDecrement}
              className="w-9 h-9 rounded-full bg-white border border-slate-200/60 items-center justify-center shadow-sm"
              activeOpacity={0.7}
            >
              <MaterialIcons name="remove" size={16} color="#0F5B47" />
            </TouchableOpacity>
            
            <Text className="text-base font-extrabold text-on-surface px-4 min-w-[30px] text-center">
              {quantity}
            </Text>
            
            <TouchableOpacity
              onPress={handleIncrement}
              className="w-9 h-9 rounded-full bg-primary items-center justify-center shadow-sm"
              activeOpacity={0.7}
            >
              <MaterialIcons name="add" size={16} color="white" />
            </TouchableOpacity>
          </View>

          {/* Add To Cart Button */}
          <TouchableOpacity
            onPress={handleAddToCart}
            className="flex-1 bg-primary h-12 rounded-full flex-row items-center justify-center shadow-md"
            activeOpacity={0.8}
          >
            <Text className="text-white font-extrabold text-sm">
              Thêm vào giỏ hàng - {totalPrice.toLocaleString('vi-VN')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
