// ──────────────────────────────────────────────────────────────────
// features/food/types.ts
// Khai báo kiểu dữ liệu dùng toàn bộ food feature
// ──────────────────────────────────────────────────────────────────

/** Một món ăn / sản phẩm trong app */
export interface IFood {
  id: string;
  name: string;
  /** Giá bán (VNĐ) */
  price: number;
  /** Giá gốc trước giảm (VNĐ), nếu có */
  originalPrice?: number;
  /** Phần trăm giảm giá, VD: 20 = giảm 20% */
  discount?: number;
  image: string;
  description?: string;
  rating?: number;
  /** ID của quán / cửa hàng */
  shopId: string;
  category?: string;
}

/** Thông tin quán / cửa hàng */
export interface IShop {
  id: string;
  name: string;
  image: string;
  coverImage: string;
  rating: number;
  reviewCount: number;
  /** Thời gian giao hàng ước tính (phút) */
  deliveryTime: number;
  /** Phí giao hàng (VNĐ, 0 = miễn phí) */
  deliveryFee: number;
  address?: string;
}

/** Response khi gọi GET /foods */
export interface FoodsResponse {
  data: IFood[];
  total: number;
  page: number;
}
