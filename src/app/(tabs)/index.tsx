import { ScrollView, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { HomeHeader } from '../../features/home/components/HomeHeader';
import { ServiceGrid } from '../../features/home/components/ServiceGrid';
import { PromoBanner } from '../../features/home/components/PromoBanner';
import { Card } from '../../components/ui/Card';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-background">
      <HomeHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ServiceGrid />
        <PromoBanner />
        
        {/* Món ngon cho bạn */}
        <View className="px-4 mb-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-on-surface">Món ngon cho bạn</Text>
            <MaterialIcons name="arrow-forward" size={24} color="#6ed6f2" />
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="overflow-visible -mx-4 px-4">
            {/* Placeholder Food Items */}
            {[1, 2, 3].map((item) => (
              <Card key={item} className="w-40 mr-4 overflow-hidden mb-2">
                <View className="h-28 bg-gray-200" />
                <View className="p-3">
                  <Text className="font-bold text-on-surface mb-1" numberOfLines={2}>Cơm Tấm Sườn Bì Chả</Text>
                  <Text className="text-xs text-on-surface-variant font-medium mt-1">25.000đ</Text>
                </View>
              </Card>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}
