import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { MessageItem } from '../../features/messages/components/MessageItem';

export default function MessagesScreen() {
  return (
    <View className="flex-1 bg-white">
      {/* Header */}
      <View className="pt-16 pb-4 px-4 border-b border-outline-variant">
        <Text className="text-3xl font-extrabold text-on-surface tracking-tight">Tin nhắn</Text>
      </View>

      <ScrollView className="flex-1">
        <MessageItem 
          title="Cập nhật mới nhất"
          preview="Thông báo triển khai dịch vụ ở khu vực..."
          date="14 Th5"
          unreadCount={1}
          icon="notifications"
        />
        <MessageItem 
          title="Mới trên Grab"
          preview="Mách bạn cách để nhận nhiều ưu đãi mỗi ngày..."
          date="13 Th5"
          unreadCount={1}
          icon="local-offer"
        />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        className="absolute bottom-6 right-6 w-14 h-14 bg-primary-dark rounded-full items-center justify-center elevation-5 shadow-lg shadow-black/20"
        activeOpacity={0.8}
      >
        <MaterialIcons name="add-comment" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
