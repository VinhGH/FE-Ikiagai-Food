import { View } from 'react-native';
import { IconButton } from '../../../components/ui/IconButton';

const SERVICES = [
  { id: '1', name: 'Đồ ăn', icon: 'restaurant' },
  { id: '2', name: 'Ô tô', icon: 'directions-car' },
  { id: '3', name: 'Xe máy', icon: 'two-wheeler' },
  { id: '4', name: 'Giao hàng', icon: 'local-shipping' },
  { id: '5', name: 'Đi chợ', icon: 'shopping-basket' },
  { id: '6', name: 'Đi Ăn Nhà Hàng', icon: 'storefront' },
  { id: '7', name: 'Đặt xe trước', icon: 'event-seat' },
  { id: '8', name: 'Tất cả', icon: 'grid-view' },
];

export function ServiceGrid() {
  return (
    <View className="px-4 py-6 bg-white rounded-b-3xl shadow-sm mb-4">
      <View className="flex-row flex-wrap justify-between">
        {SERVICES.map((service) => (
          <View key={service.id} className="w-1/4 items-center mb-4">
            <IconButton 
              icon={service.icon as any} 
              label={service.name} 
              backgroundColor="#e0f7fd"
              color="#00687b"
            />
          </View>
        ))}
      </View>
    </View>
  );
}
