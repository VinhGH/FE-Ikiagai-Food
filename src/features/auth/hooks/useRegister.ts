import { useState } from 'react';
import { api } from '../../../lib/axios';
import { useAuthStore } from '../../../store/authStore';
import type { AuthResponse } from '../../../types/api';

export function useRegister() {
  const saveSession = useAuthStore((s) => s.login);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (input: { name: string; email: string; phone?: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.post<AuthResponse>('/auth/register', input, { skipAuth: true });
      await saveSession(data.accessToken, data.refreshToken, data.user);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Đăng ký thất bại';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { register, isLoading, error };
}
