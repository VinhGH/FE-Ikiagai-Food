import { TouchableOpacity, View, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface MessageItemProps {
  title: string;
  preview: string;
  date: string;
  unreadCount?: number;
  icon: keyof typeof MaterialIcons.glyphMap;
  iconBgColor?: string;
}

export function MessageItem({ title, preview, date, unreadCount, icon, iconBgColor = '#6ed6f2' }: MessageItemProps) {
  return (
    <TouchableOpacity className="flex-row items-center py-4 px-4 border-b border-outline-variant bg-white" activeOpacity={0.7}>
      <View className="w-12 h-12 rounded-full items-center justify-center mr-4 shadow-sm" style={{ backgroundColor: iconBgColor }}>
        <MaterialIcons name={icon} size={24} color="white" />
      </View>
      <View className="flex-1 mr-2">
        <Text className="font-bold text-base text-on-surface mb-1" numberOfLines={1}>{title}</Text>
        <Text className="text-sm text-on-surface-variant" numberOfLines={1}>{preview}</Text>
      </View>
      <View className="items-end justify-center">
        <Text className="text-xs text-on-surface-variant mb-2">{date}</Text>
        {unreadCount ? (
          <View className="bg-primary rounded-full w-5 h-5 items-center justify-center">
            <Text className="text-white text-[10px] font-bold">{unreadCount}</Text>
          </View>
        ) : <View className="w-5 h-5" />}
      </View>
    </TouchableOpacity>
  );
}
