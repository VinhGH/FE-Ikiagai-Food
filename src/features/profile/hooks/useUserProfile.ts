// ──────────────────────────────────────────────────────────────────
// features/profile/hooks/useUserProfile.ts
// Hook lấy thông tin user – đọc từ authStore (đã hydrate sẵn)
// ──────────────────────────────────────────────────────────────────

import { useAuthStore, type User } from '../../../store/authStore';

interface UseUserProfileResult {
  user: User | null;
  isLoggedIn: boolean;
  /** Đăng xuất user */
  logout: () => Promise<void>;
}

/**
 * Hook lấy thông tin người dùng hiện tại từ Zustand store.
 * Không cần gọi API vì authStore.hydrate() đã load dữ liệu khi mở app.
 *
 * @example
 * const { user, isLoggedIn, logout } = useUserProfile();
 */
export function useUserProfile(): UseUserProfileResult {
  const { user, isLoggedIn, logout } = useAuthStore();

  return { user, isLoggedIn, logout };
}
