import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useMessageStore } from '../../store/messageStore';

export default function MessagesScreen() {
  const { chats, markAsRead, getUnreadCount } = useMessageStore();
  const [activeTab, setActiveTab] = useState('messages');
  const [activeFilter, setActiveFilter] = useState('all'); // all | shipper | restaurant

  const shippers = chats.filter(c => c.role === 'Shipper');
  const restaurants = chats.filter(c => c.role === 'Nhà hàng');
  const others = chats.filter(c => c.role === 'Hỗ trợ');

  const renderChatItem = (chat: any) => (
    <TouchableOpacity 
      key={chat.id} 
      className="flex-row items-center px-4 py-4 border-b border-slate-50 bg-white"
      activeOpacity={0.7}
      onPress={() => markAsRead(chat.id)}
    >
      {/* Avatar */}
      <View className="relative">
        <Image 
          source={{ uri: chat.avatar }} 
          className="w-14 h-14 rounded-full border border-slate-100 bg-slate-100"
          resizeMode="cover"
        />
        {/* Online Status */}
        <View className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
      </View>

      {/* Chat Info */}
      <View className="flex-1 ml-3 justify-center">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-[15px] font-bold text-slate-800 flex-1" numberOfLines={1}>
            {chat.name}
          </Text>
          <Text className={`text-[11px] font-medium ${chat.unreadCount > 0 ? 'text-[#6ed6f2] font-bold' : 'text-slate-400'}`}>
            {chat.time}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-1 mr-2 flex-row items-center gap-1.5">
            {/* Role Badge */}
            <View className={`${chat.roleColor} px-1.5 py-0.5 rounded-sm`}>
              <Text className={`${chat.roleTextColor} text-[9px] font-black uppercase`}>
                {chat.role}
              </Text>
            </View>
            <Text 
              className={`flex-1 text-[13px] ${chat.unreadCount > 0 ? 'text-slate-800 font-bold' : 'text-slate-500'}`}
              numberOfLines={1}
            >
              {chat.lastMessage}
            </Text>
          </View>

          {chat.unreadCount > 0 && (
            <View className="bg-red-500 w-5 h-5 rounded-full items-center justify-center">
              <Text className="text-white text-[10px] font-bold">
                {chat.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-slate-100 flex-row items-center justify-between">
        <Text className="text-xl font-black text-slate-800">Trò chuyện</Text>
        <TouchableOpacity className="w-8 h-8 bg-slate-100 rounded-full items-center justify-center">
          <MaterialIcons name="search" size={20} color="#475569" />
        </TouchableOpacity>
      </View>

      {/* Main Tabs */}
      <View className="bg-white flex-row border-b border-slate-100">
        <TouchableOpacity 
          className={`flex-1 py-3 ${activeTab === 'messages' ? 'border-b-2 border-[#6ed6f2]' : ''}`}
          onPress={() => setActiveTab('messages')}
        >
          <Text className={`text-center font-bold ${activeTab === 'messages' ? 'text-[#6ed6f2]' : 'text-slate-500 font-medium'}`}>
            Tin nhắn ({getUnreadCount()})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`flex-1 py-3 ${activeTab === 'notifications' ? 'border-b-2 border-[#6ed6f2]' : ''}`}
          onPress={() => setActiveTab('notifications')}
        >
          <Text className={`text-center font-bold ${activeTab === 'notifications' ? 'text-[#6ed6f2]' : 'text-slate-500 font-medium'}`}>
            Thông báo
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'messages' && (
        <>
          {/* Sub Filter Chips */}
          <View className="bg-white px-4 py-3 border-b border-slate-100 flex-row gap-2">
            <TouchableOpacity 
              onPress={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-full border ${activeFilter === 'all' ? 'bg-sky-50 border-sky-200' : 'bg-white border-slate-200'}`}
            >
              <Text className={`text-xs font-bold ${activeFilter === 'all' ? 'text-[#6ed6f2]' : 'text-slate-600'}`}>Tất cả</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setActiveFilter('shipper')}
              className={`px-4 py-1.5 rounded-full border ${activeFilter === 'shipper' ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}
            >
              <Text className={`text-xs font-bold ${activeFilter === 'shipper' ? 'text-green-600' : 'text-slate-600'}`}>Tài xế</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => setActiveFilter('restaurant')}
              className={`px-4 py-1.5 rounded-full border ${activeFilter === 'restaurant' ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}
            >
              <Text className={`text-xs font-bold ${activeFilter === 'restaurant' ? 'text-amber-600' : 'text-slate-600'}`}>Nhà hàng</Text>
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {(activeFilter === 'all' || activeFilter === 'shipper') && shippers.length > 0 && (
              <View className="mb-2">
                <View className="px-4 py-2 bg-slate-50">
                  <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tin nhắn Tài xế</Text>
                </View>
                {shippers.map(renderChatItem)}
              </View>
            )}

            {(activeFilter === 'all' || activeFilter === 'restaurant') && restaurants.length > 0 && (
              <View className="mb-2">
                <View className="px-4 py-2 bg-slate-50">
                  <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tin nhắn Nhà hàng</Text>
                </View>
                {restaurants.map(renderChatItem)}
              </View>
            )}

            {activeFilter === 'all' && others.length > 0 && (
              <View className="mb-2">
                <View className="px-4 py-2 bg-slate-50">
                  <Text className="text-xs font-bold text-slate-500 uppercase tracking-wider">Khác</Text>
                </View>
                {others.map(renderChatItem)}
              </View>
            )}
          </ScrollView>
        </>
      )}

      {activeTab === 'notifications' && (
        <View className="flex-1 items-center justify-center">
          <MaterialIcons name="notifications-none" size={48} color="#CBD5E1" />
          <Text className="text-slate-500 mt-2 font-medium">Chưa có thông báo nào</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
