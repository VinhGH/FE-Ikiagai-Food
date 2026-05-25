import { useState } from 'react';
import { registerApi, RegisterPayload } from '../../../services/auth.service';
import { useAuthStore } from '../../../store/authStore';

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((s) => s.login);

  const mutate = async (payload: RegisterPayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await registerApi(payload);
      // Lưu token và user vào Zustand store và AsyncStorage
      await login(response.accessToken, response.user);
    } catch (err: any) {
      console.error('[useRegister] Đăng ký thất bại:', err);
      // Lấy message lỗi từ backend (có thể là string hoặc array của NestJS/Zod)
      const msg = err.response?.data?.message || err.message || 'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.';
      setError(Array.isArray(msg) ? msg.join(', ') : msg);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error, setError };
}
