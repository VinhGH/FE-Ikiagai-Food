// ──────────────────────────────────────────────────────────────────
// features/food/api/foodApi.ts
// Lớp API giả lập - cung cấp dữ liệu nhà hàng, chi nhánh, món ăn và topping
// ──────────────────────────────────────────────────────────────────

import type { IBrand, IShop, IFood, IToppingSection } from '../types';

// ── Topping Mock Templates ─────────────────────────────────────────
const TOPPINGS_SOT: IToppingSection = {
  id: 't-sot',
  title: 'Thêm Sốt (Không bắt buộc, tối đa 1)',
  isRequired: false,
  maxSelections: 1,
  options: [
    { id: 'sot-1', name: 'Thêm 2 Gói Tương Chua Ngọt', price: 1000 },
    { id: 'sot-2', name: 'Thêm 2 Gói Tương Cà', price: 1000 },
  ],
};

const TOPPINGS_GA: IToppingSection = {
  id: 't-ga',
  title: 'Chọn Gà (Bắt buộc chọn 1)',
  isRequired: true,
  maxSelections: 1,
  options: [
    { id: 'ga-1', name: 'Gà Giòn Vui Vẻ (Không cay)', price: 0 },
    { id: 'ga-2', name: 'Gà Giòn Cay', price: 0 },
    { id: 'ga-3', name: 'Gà Sốt Tương Cay ngọt', price: 5000 },
  ],
};

const TOPPINGS_NUOC: IToppingSection = {
  id: 't-nuoc',
  title: 'Chọn Nước Uống',
  isRequired: false,
  maxSelections: 1,
  options: [
    { id: 'nuoc-1', name: '1 Ly Pepsi vừa', price: 0 },
    { id: 'nuoc-2', name: '1 Ly Pepsi lớn', price: 3000 },
    { id: 'nuoc-3', name: 'Đổi sang Trà Đào', price: 8000 },
  ],
};

const TOPPINGS_TRA_SUA: IToppingSection = {
  id: 't-ts',
  title: 'Thêm Topping Trà Sữa (Có thể chọn nhiều)',
  isRequired: false,
  options: [
    { id: 'ts-1', name: 'Trân Châu Hoàng Kim', price: 10000 },
    { id: 'ts-2', name: 'Sương sáo', price: 8000 },
    { id: 'ts-3', name: 'Kem Cheese', price: 12000 },
  ],
};

const TOPPINGS_COM_TAM: IToppingSection[] = [
  {
    id: 't-ct-com',
    title: 'Chọn Loại Cơm (Bắt buộc chọn 1)',
    isRequired: true,
    maxSelections: 1,
    options: [
      { id: 'ct-com-1', name: 'Cơm Tấm Truyền Thống', price: 0 },
      { id: 'ct-com-2', name: 'Cơm Tấm Tỏi Phi', price: 4000 },
      { id: 'ct-com-3', name: 'Cơm Tấm Kim Chi', price: 6000 },
    ],
  },
  {
    id: 't-ct-ga',
    title: 'Chọn Gà (Bắt buộc chọn 1)',
    isRequired: true,
    maxSelections: 1,
    options: [
      { id: 'ct-ga-1', name: 'Đùi Gà Giòn Vui Vẻ (Không cay)', price: 0 },
      { id: 'ct-ga-2', name: 'Đùi Gà Giòn Cay', price: 0 },
      { id: 'ct-ga-3', name: 'Cánh Gà Sốt Tương Cay ngọt', price: 3000 },
    ],
  },
  {
    id: 't-ct-them',
    title: 'Món Ăn Kèm Thêm (Chọn nhiều)',
    isRequired: false,
    options: [
      { id: 'ct-them-1', name: 'Trứng Ốp La', price: 7000 },
      { id: 'ct-them-2', name: 'Chả Trứng', price: 10000 },
      { id: 'ct-them-3', name: 'Lạp Xưởng', price: 12000 },
      { id: 'ct-them-4', name: 'Canh Cải Thịt Bằm', price: 8000 },
    ],
  },
  {
    id: 't-ct-nuoc',
    title: 'Đồ Uống Đi Kèm (Tối đa 1)',
    isRequired: false,
    maxSelections: 1,
    options: [
      { id: 'ct-nuoc-1', name: 'Pepsi vừa', price: 0 },
      { id: 'ct-nuoc-2', name: 'Pepsi lớn', price: 3000 },
      { id: 'ct-nuoc-3', name: 'Trà Đào', price: 8000 },
    ],
  },
];

