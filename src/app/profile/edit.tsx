import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  Pressable,
  Alert,
  Image,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/authStore';

// Mock avatars for selection
const MOCK_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
];

export default function ProfileEditScreen() {
  const router = useRouter();
  const { user, setUser, logout } = useAuthStore();

  // Form Fields
  const [salutation, setSalutation] = useState(user?.salutation ?? '');
  const [name, setName] = useState(user?.name ?? '');
  const [gender, setGender] = useState(user?.gender ?? '');
  const [birthday, setBirthday] = useState(user?.birthday ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '+84339464751');
  const [email, setEmail] = useState(user?.email ?? 't.vinh.1109z@gmail.com');

  // Verification states (Mocked)
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isIdentityVerified, setIsIdentityVerified] = useState(false);
  const [avatarUri, setAvatarUri] = useState<string | null>(user?.avatar ?? null);

  // Modal visibilities
  const [salutationModalVisible, setSalutationModalVisible] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
  const [birthdayModalVisible, setBirthdayModalVisible] = useState(false);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  
  // Custom Interaction modals
  const [emailOtpModalVisible, setEmailOtpModalVisible] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [identityScanVisible, setIdentityScanVisible] = useState(false);

  // Load user data on mount
  useEffect(() => {
    if (user) {
      setSalutation(user.salutation ?? '');
      setName(user.name ?? '');
      setGender(user.gender ?? '');
      setBirthday(user.birthday ?? '');
      setPhone(user.phone ?? '+84339464751');
      setEmail(user.email ?? '');
      setAvatarUri(user.avatar ?? null);
    }
  }, [user]);

  // Handle Updates
  const handleUpdate = () => {
    if (!name.trim()) {
      Alert.alert('Lỗi', 'Họ tên không được để trống.');
      return;
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Lỗi', 'Email không hợp lệ.');
      return;
    }

    const updatedUser = {
      ...user,
      id: user?.id ?? 'user-1',
      name: name.trim(),
      salutation,
      gender,
      birthday,
      phone,
      email: email.trim(),
      avatar: avatarUri ?? undefined,
    };

    setUser(updatedUser);
    Alert.alert('Thành công', 'Thông tin tài khoản đã được cập nhật!', [
      { text: 'OK', onPress: () => router.back() },
    ]);
  };

  // Handle Delete Account
  const handleDeleteAccount = () => {
    Alert.alert(
      'Xóa tài khoản',
      'Bạn có chắc chắn muốn xóa tài khoản này không? Tất cả lịch sử mua hàng và ưu đãi sẽ bị hủy và không thể khôi phục.',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Xác nhận lần cuối',
              'Hành động này là không thể rút lại. Bạn thực sự muốn xóa tài khoản của mình chứ?',
              [
                { text: 'Quay lại', style: 'cancel' },
                {
                  text: 'Xác nhận xóa',
                  style: 'destructive',
                  onPress: async () => {
                    await logout();
                    router.replace('/(auth)/login');
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  // Trigger simulated email OTP send
  const handleSendEmailVerification = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      Alert.alert('Lỗi', 'Vui lòng điền địa chỉ email hợp lệ trước.');
      return;
    }
    setEmailOtpModalVisible(true);
    setOtpCode('');
    // Inform user of OTP code
    setTimeout(() => {
      Alert.alert('Mã OTP mô phỏng', 'Mã xác thực của bạn là: 1234');
    }, 500);
  };

  // Verify OTP code
  const handleVerifyOtp = () => {
    if (otpCode === '1234') {
      setIsEmailVerified(true);
      setEmailOtpModalVisible(false);
      Alert.alert('Thành công', 'Xác thực địa chỉ email thành công!');
    } else {
      Alert.alert('Lỗi', 'Mã xác thực không chính xác. Thử lại với mã: 1234');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="bg-white border-b border-slate-100 px-4 py-3 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center rounded-full active:bg-slate-100"
          >
            <MaterialIcons name="arrow-back" size={24} color="#1E293B" />
          </TouchableOpacity>
          <Text className="text-slate-800 text-lg font-black tracking-tight text-center flex-1">
            Cập nhật tài khoản
          </Text>
          <View className="w-10" />
        </View>

        <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
          {/* Avatar Section */}
          <View className="items-center mt-6 mb-6">
            <TouchableOpacity
              onPress={() => setAvatarModalVisible(true)}
              className="relative"
              activeOpacity={0.8}
            >
              <View className="w-24 h-24 rounded-full bg-[#6ed6f2] items-center justify-center overflow-hidden border-2 border-sky-100 shadow-sm">
                {avatarUri ? (
                  <Image source={{ uri: avatarUri }} className="w-full h-full" />
                ) : (
                  <MaterialIcons name="person" size={56} color="white" />
                )}
              </View>
              {/* Camera Icon Overlay */}
              <View className="absolute bottom-0 right-0 bg-[#6ed6f2] p-1.5 rounded-full border-2 border-white shadow">
                <MaterialIcons name="photo-camera" size={14} color="white" />
              </View>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}

          {/* Salutation */}
          <View className="mb-4">
            <Text className="text-slate-700 text-xs font-black uppercase tracking-wider mb-1.5">
              Xưng hô
            </Text>
            <TouchableOpacity
              onPress={() => setSalutationModalVisible(true)}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3.5 flex-row items-center justify-between active:bg-slate-100"
            >
              <Text className={`font-semibold text-sm ${salutation ? 'text-slate-800' : 'text-slate-400'}`}>
                {salutation || 'Chọn danh xưng'}
              </Text>
              <MaterialIcons name="keyboard-arrow-down" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Full Name */}
          <View className="mb-4">
            <Text className="text-slate-700 text-xs font-black uppercase tracking-wider mb-1.5">
              Họ Tên
            </Text>
            <TextInput
              value={name}
              onChangeText={setName}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3 text-slate-800 font-semibold text-sm focus:border-[#6ed6f2] focus:bg-white"
              placeholder="Nhập họ và tên"
            />
          </View>

          {/* Gender */}
          <View className="mb-4">
            <Text className="text-slate-700 text-xs font-black uppercase tracking-wider mb-1.5">
              Giới tính
            </Text>
            <TouchableOpacity
              onPress={() => setGenderModalVisible(true)}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3.5 flex-row items-center justify-between active:bg-slate-100"
            >
              <Text className={`font-semibold text-sm ${gender ? 'text-slate-800' : 'text-slate-400'}`}>
                {gender || 'Chọn giới tính'}
              </Text>
              <MaterialIcons name="keyboard-arrow-down" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Birthday */}
          <View className="mb-4">
            <Text className="text-slate-700 text-xs font-black uppercase tracking-wider mb-1.5">
              Ngày sinh
            </Text>
            <TouchableOpacity
              onPress={() => setBirthdayModalVisible(true)}
              className="bg-slate-50 border border-slate-200/80 rounded-2xl px-4 py-3.5 flex-row items-center justify-between active:bg-slate-100"
            >
              <Text className={`font-semibold text-sm ${birthday ? 'text-slate-800' : 'text-slate-400'}`}>
                {birthday || 'Chọn ngày sinh'}
              </Text>
              <MaterialIcons name="calendar-today" size={16} color="#64748B" />
            </TouchableOpacity>
          </View>

          {/* Phone */}
          <View className="mb-4">
            <Text className="text-slate-700 text-xs font-black uppercase tracking-wider mb-1.5">
              Số điện thoại
            </Text>
            <View className="bg-slate-100 border border-slate-200/50 rounded-2xl px-4 py-3.5">
              <Text className="text-slate-500 font-semibold text-sm">{phone}</Text>
            </View>
          </View>

          {/* Email */}
          <View className="mb-4">
            <View className="flex-row justify-between items-center mb-1.5">
              <Text className="text-slate-700 text-xs font-black uppercase tracking-wider">
                Email
              </Text>
              {!isEmailVerified && (
                <TouchableOpacity onPress={handleSendEmailVerification} activeOpacity={0.7}>
                  <Text className="text-amber-600 text-xs font-black">Xác thực ngay ›</Text>
                </TouchableOpacity>
              )}
            </View>
            <View className="relative">
              <TextInput
                value={email}
                onChangeText={(val) => {
                  setEmail(val);
                  setIsEmailVerified(false); // Reset verification on change
                }}
                className={`bg-slate-50 border ${
                  !isEmailVerified ? 'border-amber-200' : 'border-slate-200/80'
                } rounded-2xl pl-4 pr-10 py-3 text-slate-800 font-semibold text-sm focus:border-[#6ed6f2] focus:bg-white`}
                placeholder="Nhập địa chỉ email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {!isEmailVerified ? (
                <View className="absolute right-3.5 top-3.5">
                  <MaterialIcons name="error-outline" size={18} color="#D97706" />
                </View>
              ) : (
                <View className="absolute right-3.5 top-3.5">
                  <MaterialIcons name="check-circle" size={18} color="#10B981" />
                </View>
              )}
            </View>
            <Text className="text-slate-400 text-[10px] mt-1.5 leading-snug">
              Bạn sẽ nhận được lịch sử đơn hàng và hóa đơn qua địa chỉ email này.
            </Text>
          </View>

          {/* Identity Verification Alert Banner */}
          <TouchableOpacity
            onPress={() => setIdentityScanVisible(true)}
            className="bg-sky-50 border border-sky-100 rounded-2xl p-4 flex-row items-center gap-3 mt-4 mb-6 shadow-sm active:bg-sky-100/50"
            activeOpacity={0.8}
          >
            <View className="w-9 h-9 rounded-full bg-sky-100 items-center justify-center">
              <MaterialIcons name="verified-user" size={20} color="#0284c7" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center gap-1.5">
                <Text className="text-[#0284c7] text-xs font-black">Xác thực danh tính</Text>
                {isIdentityVerified && (
                  <View className="bg-emerald-100 px-1.5 py-0.5 rounded">
                    <Text className="text-[8px] text-emerald-700 font-black">Đã xác minh</Text>
                  </View>
                )}
              </View>
              <Text className="text-sky-700/80 text-[10px] mt-0.5 leading-snug">
                Vui lòng hoàn tất xác minh danh tính bằng cách quét mặt hoặc giấy tờ tùy thân ngay hôm nay, để bảo vệ tài khoản của bạn và giao dịch an toàn hơn.
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="#0284c7" />
          </TouchableOpacity>

          {/* Bottom Action buttons */}
          <View className="mb-8 mt-2">
            <TouchableOpacity
              onPress={handleUpdate}
              className="bg-[#6ed6f2] rounded-full py-4 items-center justify-center shadow-sm active:opacity-90"
              activeOpacity={0.8}
            >
              <Text className="text-white text-sm font-extrabold">Cập nhật</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleDeleteAccount}
              className="items-center py-3 mt-2"
              activeOpacity={0.7}
            >
              <Text className="text-red-500 text-xs font-black">Xoá tài khoản</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ────────────────────────────────────────────────────────────────
          CUSTOM PICKER MODALS
         ──────────────────────────────────────────────────────────────── */}

      {/* Salutation Picker */}
      <CustomSelectModal
        visible={salutationModalVisible}
        onClose={() => setSalutationModalVisible(false)}
        title="Danh xưng"
        options={['Anh', 'Chị', 'Khác']}
        selectedValue={salutation}
        onSelect={setSalutation}
      />

      {/* Gender Picker */}
      <CustomSelectModal
        visible={genderModalVisible}
        onClose={() => setGenderModalVisible(false)}
        title="Giới tính"
        options={['Nam', 'Nữ', 'Khác']}
        selectedValue={gender}
        onSelect={setGender}
      />

      {/* Birthday Picker */}
      <CustomBirthdayModal
        visible={birthdayModalVisible}
        onClose={() => setBirthdayModalVisible(false)}
        birthdayString={birthday}
        onConfirm={setBirthday}
      />

      {/* Avatar Picker */}
      <AvatarSelectionModal
        visible={avatarModalVisible}
        onClose={() => setAvatarModalVisible(false)}
        onSelect={(uri) => {
          setAvatarUri(uri);
          setAvatarModalVisible(false);
          Alert.alert('Thành công', 'Đã thay đổi ảnh đại diện mới.');
        }}
        onRemove={() => {
          setAvatarUri(null);
          setAvatarModalVisible(false);
          Alert.alert('Thành công', 'Đã xóa ảnh đại diện.');
        }}
        currentUri={avatarUri}
      />

      {/* Email OTP Verification Modal */}
      <EmailOtpModal
        visible={emailOtpModalVisible}
        onClose={() => setEmailOtpModalVisible(false)}
        email={email}
        otpCode={otpCode}
        setOtpCode={setOtpCode}
        onVerify={handleVerifyOtp}
      />

      {/* Identity Scanner Camera Viewfinder Modal */}
      <IdentityScannerModal
        visible={identityScanVisible}
        onClose={() => setIdentityScanVisible(false)}
        onScanComplete={() => {
          setIsIdentityVerified(true);
          setIdentityScanVisible(false);
          Alert.alert('Thành công', 'Xác thực danh tính thành công! Tài khoản của bạn hiện đã được bảo vệ tối đa.');
        }}
      />
    </SafeAreaView>
  );
}

