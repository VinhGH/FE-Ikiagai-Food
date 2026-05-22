import { create } from 'zustand';
import {
  saveToken,
  getToken,
  removeTokens,
  saveUserData,
  getUserData,
  removeUserData,
  clearAllStorage,
} from '../lib/storage';
import type { User } from '../types/api';

// ===== TYPES =====
type AuthState = {
  // State
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean; // Đang kiểm tra token từ storage khi mở app

  // Actions
  login: (accessToken: string, refreshToken: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  hydrate: () => Promise<void>; // Khôi phục token từ AsyncStorage khi mở app
};

// ===== STORE =====
export const useAuthStore = create<AuthState>((set) => ({
  // Mặc định chưa đăng nhập, đang loading (chờ hydrate)
  token: null,
  user: null,
  isLoggedIn: false,
  isLoading: true,

  // Đăng nhập: lưu token + user vào cả store & AsyncStorage
  login: async (accessToken: string, refreshToken: string, user: User) => {
    await saveToken(accessToken, refreshToken);
    await saveUserData(user as unknown as Record<string, unknown>);
    set({
      token: accessToken,
      user,
      isLoggedIn: true,
    });
  },

  // Đăng xuất: xóa tất cả khỏi store & AsyncStorage
  logout: async () => {
    await clearAllStorage();
    set({
      token: null,
      user: null,
      isLoggedIn: false,
    });
  },

  // Cập nhật thông tin user (không thay đổi token)
  setUser: (user: User) => {
    set({ user });
    saveUserData(user as unknown as Record<string, unknown>);
  },

  // Khôi phục trạng thái đăng nhập từ AsyncStorage khi mở app
  hydrate: async () => {
    try {
      const token = await getToken();
      const userData = await getUserData();

      if (token) {
        // TODO: Kiểm tra token còn hạn không (decode JWT, so sánh exp)
        set({
          token,
          user: userData as unknown as User | null,
          isLoggedIn: true,
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch {
      // Nếu lỗi đọc storage, coi như chưa đăng nhập
      await removeTokens();
      await removeUserData();
      set({ isLoading: false });
    }
  },
}));
