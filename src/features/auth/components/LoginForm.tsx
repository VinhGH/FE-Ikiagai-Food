import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useLoginAuth } from '../hooks/useLoginAuth';

export function LoginForm() {
  const router = useRouter();
  const { login, isLoading, error } = useLoginAuth();
  const [email, setEmail] = useState('thaole@gmail.com');
  const [password, setPassword] = useState('Password123');

  const handleLogin = async () => {
    await login(email.trim(), password);
  };

  return (
    <View className="flex-1 w-full justify-center">
      <View className="mb-8">
        <Text className="text-3xl font-bold text-on-surface mb-2">Đăng nhập</Text>
        <Text className="text-base text-on-surface-variant">Chào mừng bạn quay lại với Burger House</Text>
      </View>

      <View className="space-y-4">
        {/* Email Field */}
        <View className="space-y-1">
          <Text className="text-sm font-medium text-on-surface-variant mb-1 mt-3">Email</Text>
          <View className="relative justify-center">
            <MaterialIcons name="mail" size={20} color="#6e797d" className="absolute z-10" style={{ position: 'absolute', left: 16 }} />
            <TextInput 
              className="w-full pl-12 pr-4 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-base text-on-surface"
              placeholder="example@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor="#6e797d"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* Password Field */}
        <View className="space-y-1">
          <Text className="text-sm font-medium text-on-surface-variant mb-1 mt-3">Mật khẩu</Text>
          <View className="relative justify-center">
            <MaterialIcons name="lock" size={20} color="#6e797d" className="absolute z-10" style={{ position: 'absolute', left: 16 }} />
            <TextInput 
              className="w-full pl-12 pr-12 py-3 bg-surface-container-low border border-outline-variant rounded-lg text-base text-on-surface"
              placeholder="••••••••"
              secureTextEntry
              placeholderTextColor="#6e797d"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity className="absolute z-10" style={{ position: 'absolute', right: 16 }}>
              <MaterialIcons name="visibility" size={20} color="#6e797d" />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity className="self-end mt-2">
            <Text className="text-primary font-medium">Quên mật khẩu?</Text>
        </TouchableOpacity>

        {error && (
          <Text className="text-red-600 text-sm mt-3">{error}</Text>
        )}

        {/* Submit Button */}
        <TouchableOpacity 
          className={`w-full py-4 bg-primary-container rounded-lg items-center mt-6 shadow-sm active:opacity-80 ${isLoading ? 'opacity-60' : ''}`}
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text className="text-on-primary-container text-lg font-bold">{isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View className="relative my-8 flex-row items-center justify-center">
        <View className="absolute left-0 right-0 h-[1px] bg-outline-variant" />
        <View className="bg-white px-4 z-10">
          <Text className="text-xs text-on-surface-variant uppercase tracking-widest">Hoặc tiếp tục với</Text>
        </View>
      </View>

      {/* Social Logins */}
      <View className="flex-row gap-4">
        <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 py-3 border border-outline-variant rounded-lg bg-white active:bg-surface-container-low mr-2">
          <Text className="font-medium text-on-surface">Google</Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 flex-row items-center justify-center gap-2 py-3 border border-outline-variant rounded-lg bg-white active:bg-surface-container-low ml-2">
          <Text className="font-medium text-on-surface">Facebook</Text>
        </TouchableOpacity>
      </View>

      <View className="mt-8 flex-row justify-center items-center">
        <Text className="text-on-surface-variant">Chưa có tài khoản? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text className="text-primary font-bold">Đăng ký ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