// ────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ────────────────────────────────────────────────────────────────

interface CustomSelectModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const CustomSelectModal = ({
  visible,
  onClose,
  title,
  options,
  selectedValue,
  onSelect,
}: CustomSelectModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40 justify-end" onPress={onClose}>
        <View className="bg-white rounded-t-3xl p-5 pb-8 max-h-[50%]">
          <View className="flex-row justify-between items-center mb-4 pb-2 border-b border-slate-100">
            <Text className="text-slate-800 text-base font-black">{title}</Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <MaterialIcons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {options.map((option) => {
              const isSelected = selectedValue === option;
              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    onSelect(option);
                    onClose();
                  }}
                  className={`py-3.5 px-4 rounded-2xl mb-2 flex-row justify-between items-center ${
                    isSelected ? 'bg-sky-50' : 'active:bg-slate-50'
                  }`}
                  activeOpacity={0.7}
                >
                  <Text className={`font-semibold text-sm ${isSelected ? 'text-sky-600 font-bold' : 'text-slate-700'}`}>
                    {option}
                  </Text>
                  {isSelected && <MaterialIcons name="check" size={18} color="#0284c7" />}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Pressable>
    </Modal>
  );
};

interface CustomBirthdayModalProps {
  visible: boolean;
  onClose: () => void;
  birthdayString: string;
  onConfirm: (bday: string) => void;
}

