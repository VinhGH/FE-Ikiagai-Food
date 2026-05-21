import { View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SearchBar } from '../../../components/ui/SearchBar';
import { useRouter } from 'expo-router';

export function HomeHeader() {
  const router = useRouter();

  return (
    <View className="bg-primary-dark px-4 pt-12 pb-4 flex-row items-center justify-between">
      {/* Scan Button */}
      <View className="bg-primary rounded-full w-10 h-10 items-center justify-center mr-3">
        <MaterialIcons name="qr-code-scanner" size={20} color="white" />
      </View>

      {/* Search Bar */}
      <View className="flex-1">
        <SearchBar placeholder="Tìm địa điểm" className="h-10" />
      </View>

      {/* Points & Avatar */}
      <View className="flex-row items-center ml-3 gap-2">
        <View className="bg-yellow-500 rounded-full w-8 h-8 items-center justify-center border-2 border-white">
          <MaterialIcons name="monetization-on" size={16} color="white" />
        </View>
        <TouchableOpacity 
          className="bg-gray-200 rounded-full w-10 h-10 items-center justify-center border-2 border-white overflow-hidden"
          onPress={() => router.push('/profile')}
          activeOpacity={0.8}
        >
          <MaterialIcons name="person" size={24} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