// ── Mock Brands ────────────────────────────────────────────────────
export const MOCK_BRANDS: IBrand[] = [
  {
    id: 'brand-1',
    name: 'Jollibee',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=150&q=80',
    categories: ['Gà Rán', 'Bánh Mì', 'Mỳ Ý'],
    rating: 4.4,
    reviewCount: 2000,
    minDeliveryTime: 27,
    deliveryFeeInfo: 'Miễn phí giao hàng',
  },
  {
    id: 'brand-2',
    name: 'Bún Chả Hương Liên (Obama)',
    image: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=150&q=80',
    categories: ['Bún Chả', 'Nem Cua Bể'],
    rating: 4.8,
    reviewCount: 5000,
    minDeliveryTime: 15,
    deliveryFeeInfo: 'Phí giao từ 15k',
  },
  {
    id: 'brand-3',
    name: 'KOI Thé',
    image: 'https://images.unsplash.com/photo-1558857563-b37102e99e00?auto=format&fit=crop&w=150&q=80',
    categories: ['Trà Sữa', 'Đồ uống'],
    rating: 4.6,
    reviewCount: 1500,
    minDeliveryTime: 20,
    deliveryFeeInfo: 'Phí giao từ 12k',
  },
  {
    id: 'brand-4',
    name: 'Phở 24',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?auto=format&fit=crop&w=150&q=80',
    categories: ['Phở Bò', 'Bún'],
    rating: 4.5,
    reviewCount: 900,
    minDeliveryTime: 18,
    deliveryFeeInfo: 'Phí giao từ 10k',
  },
];

// ── Mock Shops (Branches) ──────────────────────────────────────────
export const MOCK_SHOPS: IShop[] = [
  // Chi nhánh Jollibee
  {
    id: 'shop-1a',
    brandId: 'brand-1',
    name: 'Jollibee - EC Thanh Khê',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    rating: 4.4,
    reviewCount: 2000,
    deliveryTime: 30,
    deliveryFee: 6000,
    address: '234 Điện Biên Phủ, Thanh Khê, Đà Nẵng',
    distance: 1.2,
    promotions: ['Giảm 30.000đ', 'Miễn phí giao hàng'],
  },
  {
    id: 'shop-1b',
    brandId: 'brand-1',
    name: 'Jollibee - MM Supercenter Đà Nẵng',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 202,
    deliveryTime: 30,
    deliveryFee: 0,
    address: 'MM Supercenter, Hòa Cường Nam, Cẩm Lệ, Đà Nẵng',
    distance: 2.1,
    promotions: ['Giảm 30.000đ', 'Giảm 10% đơn nhóm'],
  },
  {
    id: 'shop-1c',
    brandId: 'brand-1',
    name: 'Jollibee - EC Ngô Văn Sở',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 1000,
    deliveryTime: 31,
    deliveryFee: 9000,
    address: '89 Ngô Văn Sở, Hòa Khánh Nam, Liên Chiểu, Đà Nẵng',
    distance: 3.5,
    promotions: ['Giảm 30.000đ', 'Ưu đãi đặt trước'],
  },
  {
    id: 'shop-1d',
    brandId: 'brand-1',
    name: 'Jollibee - Phạm Như Xương',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 2000,
    deliveryTime: 27,
    deliveryFee: 10000,
    address: '12 Phạm Như Xương, Hòa Khánh Bắc, Liên Chiểu, Đà Nẵng',
    distance: 4.8,
    promotions: ['Giảm 30.000đ', 'Tặng coca miễn phí'],
  },

  // Chi nhánh Bún Chả Obama
  {
    id: 'shop-2a',
    brandId: 'brand-2',
    name: 'Bún Chả Hương Liên - Ngô Thì Nhậm',
    image: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 5000,
    deliveryTime: 15,
    deliveryFee: 15000,
    address: '19 Ngô Thì Nhậm, Hai Bà Trưng, Hà Nội',
    distance: 0.5,
    promotions: ['Bán chạy nhất', 'Mã GRAB50'],
  },
  {
    id: 'shop-2b',
    brandId: 'brand-2',
    name: 'Bún Chả Hương Liên - Láng Hạ',
    image: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewCount: 1200,
    deliveryTime: 22,
    deliveryFee: 18000,
    address: '120 Láng Hạ, Đống Đa, Hà Nội',
    distance: 4.0,
    promotions: ['Giảm 10%', 'Freeship từ 120k'],
  },

  // Chi nhánh KOI Thé
  {
    id: 'shop-3a',
    brandId: 'brand-3',
    name: 'KOI Thé - Nguyễn Văn Linh',
    image: 'https://images.unsplash.com/photo-1558857563-b37102e99e00?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1558857563-b37102e99e00?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 3000,
    deliveryTime: 20,
    deliveryFee: 12000,
    address: '87 Nguyễn Văn Linh, Hải Châu, Đà Nẵng',
    distance: 1.0,
    promotions: ['Độc quyền Koi Thé', 'Giảm giá 15%'],
  },
  {
    id: 'shop-3b',
    brandId: 'brand-3',
    name: 'KOI Thé - Lotte Mart',
    image: 'https://images.unsplash.com/photo-1558857563-b37102e99e00?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1558857563-b37102e99e00?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 800,
    deliveryTime: 25,
    deliveryFee: 15000,
    address: 'Lotte Mart Đà Nẵng, Hải Châu, Đà Nẵng',
    distance: 3.2,
    promotions: ['Freeship đơn từ 80k'],
  },
];

