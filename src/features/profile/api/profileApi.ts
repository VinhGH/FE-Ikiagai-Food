// ──────────────────────────────────────────────────────────────────
// features/profile/api/profileApi.ts
// HTTP layer – lấy thông tin profile người dùng
// ──────────────────────────────────────────────────────────────────

import axiosInstance from '../../../lib/axios';
import type { User } from '../../../store/authStore';

/**
 * Lấy thông tin profile người dùng theo ID.
 * Hiện dùng mock – thay bằng axiosInstance.get khi có backend.
 *
 * @param userId - ID người dùng
 * @param signal - AbortController signal
 */
export async function getUserProfile(
  userId: string,
  signal?: AbortSignal,
): Promise<User | null> {
  // TODO: return axiosInstance.get<User>(`/users/${userId}`, { signal }).then(r => r.data);
  void axiosInstance;
  void userId;
  void signal;

  // Mock: trả về null vì data thật đã có trong authStore
  // Profile screen sẽ đọc trực tiếp từ authStore
  return null;
}
