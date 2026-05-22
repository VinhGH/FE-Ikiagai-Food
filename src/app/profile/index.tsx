import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

export default function ProfileDashboardScreen() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  const handleNavigateToEdit = () => {
    router.push('/profile/edit');
  };

  // Helper component for section rows
  const MenuItem = ({ icon, label, onPress }: { icon: string; label: string; onPress?: () => void }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center justify-between py-3.5 border-b border-gray-100/50"
    >
      <View className="flex-row items-center flex-1">
        <MaterialIcons name={icon as any} size={20} color="#64748B" />
        <Text className="text-sm font-semibold text-slate-800 ml-3">{label}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={20} color="#CBD5E1" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        {/* Profile Card Header (Avatar, Name, Edit link) */}
        <View className="mx-4 mt-3 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 flex-row items-center justify-between">
          <View className="flex-row items-center flex-1">
            {/* Avatar Circle */}
            <View className="w-12 h-12 rounded-full items-center justify-center mr-3 bg-[#6ed6f2] overflow-hidden border border-sky-100">
              {user?.avatar ? (
                <Image source={{ uri: user.avatar }} className="w-full h-full" />
              ) : (
                <MaterialIcons name="person" size={28} color="white" />
              )}
            </View>
            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="text-base font-black text-slate-800 tracking-tight">
                  {user?.name ?? 'Thái Vinh'}
                </Text>
                <MaterialIcons name="verified" size={16} color="#F59E0B" className="ml-1" />
              </View>
              <Text className="text-xs text-slate-500 mt-0.5">
                {user?.phone ?? '+84339464751'}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity 
            onPress={handleNavigateToEdit}
            className="flex-row items-center bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-full"
            activeOpacity={0.7}
          >
            <Text className="text-xs font-bold text-slate-600 mr-0.5">Hồ sơ</Text>
            <MaterialIcons name="chevron-right" size={14} color="#64748B" />
          </TouchableOpacity>
        </View>

        {/* GREEN FOOD RACE BANNER */}
        <View className="mx-4 mt-3 bg-emerald-50 border border-emerald-100 rounded-2xl p-4 shadow-sm">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
              <MaterialIcons name="eco" size={16} color="#10B981" />
              <Text className="text-emerald-800 text-xs font-black tracking-wider ml-1 uppercase">GREEN FOOD RACE</Text>
            </View>
            <TouchableOpacity className="bg-emerald-100/50 border border-emerald-200/30 px-2 py-0.5 rounded-full">
              <Text className="text-emerald-700 text-[10px] font-bold">Xem tiến trình ›</Text>
            </TouchableOpacity>
          </View>
          
          {/* Tagline */}
          <View className="flex-row items-center mb-3">
            <Text className="text-emerald-900 text-xs font-bold flex-1 leading-snug">
              Đã giảm lượng CO2 tương đương
            </Text>
            <View className="bg-amber-100 border border-amber-200 rounded px-2.5 py-0.5">
              <Text className="text-amber-800 text-xs font-black">70 cây xanh</Text>
            </View>
            <Text className="text-emerald-900 text-xs font-bold ml-1.5">quang hợp/ngày</Text>
          </View>

          {/* Stats columns */}
          <View className="flex-row justify-between pt-3 border-t border-emerald-100/60">
            <View className="flex-1 items-center border-r border-emerald-100/50 pr-1">
              <Text className="text-[9px] text-emerald-700 font-medium text-center leading-tight">Đóng góp quỹ</Text>
              <Text className="text-[9px] text-emerald-700 font-medium text-center leading-tight mb-1">Vì tương lai xanh</Text>
              <Text className="text-[11px] text-emerald-800 font-black">1.300 VNĐ</Text>
            </View>
            <View className="flex-1 items-center border-r border-emerald-100/50 px-1">
              <Text className="text-[9px] text-emerald-700 font-medium text-center leading-tight">Tổng KM</Text>
              <Text className="text-[9px] text-emerald-700 font-medium text-center leading-tight mb-1">đã giao nhận</Text>
              <Text className="text-[11px] text-emerald-800 font-black">88</Text>
            </View>
            <View className="flex-1 items-center pl-1">
              <Text className="text-[9px] text-emerald-700 font-medium text-center leading-tight">KM tích lũy</Text>
              <Text className="text-[9px] text-emerald-700 font-medium text-center leading-tight mb-1">năm 2026</Text>
              <Text className="text-[11px] text-emerald-800 font-black">49</Text>
            </View>
          </View>
        </View>

        {/* Quick Action Cards (Thanh toán, Ví Ikigai, Địa chỉ đã lưu) */}
        <View className="flex-row px-4 mt-3 gap-3">
          <TouchableOpacity 
            onPress={() => router.push('/payment/methods')}
            className="flex-1 bg-white border border-slate-100 rounded-2xl p-3 shadow-sm items-center"
            activeOpacity={0.7}
          >
            <View className="w-9 h-9 rounded-full bg-blue-50 items-center justify-center mb-1.5">
              <MaterialIcons name="account-balance-wallet" size={18} color="#2563EB" />
            </View>
            <Text className="text-xs font-black text-slate-800">Thanh toán</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="flex-1 bg-white border border-slate-100 rounded-2xl p-3 shadow-sm items-center">
            <View className="w-9 h-9 rounded-full bg-teal-50 items-center justify-center mb-1.5">
              <MaterialIcons name="business-center" size={18} color="#0D9488" />
            </View>
            <Text className="text-xs font-black text-slate-800" numberOfLines={1}>Doanh nghiệp</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-white border border-slate-100 rounded-2xl p-3 shadow-sm items-center">
            <View className="w-9 h-9 rounded-full bg-emerald-50 items-center justify-center mb-1.5">
              <MaterialIcons name="home" size={18} color="#059669" />
            </View>
            <Text className="text-xs font-black text-slate-800" numberOfLines={1}>Địa chỉ lưu</Text>
          </TouchableOpacity>
        </View>

        {/* Verify Email Alert */}
        <TouchableOpacity 
          onPress={handleNavigateToEdit}
          className="mx-4 mt-3 bg-amber-50 border border-amber-100 rounded-2xl p-3 flex-row items-center gap-3"
        >
          <MaterialIcons name="warning" size={20} color="#D97706" />
          <View className="flex-1">
            <Text className="text-xs font-black text-amber-800">Xác thực email</Text>
            <Text className="text-[10px] text-amber-700/80 mt-0.5 leading-snug">
              Bạn có thể nhận Hóa đơn, Biên lai mua hàng qua email đã được xác thực.
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={18} color="#D97706" />
        </TouchableOpacity>

        {/* Verify Identity Alert */}
        <TouchableOpacity 
          onPress={handleNavigateToEdit}
          className="mx-4 mt-3 bg-sky-50 border border-sky-100 rounded-2xl p-3 flex-row items-center gap-3"
        >
          <MaterialIcons name="info" size={20} color="#6ed6f2" />
          <View className="flex-1">
            <Text className="text-xs font-black text-[#6ed6f2]">Xác thực danh tính</Text>
            <Text className="text-[10px] text-sky-700/80 mt-0.5 leading-snug">
              Vui lòng hoàn tất xác minh danh tính bằng cách quét mặt hoặc giấy tờ tùy thân để bảo vệ tài khoản tốt hơn.
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={18} color="#6ed6f2" />
        </TouchableOpacity>

        {/* Banner Promo Card */}
        <TouchableOpacity className="mx-4 mt-3 bg-sky-100/50 border border-sky-200/40 rounded-2xl p-3.5 flex-row items-center justify-between shadow-sm">
          <View className="flex-1 pr-3">
            <Text className="text-xs font-black text-sky-900">Quà tặng xịn dành tặng người thân...</Text>
            <Text className="text-[10px] text-sky-700 mt-1">Quà nho nhỏ, trao gửi niềm vui to!</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="#0284c7" />
        </TouchableOpacity>

        {/* SECTION: Hạng thành viên & Ưu đãi */}
        <View className="mx-4 mt-4 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Hạng thành viên & Ưu đãi</Text>
          <MenuItem icon="card-giftcard" label="Gói hội viên" />
          <MenuItem icon="confirmation-number" label="Mã khuyến mại" />
          <MenuItem icon="star-border" label="Hạng thành viên" />
          <MenuItem icon="share" label="Giới thiệu bạn bè" />
        </View>

        {/* SECTION: Thông tin cá nhân */}
        <View className="mx-4 mt-3 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Thông tin cá nhân</Text>
          <MenuItem icon="history" label="Lịch sử hoạt động" onPress={() => router.push('/activity')} />
          <MenuItem icon="receipt" label="Thông tin hoá đơn" />
          <MenuItem icon="pin-drop" label="Địa chỉ đã lưu" />
        </View>

        {/* SECTION: Hỗ trợ */}
        <View className="mx-4 mt-3 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Hỗ trợ</Text>
          <MenuItem icon="gavel" label="Điều khoản và Chính sách" />
          <MenuItem icon="headset-mic" label="Trung tâm hỗ trợ" />
          <MenuItem icon="business" label="Thông tin công ty" />
        </View>

        {/* SECTION: Cơ hội hợp tác */}
        <View className="mx-4 mt-3 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Cơ hội hợp tác</Text>
          <MenuItem icon="storefront" label="Hợp tác nhà hàng" />
          <MenuItem icon="delivery-dining" label="Trở thành đối tác giao hàng" />
        </View>

        {/* SECTION: Cài đặt chung */}
        <View className="mx-4 mt-3 bg-white rounded-2xl border border-slate-100 p-4 shadow-sm">
          <Text className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Cài đặt chung</Text>
          <MenuItem icon="language" label="Ngôn ngữ" />
          <MenuItem icon="security" label="Đăng nhập & Bảo mật" />
        </View>

        {/* Satisfaction Rating Card */}
        <TouchableOpacity className="mx-4 mt-3 bg-slate-100 border border-slate-200/50 rounded-2xl p-4 flex-row items-center justify-between">
          <View className="flex-1 pr-4">
            <Text className="text-xs font-black text-slate-800">Bạn có hài lòng với ứng dụng chứ?</Text>
            <Text className="text-[10px] text-slate-500 mt-1 leading-snug">Phản hồi của bạn sẽ giúp Ikigai Food ngày càng hoàn thiện hơn.</Text>
          </View>
          <View className="w-8 h-8 rounded-full bg-white border border-slate-200 items-center justify-center">
            <MaterialIcons name="chevron-right" size={20} color="#64748B" />
          </View>
        </TouchableOpacity>

        {/* Logout Button */}
        <TouchableOpacity 
          onPress={handleLogout}
          className="mx-4 mt-6 bg-white border border-red-200 rounded-2xl py-4 flex-row items-center justify-center gap-2 shadow-sm active:bg-red-50"
          activeOpacity={0.7}
        >
          <MaterialIcons name="logout" size={18} color="#EF4444" />
          <Text className="text-red-500 font-extrabold text-sm">Đăng xuất</Text>
        </TouchableOpacity>

        {/* Version Footer */}
        <Text className="text-center text-[10px] text-slate-400 mt-6">
          Ikigai Food - v5.1.0(517)
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}
