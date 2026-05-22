// ──────────────────────────────────────────────────────────────────
// app/profile/index.tsx  ← chỉ render, data từ useUserProfile()
// ──────────────────────────────────────────────────────────────────

import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useUserProfile } from '../../features/profile/hooks/useUserProfile';

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useUserProfile();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-primary-dark pt-14 pb-4 px-4 flex-row items-center">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-4 w-11 h-11 items-center justify-center"
          accessibilityLabel="Quay lại"
          accessibilityRole="button"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold flex-1">Tài khoản</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Profile Card – data từ authStore qua useUserProfile */}
        <View className="bg-white rounded-2xl mx-4 mt-6 p-4 shadow-sm border border-outline-variant relative">
          <View className="flex-row items-center mb-4">
            <View className="w-16 h-16 bg-primary rounded-full items-center justify-center mr-4">
              <MaterialIcons name="person" size={40} color="white" />
            </View>
            <View className="flex-1">
              {/* Hiển thị tên từ store, fallback về "Khách" nếu chưa login */}
              <Text className="text-2xl font-extrabold text-on-surface">
                {user?.name ?? 'Khách'}
              </Text>
              {user?.email ? (
                <Text className="text-sm text-on-surface-variant mt-0.5">
                  {user.email}
                </Text>
              ) : null}
            </View>
            <TouchableOpacity
              className="bg-primary-light px-4 py-2 rounded-full min-h-[44px] justify-center"
              activeOpacity={0.7}
              accessibilityLabel="Chỉnh sửa hồ sơ"
            >
              <Text className="text-primary font-bold">Hồ sơ</Text>
            </TouchableOpacity>
          </View>
          
          <View className="flex-row gap-2 flex-wrap">
            <View className="border border-outline-variant px-3 py-1.5 rounded-full flex-row items-center">
              <MaterialIcons name="all-inclusive" size={16} color="#F59E0B" />
              <Text className="text-xs text-on-surface-variant font-medium ml-1">Gói GrabUnlimited</Text>
            </View>
            <View className="border border-outline-variant px-3 py-1.5 rounded-full flex-row items-center">
              <MaterialIcons name="workspace-premium" size={16} color="#F59E0B" />
              <Text className="text-xs text-on-surface-variant font-medium ml-1">Theo dõi tiến độ</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4 mt-6 mb-2 overflow-visible">
          <View className="bg-white border border-outline-variant rounded-2xl w-40 h-32 p-4 mr-4 shadow-sm">
            <View className="flex-row justify-between mb-2">
              <Text className="font-extrabold text-[#1A1F71] text-lg italic">VISA</Text>
              <View className="bg-gray-100 px-2 py-0.5 rounded">
                <Text className="text-[10px] text-gray-500 font-bold">Mặc định</Text>
              </View>
            </View>
            <View className="flex-1 justify-end">
              <Text className="text-on-surface font-bold">Visa</Text>
              <Text className="text-on-surface-variant text-sm tracking-widest">• • 8069</Text>
            </View>
          </View>

          <TouchableOpacity
            className="bg-white border border-outline-variant rounded-2xl w-40 h-32 p-4 mr-4 shadow-sm justify-center items-center"
            activeOpacity={0.7}
            accessibilityLabel="Thêm phương thức thanh toán"
          >
            <View className="w-8 h-8 rounded-full border border-primary items-center justify-center mb-2">
              <MaterialIcons name="add" size={20} color="#6ed6f2" />
            </View>
            <Text className="text-on-surface text-center text-sm font-medium px-2">Thêm phương thức thanh toán</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Grab For Family / Business */}
        <View className="flex-row px-4 mt-4 gap-4">
          <View className="bg-white flex-1 border border-outline-variant rounded-2xl p-4 h-24 relative overflow-hidden shadow-sm">
            <Text className="font-bold text-on-surface text-sm w-2/3">Grab cho Cả Nhà</Text>
            <View className="absolute -bottom-2 -right-2 bg-primary-light w-14 h-14 rounded-full items-center justify-center">
              <MaterialIcons name="groups" size={28} color="#00687b" />
            </View>
          </View>
          <View className="bg-white flex-1 border border-outline-variant rounded-2xl p-4 h-24 relative overflow-hidden shadow-sm">
            <Text className="font-bold text-on-surface text-sm w-3/4">Trung tâm Doanh nghiệp</Text>
            <View className="absolute -bottom-2 -right-2 bg-orange-100 w-14 h-14 rounded-full items-center justify-center">
              <MaterialIcons name="business-center" size={24} color="#F59E0B" />
            </View>
          </View>
        </View>

        {/* Ưu đãi và tiết kiệm */}
        <View className="bg-white mt-8">
          <Text className="text-xl font-extrabold text-on-surface px-4 py-4 border-b border-outline-variant">Ưu đãi và tiết kiệm</Text>
          
          {[
            { label: 'GrabXu', suffix: '0 GrabXu' },
            { label: 'Gói Hội Viên', suffix: null },
            { label: 'Rewards', suffix: null },
            { label: 'Thử thách', suffix: null },
          ].map(({ label, suffix }) => (
            <TouchableOpacity
              key={label}
              className="flex-row items-center justify-between px-4 py-4 border-b border-outline-variant min-h-[56px]"
              activeOpacity={0.7}
            >
              <Text className="text-base text-on-surface font-medium">{label}</Text>
              <View className="flex-row items-center">
                {suffix ? (
                  <Text className="text-on-surface-variant mr-2">{suffix}</Text>
                ) : null}
                <MaterialIcons name="chevron-right" size={24} color="#9CA3AF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Đăng xuất */}
        <View className="px-4 mt-6 mb-12">
          <TouchableOpacity
            onPress={handleLogout}
            className="border border-red-300 rounded-2xl py-4 items-center min-h-[56px] justify-center"
            activeOpacity={0.7}
            accessibilityLabel="Đăng xuất"
            accessibilityRole="button"
          >
            <Text className="text-red-500 font-bold text-base">Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
