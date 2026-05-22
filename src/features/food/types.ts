// ──────────────────────────────────────────────────────────────────
// features/food/types.ts
// Khai báo kiểu dữ liệu cho brand, shop/branch, food và toppings
// ──────────────────────────────────────────────────────────────────

/** Thông tin thương hiệu nhà hàng (VD: Jollibee, KOI Thé) */
export interface IBrand {
  id: string;
  name: string;
  image: string;
  categories: string[];
  rating: number;
  reviewCount: number;
  minDeliveryTime: number;
  deliveryFeeInfo: string;
}

/** Tùy chọn topping riêng lẻ */
export interface IToppingOption {
  id: string;
  name: string;
  price: number;
}

/** Nhóm topping (VD: Thêm Sốt, Chọn Gà) */
export interface IToppingSection {
  id: string;
  title: string;
  isRequired: boolean;
  maxSelections?: number;
  options: IToppingOption[];
}

/** Một món ăn trong cửa hàng */
export interface IFood {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  description?: string;
  rating?: number;
  shopId: string; // Liên kết tới chi nhánh (branch/shop)
  category?: string;
  toppings?: IToppingSection[];
}

/** Thông tin chi nhánh cửa hàng */
export interface IShop {
  id: string;
  brandId: string; // Liên kết tới Brand
  name: string;    // Tên chi nhánh (VD: "MM Supercenter Đà Nẵng")
  image: string;   // Logo
  coverImage: string;
  rating: number;
  reviewCount: number;
  deliveryTime: number;
  deliveryFee: number;
  address: string;
  distance: number; // Khoảng cách (km) để sắp xếp gần nhất
  promotions?: string[]; // Danh sách mã giảm giá
}

export interface FoodsResponse {
  data: IFood[];
  total: number;
  page: number;
}
