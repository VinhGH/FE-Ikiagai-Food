// ──────────────────────────────────────────────────────────────────
// features/food/api/foodApi.ts
// HTTP layer – gọi API lấy dữ liệu món ăn qua axiosInstance
// ──────────────────────────────────────────────────────────────────

import axiosInstance from '../../../lib/axios';
import type { IFood, IShop } from '../types';

// ── Mock data (thay bằng API thật khi backend sẵn) ─────────────────
const MOCK_FOODS: IFood[] = [
  {
    id: '1',
    name: 'Cơm Tấm Sườn Bì Chả',
    price: 55000,
    originalPrice: 70000,
    discount: 21,
    image: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    shopId: 'shop-1',
    category: 'Cơm',
  },
  {
    id: '2',
    name: 'Bún Bò Huế Đặc Biệt',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    shopId: 'shop-2',
    category: 'Bún',
  },
  {
    id: '3',
    name: 'Gà Rán Giòn Tan',
    price: 49000,
    originalPrice: 59000,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80',
    rating: 4.3,
    shopId: 'shop-3',
    category: 'Gà',
  },
  {
    id: '4',
    name: 'Bánh Mì Thịt Nướng',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    shopId: 'shop-1',
    category: 'Bánh mì',
  },
  {
    id: '5',
    name: 'Phở Bò Tái Chín',
    price: 75000,
    originalPrice: 85000,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    shopId: 'shop-4',
    category: 'Phở',
  },
];

const MOCK_SHOP: IShop = {
  id: 'shop-1',
  name: 'Jollibee',
  image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=150&q=80',
  coverImage: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
  rating: 4.4,
  reviewCount: 2000,
  deliveryTime: 17,
  deliveryFee: 0,
  address: 'EC Đống Đa, Đà Nẵng',
};

/** Thêm delay giả lập network để test loading state */
const fakeDelay = (ms = 800) => new Promise((res) => setTimeout(res, ms));

// ── API Functions ───────────────────────────────────────────────────

/**
 * Lấy danh sách món ăn.
 * @param params.category - Lọc theo danh mục
 * @param params.page - Phân trang
 * @param signal - AbortController signal để cancel request khi component unmount
 */
export async function getFoods(
  params?: { category?: string; page?: number },
  signal?: AbortSignal,
): Promise<IFood[]> {
  // TODO: Thay bằng axiosInstance.get('/foods', { params, signal }) khi có backend
  void params;
  void signal;
  await fakeDelay();
  return MOCK_FOODS;
}

/**
 * Lấy chi tiết 1 món ăn theo ID.
 * @param id - ID của món ăn
 * @param signal - AbortController signal
 */
export async function getFoodById(
  id: string,
  signal?: AbortSignal,
): Promise<IFood | null> {
  // TODO: Thay bằng axiosInstance.get(`/foods/${id}`, { signal }) khi có backend
  void signal;
  await fakeDelay(600);
  return MOCK_FOODS.find((f) => f.id === id) ?? null;
}

/**
 * Lấy thông tin quán theo ID.
 * @param shopId - ID của quán
 */
export async function getShopById(
  shopId: string,
  signal?: AbortSignal,
): Promise<IShop | null> {
  // TODO: Thay bằng axiosInstance.get(`/shops/${shopId}`, { signal }) khi có backend
  void shopId;
  void signal;
  await fakeDelay(400);
  return MOCK_SHOP;
}
