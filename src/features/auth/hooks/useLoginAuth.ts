import { useState } from 'react';
import { api } from '../../../lib/axios';
import { useAuthStore } from '../../../store/authStore';
import type { AuthResponse } from '../../../types/api';

export function useLoginAuth() {
  const saveSession = useAuthStore((s) => s.login);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.post<AuthResponse>('/auth/login', { email, password }, { skipAuth: true });
      await saveSession(data.accessToken, data.refreshToken, data.user);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Đăng nhập thất bại';
      setError(message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
}
