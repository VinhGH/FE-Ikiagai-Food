import { Platform } from 'react-native';

// In development, localhost refers to the local machine. On Android emulators, use 10.0.2.2.
// If testing on a real device, change 'localhost' to your computer's local network IP.
const DEV_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

/** Base URL của API backend. Thay bằng URL thật khi có server. */
export const API_BASE_URL = __DEV__ 
  ? `http://${DEV_HOST}:3000`
  : 'https://api.ikiagai-food.vn/v1';

/** Timeout mặc định (ms) cho mỗi request */
export const API_TIMEOUT = 10_000;