// ── Mock Foods list ────────────────────────────────────────────────
const MOCK_FOODS: IFood[] = [
  // Jollibee - MM Supercenter Đà Nẵng
  {
    id: 'f-101',
    shopId: 'shop-1b',
    name: '3 Miếng gà giòn + 2 Mỳ Ý Jolly vừa + 1 Khoai tây chiên vừa',
    price: 185000,
    originalPrice: 225000,
    discount: 17,
    image: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    category: 'Món bán chạy',
    description: 'Combo gia đình siêu tiết kiệm: Gồm 3 miếng gà rán giòn rụm thơm lừng, 2 phần mỳ ý sốt bò bằm đậm đà ngọt ngon và 1 gói khoai tây chiên vừa.',
    toppings: [TOPPINGS_SOT, TOPPINGS_GA, TOPPINGS_NUOC],
  },
  {
    id: 'f-102',
    shopId: 'shop-1b',
    name: '2 Gà Giòn Vui Vẻ + 2 Mỳ Ý Jolly vừa + 1 Pepsi lớn',
    price: 145000,
    originalPrice: 180000,
    discount: 19,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80',
    rating: 4.4,
    category: 'Dành cho bạn',
    description: 'Combo cặp đôi hoàn hảo với 2 gà giòn vui vẻ thơm ngon, 2 phần mỳ ý sốt bò bằm và nước ngọt giải nhiệt.',
    toppings: [TOPPINGS_SOT, TOPPINGS_GA],
  },
  {
    id: 'f-103',
    shopId: 'shop-1b',
    name: '3 Gà Giòn Vui Vẻ + 1 Mỳ Ý Jolly + 1 Khoai tây vừa',
    price: 145000,
    originalPrice: 178000,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    category: 'Dành cho bạn',
    description: 'Phần ăn combo đầy đặn cho nhóm bạn.',
    toppings: [TOPPINGS_GA],
  },

  // Jollibee - các chi nhánh khác
  {
    id: 'f-104',
    shopId: 'shop-1a',
    name: 'Cơm Tấm Gà Giòn Jollibee',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80',
    rating: 4.3,
    category: 'Cơm',
    description: 'Cơm tấm dẻo thơm kết hợp với gà giòn vui vẻ trứ danh của Jollibee, ăn kèm nước mắm chua ngọt đậm đà.',
    toppings: TOPPINGS_COM_TAM,
  },

  // Bún Chả Obama - Ngô Thì Nhậm
  {
    id: 'f-201',
    shopId: 'shop-2a',
    name: 'Bún Chả Đặc Biệt (Super Combo Obama)',
    price: 75000,
    originalPrice: 90000,
    discount: 16,
    image: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    category: 'Món ăn phổ biến nhất',
    description: 'Bao gồm chả viên nướng thơm phức, chả miếng nướng mềm ngọt đậm vị, 2 nem cua bể giòn tan ăn kèm bún sợi nhỏ, rau sống tươi ngon và nước mắm pha ấm nóng.',
    toppings: [
      {
        id: 't-bc',
        title: 'Lựa chọn thêm',
        isRequired: false,
        options: [
          { id: 'bc-1', name: 'Thêm 1 Nem Cua Bể', price: 22000 },
          { id: 'bc-2', name: 'Thêm Bún thêm', price: 5000 },
          { id: 'bc-3', name: 'Thêm Chả Viên (2 cái)', price: 15000 },
        ],
      },
    ],
  },
  {
    id: 'f-202',
    shopId: 'shop-2a',
    name: 'Bún Chả Truyền Thống',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    category: 'Món ăn phổ biến nhất',
    description: 'Chả viên và chả miếng nướng than hoa thơm lừng đậm đà, bún tươi mềm mịn, rau sống xanh mát và nước chấm chua ngọt chuẩn vị Hà Nội.',
  },
  {
    id: 'f-203',
    shopId: 'shop-2a',
    name: 'Nem Cua Bể Giòn Rụm (1 Cái)',
    price: 22000,
    image: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    category: 'Món ăn kèm',
  },

  // KOI Thé - Nguyễn Văn Linh
  {
    id: 'f-301',
    shopId: 'shop-3a',
    name: 'Trà Sữa Trân Châu Hoàng Kim',
    price: 55000,
    image: 'https://images.unsplash.com/photo-1558857563-b37102e99e00?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    category: 'Trà sữa nổi tiếng',
    description: 'Trà sữa thơm béo đặc trưng của KOI Thé kết hợp cùng trân châu hoàng kim dai giòn sần sật ngọt ngào.',
    toppings: [TOPPINGS_TRA_SUA],
  },
  {
    id: 'f-302',
    shopId: 'shop-3a',
    name: 'Lục Trà Macchiato',
    price: 48000,
    image: 'https://images.unsplash.com/photo-1558857563-b37102e99e00?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    category: 'Trà Macchiato',
    toppings: [TOPPINGS_TRA_SUA],
  },
];

