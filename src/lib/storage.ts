import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
} as const;

// ===== TOKEN =====
export async function saveToken(accessToken: string, refreshToken?: string) {
  await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  if (refreshToken) {
    await AsyncStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  }
}

export async function getToken(): Promise<string | null> {
  return AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
}

export async function getRefreshToken(): Promise<string | null> {
  return AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
}

export async function removeTokens() {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.ACCESS_TOKEN,
    STORAGE_KEYS.REFRESH_TOKEN,
  ]);
}

// ===== USER DATA =====
export async function saveUserData(user: Record<string, unknown>) {
  await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
}

export async function getUserData(): Promise<Record<string, unknown> | null> {
  const data = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
  return data ? JSON.parse(data) : null;
}

export async function removeUserData() {
  await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
}

// ===== CLEAR ALL =====
export async function clearAllStorage() {
  await AsyncStorage.multiRemove([
    STORAGE_KEYS.ACCESS_TOKEN,
    STORAGE_KEYS.REFRESH_TOKEN,
    STORAGE_KEYS.USER_DATA,
  ]);
}
