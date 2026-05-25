import axiosInstance from '../lib/axios';
import { User } from '../store/authStore';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
}

export interface AuthResponseData {
  accessToken: string;
  refreshToken: string;
  user: User;
}

/**
 * Gọi API đăng nhập lên NestJS backend
 */
export const loginApi = async (data: LoginPayload): Promise<AuthResponseData> => {
  const response = await axiosInstance.post<AuthResponseData>('/auth/login', data);
  return response.data;
};

/**
 * Gọi API đăng ký lên NestJS backend
 */
export const registerApi = async (data: RegisterPayload): Promise<AuthResponseData> => {
  const response = await axiosInstance.post<AuthResponseData>('/auth/register', data);
  return response.data;
};
