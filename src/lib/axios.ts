import axios from 'axios';
import { getToken } from './storage';
import { API_BASE_URL, API_TIMEOUT } from './constants';

/**
 * Axios instance dùng chung toàn app.
 * - Tự động gắn token vào header Authorization mỗi request.
 * - Xử lý lỗi 401 (token hết hạn) tại 1 nơi duy nhất.
 */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ── REQUEST INTERCEPTOR ────────────────────────────────────────────
// Tự động đọc token từ AsyncStorage và gắn vào mỗi request
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ── RESPONSE INTERCEPTOR ───────────────────────────────────────────
// Bắt lỗi 401 → đăng xuất hoặc refresh token sau này
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // TODO: gọi refresh token hoặc dispatch logout
      console.warn('[Axios] 401 Unauthorized – token có thể đã hết hạn');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