const CustomBirthdayModal = ({
  visible,
  onClose,
  birthdayString,
  onConfirm,
}: CustomBirthdayModalProps) => {
  // Parse initial birthday
  const parseBirthday = (str: string) => {
    const parts = str.split('/');
    if (parts.length === 3) {
      return {
        d: parseInt(parts[0], 10),
        m: parseInt(parts[1], 10),
        y: parseInt(parts[2], 10),
      };
    }
    return { d: 11, m: 9, y: 2000 }; // Default
  };

  const initial = parseBirthday(birthdayString);
  const [day, setDay] = useState(initial.d);
  const [month, setMonth] = useState(initial.m);
  const [year, setYear] = useState(initial.y);

  useEffect(() => {
    if (visible) {
      const current = parseBirthday(birthdayString);
      setDay(current.d);
      setMonth(current.m);
      setYear(current.y);
    }
  }, [birthdayString, visible]);

  // Generators
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 90 }, (_, i) => currentYear - i); // Last 90 years

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40 justify-end" onPress={onClose}>
        <View className="bg-white rounded-t-3xl p-5 pb-8 h-[45%]">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4 pb-2 border-b border-slate-100">
            <TouchableOpacity onPress={onClose} className="py-1 px-2">
              <Text className="text-slate-500 font-bold text-sm">Hủy</Text>
            </TouchableOpacity>
            <Text className="text-slate-800 font-black text-base">Chọn ngày sinh</Text>
            <TouchableOpacity
              onPress={() => {
                const formattedDay = day < 10 ? `0${day}` : `${day}`;
                const formattedMonth = month < 10 ? `0${month}` : `${month}`;
                onConfirm(`${formattedDay}/${formattedMonth}/${year}`);
                onClose();
              }}
              className="py-1 px-2"
            >
              <Text className="text-sky-600 font-black text-sm">Xác nhận</Text>
            </TouchableOpacity>
          </View>

          {/* Scroll lists side by side */}
          <View className="flex-row flex-1 justify-between gap-2">
            {/* Day Column */}
            <View className="flex-1 items-center">
              <Text className="text-slate-400 text-[10px] font-black uppercase tracking-wider mb-2">Ngày</Text>
              <ScrollView showsVerticalScrollIndicator={false} className="w-full">
                {days.map((d) => {
                  const isSelected = d === day;
                  return (
                    <TouchableOpacity
                      key={d}
                      onPress={() => setDay(d)}
                      className={`py-2.5 items-center rounded-xl my-0.5 ${
                        isSelected ? 'bg-sky-50' : 'active:bg-slate-50'
                      }`}
                    >
                      <Text className={`text-xs font-semibold ${isSelected ? 'text-sky-600 font-black' : 'text-slate-600'}`}>
                        {d}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Month Column */}
            <View className="flex-1 items-center border-l border-r border-slate-100">
              <Text className="text-slate-400 text-[10px] font-black uppercase tracking-wider mb-2">Tháng</Text>
              <ScrollView showsVerticalScrollIndicator={false} className="w-full">
                {months.map((m) => {
                  const isSelected = m === month;
                  return (
                    <TouchableOpacity
                      key={m}
                      onPress={() => setMonth(m)}
                      className={`py-2.5 items-center rounded-xl my-0.5 ${
                        isSelected ? 'bg-sky-50' : 'active:bg-slate-50'
                      }`}
                    >
                      <Text className={`text-xs font-semibold ${isSelected ? 'text-sky-600 font-black' : 'text-slate-600'}`}>
                        {m}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            {/* Year Column */}
            <View className="flex-1 items-center">
              <Text className="text-slate-400 text-[10px] font-black uppercase tracking-wider mb-2">Năm</Text>
              <ScrollView showsVerticalScrollIndicator={false} className="w-full">
                {years.map((y) => {
                  const isSelected = y === year;
                  return (
                    <TouchableOpacity
                      key={y}
                      onPress={() => setYear(y)}
                      className={`py-2.5 items-center rounded-xl my-0.5 ${
                        isSelected ? 'bg-sky-50' : 'active:bg-slate-50'
                      }`}
                    >
                      <Text className={`text-xs font-semibold ${isSelected ? 'text-sky-600 font-black' : 'text-slate-600'}`}>
                        {y}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

interface AvatarSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (uri: string) => void;
  onRemove: () => void;
  currentUri: string | null;
}

const AvatarSelectionModal = ({
  visible,
  onClose,
  onSelect,
  onRemove,
  currentUri,
}: AvatarSelectionModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40 justify-end" onPress={onClose}>
        <View className="bg-white rounded-t-3xl p-5 pb-8">
          <View className="flex-row justify-between items-center mb-4 pb-2 border-b border-slate-100">
            <Text className="text-slate-800 text-base font-black">Ảnh đại diện</Text>
            <TouchableOpacity onPress={onClose} className="p-1">
              <MaterialIcons name="close" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>
          
          <Text className="text-slate-500 text-xs font-bold mb-3">Chọn ảnh mẫu từ thư viện:</Text>
          <View className="flex-row gap-3 justify-center mb-5 mt-1">
            {MOCK_AVATARS.map((url, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => onSelect(url)}
                className="w-14 h-14 rounded-full overflow-hidden border-2 border-slate-200 active:border-[#6ed6f2]"
              >
                <Image source={{ uri: url }} className="w-full h-full" />
              </TouchableOpacity>
            ))}
          </View>

          {currentUri && (
            <TouchableOpacity
              onPress={onRemove}
              className="py-4 border-t border-slate-100 flex-row items-center justify-center gap-2"
            >
              <MaterialIcons name="delete" size={20} color="#EF4444" />
              <Text className="text-red-500 font-bold text-sm">Gỡ ảnh đại diện hiện tại</Text>
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

interface EmailOtpModalProps {
  visible: boolean;
  onClose: () => void;
  email: string;
  otpCode: string;
  setOtpCode: (code: string) => void;
  onVerify: () => void;
}

const EmailOtpModal = ({
  visible,
  onClose,
  email,
  otpCode,
  setOtpCode,
  onVerify,
}: EmailOtpModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/50 justify-center items-center px-6">
        <Pressable className="bg-white rounded-3xl p-6 w-full max-w-sm">
          <View className="items-center mb-4">
            <View className="w-12 h-12 bg-amber-50 rounded-full items-center justify-center mb-2">
              <MaterialIcons name="email" size={24} color="#D97706" />
            </View>
            <Text className="text-slate-800 text-base font-black text-center">Xác thực email</Text>
            <Text className="text-slate-500 text-xs text-center mt-1">
              Mã xác thực đã được gửi tới:{'\n'}
              <Text className="font-semibold text-slate-700">{email}</Text>
            </Text>
          </View>

          <TextInput
            value={otpCode}
            onChangeText={setOtpCode}
            keyboardType="number-pad"
            maxLength={4}
            className="bg-slate-50 border border-slate-200 rounded-2xl py-3 px-4 text-center font-bold text-lg tracking-widest text-slate-800 mb-4"
            placeholder="• • • •"
            autoFocus
          />

          <View className="flex-row gap-3">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 border border-slate-200 py-3 rounded-full items-center active:bg-slate-50"
            >
              <Text className="text-slate-500 font-bold text-xs">Hủy bỏ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onVerify}
              className="flex-1 bg-[#6ed6f2] py-3 rounded-full items-center active:opacity-90"
            >
              <Text className="text-white font-extrabold text-xs">Xác minh</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

interface IdentityScannerModalProps {
  visible: boolean;
  onClose: () => void;
  onScanComplete: () => void;
}

const IdentityScannerModal = ({
  visible,
  onClose,
  onScanComplete,
}: IdentityScannerModalProps) => {
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let animation: Animated.CompositeAnimation | null = null;
    if (visible) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(scanAnim, {
            toValue: 200,
            duration: 1800,
            useNativeDriver: true,
          }),
          Animated.timing(scanAnim, {
            toValue: 0,
            duration: 1800,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
    } else {
      scanAnim.setValue(0);
    }
    return () => {
      if (animation) animation.stop();
    };
  }, [visible]);

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 bg-slate-900 px-6 justify-between py-12">
        {/* Header */}
        <View className="flex-row justify-between items-center">
          <TouchableOpacity onPress={onClose} className="p-2 bg-slate-800/80 rounded-full">
            <MaterialIcons name="close" size={20} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-base font-black">Xác thực danh tính</Text>
          <View className="w-9" />
        </View>

        {/* Viewfinder Area */}
        <View className="items-center justify-center my-6">
          <View className="w-64 h-64 border-2 border-dashed border-[#6ed6f2] rounded-3xl relative overflow-hidden items-center justify-center bg-slate-950">
            {/* Corner Bracket decorations */}
            <View className="absolute top-4 left-4 w-6 h-6 border-t-4 border-l-4 border-[#6ed6f2]" />
            <View className="absolute top-4 right-4 w-6 h-6 border-t-4 border-r-4 border-[#6ed6f2]" />
            <View className="absolute bottom-4 left-4 w-6 h-6 border-b-4 border-l-4 border-[#6ed6f2]" />
            <View className="absolute bottom-4 right-4 w-6 h-6 border-b-4 border-r-4 border-[#6ed6f2]" />

            {/* Silhouette outline */}
            <MaterialIcons name="face" size={120} color="rgba(255,255,255,0.15)" />

            {/* Animated Laser Scan Bar */}
            <Animated.View
              style={{
                transform: [{ translateY: scanAnim }],
              }}
              className="absolute left-4 right-4 h-1 bg-[#6ed6f2] shadow shadow-cyan-300"
            />
          </View>
          <Text className="text-slate-400 text-xs text-center px-10 mt-6 leading-snug">
            Căn chỉnh khuôn mặt hoặc giấy tờ tùy thân của bạn vào khung hình để bắt đầu quét tự động.
          </Text>
        </View>

        {/* Action Button */}
        <View className="items-center mb-4">
          <TouchableOpacity
            onPress={onScanComplete}
            className="bg-[#6ed6f2] px-8 py-4 rounded-full flex-row items-center gap-2 active:opacity-90 shadow shadow-cyan-500/20"
          >
            <MaterialIcons name="photo-camera" size={18} color="white" />
            <Text className="text-white text-xs font-black">Quét ngay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