const fakeDelay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

// ── API Functions ───────────────────────────────────────────────────

/** Lấy danh sách thương hiệu nhà hàng (Brands) */
export async function getBrands(): Promise<IBrand[]> {
  await fakeDelay(400);
  return MOCK_BRANDS;
}

/** Lấy chi tiết thương hiệu theo ID */
export async function getBrandById(brandId: string): Promise<IBrand | null> {
  await fakeDelay(200);
  return MOCK_BRANDS.find((b) => b.id === brandId) ?? null;
}

/** Lấy danh sách các chi nhánh của Brand, sắp xếp theo distance tăng dần (gần nhất ở trên) */
export async function getShopsByBrand(brandId: string): Promise<IShop[]> {
  await fakeDelay(400);
  const branches = MOCK_SHOPS.filter((s) => s.brandId === brandId);
  return branches.sort((a, b) => a.distance - b.distance);
}

/** Lấy chi tiết chi nhánh shop theo ID */
export async function getShopById(shopId: string, signal?: AbortSignal): Promise<IShop | null> {
  void signal;
  await fakeDelay(300);
  return MOCK_SHOPS.find((s) => s.id === shopId) ?? null;
}

/** Lấy món ăn theo shopId (chi nhánh) */
export async function getFoods(
  params?: { shopId?: string; category?: string },
  signal?: AbortSignal,
): Promise<IFood[]> {
  void signal;
  await fakeDelay(400);
  let result = MOCK_FOODS;
  if (params?.shopId) {
    result = result.filter((f) => f.shopId === params.shopId);
  }
  if (params?.category) {
    result = result.filter((f) => f.category === params.category);
  }
  return result;
}

/** Lấy chi tiết món ăn theo ID */
export async function getFoodById(id: string, signal?: AbortSignal): Promise<IFood | null> {
  void signal;
  await fakeDelay(300);
  return MOCK_FOODS.find((f) => f.id === id) ?? null;
}
