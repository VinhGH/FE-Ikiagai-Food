import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export function FoodHeader() {
  const router = useRouter();

  return (
    <View className="bg-primary pt-14 pb-12 px-4 rounded-b-[2rem] relative z-10">
      {/* Top Bar */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-row items-center flex-1">
          <TouchableOpacity onPress={() => router.back()} className="mr-3">
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-white/80 text-[10px] uppercase font-bold tracking-wider">Giao Tới</Text>
            <View className="flex-row items-center">
              <Text className="text-white font-bold text-sm" numberOfLines={1}>Bệnh Viện Teraxa C...</Text>
              <MaterialIcons name="keyboard-arrow-down" size={20} color="white" />
            </View>
          </View>
        </View>
        <View className="flex-row items-center gap-3">
          <TouchableOpacity className="bg-black/20 p-2 rounded-full">
            <MaterialIcons name="favorite-border" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity className="bg-black/20 p-2 rounded-full">
            <MaterialIcons name="receipt" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Input (overlapping) */}
      <View className="bg-white rounded-full flex-row items-center px-4 h-12 shadow-lg elevation-5 absolute -bottom-6 left-4 right-4 z-20">
        <MaterialIcons name="search" size={24} color="#1F2937" />
        <TextInput 
          placeholder="Bạn đang thèm gì nào?"
          placeholderTextColor="#9CA3AF"
          className="flex-1 ml-3 text-base text-on-surface h-full"
        />
      </View>
    </View>
  );
}
