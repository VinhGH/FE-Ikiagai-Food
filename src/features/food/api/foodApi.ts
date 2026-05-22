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

const TOPPINGS_HIGHLANDS_SIZE: IToppingSection = {
  id: 't-hl-size',
  title: 'Chọn Kích Thước (Bắt buộc)',
  isRequired: true,
  maxSelections: 1,
  options: [
    { id: 'hl-size-s', name: 'Cỡ Nhỏ', price: 0 },
    { id: 'hl-size-m', name: 'Cỡ Vừa', price: 6000 },
    { id: 'hl-size-l', name: 'Cỡ Lớn', price: 10000 },
  ],
};

const TOPPINGS_HIGHLANDS_ADD: IToppingSection = {
  id: 't-hl-add',
  title: 'Chọn Topping (Không bắt buộc)',
  isRequired: false,
  options: [
    { id: 'hl-tp-tcf', name: 'Thạch Cà Phê', price: 9000 },
    { id: 'hl-tp-ttd', name: 'Thạch Trà Đỏ', price: 9000 },
    { id: 'hl-tp-tct', name: 'Trân Châu Trắng', price: 9000 },
    { id: 'hl-tp-kb', name: 'Kem Béo', price: 10000 },
    { id: 'hl-tp-hs', name: 'Hạt Sen', price: 10000 },
  ],
};

const TOPPINGS_HIGHLANDS_DUONG: IToppingSection = {
  id: 't-hl-duong',
  title: 'Lượng Đường (Không bắt buộc)',
  isRequired: false,
  maxSelections: 1,
  options: [
    { id: 'hl-dg-100', name: '100% Đường', price: 0 },
    { id: 'hl-dg-70', name: '70% Đường', price: 0 },
    { id: 'hl-dg-50', name: '50% Đường', price: 0 },
    { id: 'hl-dg-30', name: '30% Đường', price: 0 },
    { id: 'hl-dg-0', name: 'Không Đường', price: 0 },
  ],
};

const TOPPINGS_HIGHLANDS_DA: IToppingSection = {
  id: 't-hl-da',
  title: 'Lượng Đá (Không bắt buộc)',
  isRequired: false,
  maxSelections: 1,
  options: [
    { id: 'hl-da-100', name: '100% Đá', price: 0 },
    { id: 'hl-da-50', name: '50% Đá', price: 0 },
    { id: 'hl-da-it', name: 'Ít Đá', price: 0 },
    { id: 'hl-da-khong', name: 'Không Đá', price: 0 },
  ],
};

const TOPPINGS_HIGHLANDS: IToppingSection[] = [
  TOPPINGS_HIGHLANDS_SIZE,
  TOPPINGS_HIGHLANDS_ADD,
  TOPPINGS_HIGHLANDS_DUONG,
  TOPPINGS_HIGHLANDS_DA,
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
    deliveryFeeInfo: 'Freeship 0đ',
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
  {
    id: 'brand-5',
    name: 'Gà Rán Popeyes',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=150&q=80',
    categories: ['Gà Rán', 'Ăn Vặt', 'Burger'],
    rating: 4.7,
    reviewCount: 1800,
    minDeliveryTime: 15,
    deliveryFeeInfo: 'Freeship 0đ',
  },
  {
    id: 'brand-6',
    name: 'R&B Tea',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=150&q=80',
    categories: ['Trà Sữa', 'Đồ uống'],
    rating: 4.8,
    reviewCount: 3200,
    minDeliveryTime: 12,
    deliveryFeeInfo: 'Phí giao từ 10k',
  },
  {
    id: 'brand-7',
    name: 'TocoToco Bubble Tea',
    image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=150&q=80',
    categories: ['Trà Sữa', 'Sinh Tố'],
    rating: 4.3,
    reviewCount: 850,
    minDeliveryTime: 22,
    deliveryFeeInfo: 'Freeship 0đ',
  },
  {
    id: 'brand-8',
    name: 'Cơm Tấm Phúc Lộc Thọ',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80',
    categories: ['Cơm Tấm', 'Đồ Ăn'],
    rating: 4.6,
    reviewCount: 4200,
    minDeliveryTime: 15,
    deliveryFeeInfo: 'Freeship 0đ',
  },
  {
    id: 'brand-9',
    name: 'Highlands Coffee',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=150&q=80',
    categories: ['Cà Phê', 'Trà Sữa', 'Bánh Ngọt'],
    rating: 4.5,
    reviewCount: 300,
    minDeliveryTime: 11,
    deliveryFeeInfo: 'Freeship 0đ',
  }
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

  // Chi nhánh Popeyes
  {
    id: 'shop-5a',
    brandId: 'brand-5',
    name: 'Gà Rán Popeyes - Láng Hạ',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    reviewCount: 1800,
    deliveryTime: 15,
    deliveryFee: 0,
    address: '120 Láng Hạ, Đống Đa, Hà Nội',
    distance: 1.5,
    promotions: ['Freeship 0đ', 'Giảm 30% Combo'],
  },

  // Chi nhánh R&B Tea
  {
    id: 'shop-6a',
    brandId: 'brand-6',
    name: 'R&B Tea - Thái Hà',
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    reviewCount: 3200,
    deliveryTime: 12,
    deliveryFee: 12000,
    address: '68 Thái Hà, Đống Đa, Hà Nội',
    distance: 0.8,
    promotions: ['Giảm 15k cho thành viên', 'Mua 1 Tặng 1'],
  },

  // Chi nhánh TocoToco
  {
    id: 'shop-7a',
    brandId: 'brand-7',
    name: 'TocoToco Bubble Tea - Chùa Bộc',
    image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=800&q=80',
    rating: 4.3,
    reviewCount: 850,
    deliveryTime: 22,
    deliveryFee: 0,
    address: '25 Chùa Bộc, Đống Đa, Hà Nội',
    distance: 2.3,
    promotions: ['Đồng giá 25k', 'Freeship 0đ'],
  },

  // Chi nhánh Cơm Tấm Phúc Lộc Thọ
  {
    id: 'shop-8a',
    brandId: 'brand-8',
    name: 'Cơm Tấm Phúc Lộc Thọ - Đống Đa',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    reviewCount: 4200,
    deliveryTime: 15,
    deliveryFee: 0,
    address: '156 Xã Đàn, Đống Đa, Hà Nội',
    distance: 1.1,
    promotions: ['Freeship 0đ', 'Giảm 10k đơn từ 60k'],
  },
  {
    id: 'shop-9a',
    brandId: 'brand-9',
    name: 'Highlands Coffee - Tôn Đức Thắng',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=150&q=80',
    coverImage: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    reviewCount: 10,
    deliveryTime: 11,
    deliveryFee: 0,
    address: '72 Tôn Đức Thắng, Quốc Tử Giám, Đống Đa, Hà Nội',
    distance: 0.7,
    promotions: ['Giảm 20.000đ', 'Giảm 30.000đ'],
  }
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
    originalPrice: 55000,
    discount: 18,
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
    originalPrice: 65000,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1569058242253-1fe691a31b40?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    category: 'Món ăn phổ biến nhất',
    description: 'Chả viên và chả miếng nướng than hoa thơm lừng đậm đà, bún tươi mềm mịn, rau sống xanh mát và nước chấm chua ngọt chuẩn vị Hà Nội.',
  },

  // KOI Thé - Nguyễn Văn Linh
  {
    id: 'f-301',
    shopId: 'shop-3a',
    name: 'Trà Sữa Trân Châu Hoàng Kim',
    price: 55000,
    originalPrice: 65000,
    discount: 15,
    image: 'https://images.unsplash.com/photo-1558857563-b37102e99e00?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    category: 'Trà sữa nổi tiếng',
    description: 'Trà sữa thơm béo đặc trưng của KOI Thé kết hợp cùng trân châu hoàng kim dai giòn sần sật ngọt ngào.',
    toppings: [TOPPINGS_TRA_SUA],
  },

  // Popeyes - Láng Hạ
  {
    id: 'f-501',
    shopId: 'shop-5a',
    name: 'Combo Gà Rán Popeyes Giòn Cay',
    price: 85000,
    originalPrice: 120000,
    discount: 29,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    category: 'Gà Rán',
    description: 'Combo gà rán giòn cay trứ danh của Popeyes gồm 2 miếng gà, 1 khoai tây chiên cỡ vừa và 1 nước pepsi lạnh sảng khoái.',
  },
  {
    id: 'f-502',
    shopId: 'shop-5a',
    name: 'Gà Tắm Nước Mắm Tỏi Ớt (1 miếng)',
    price: 39000,
    originalPrice: 48000,
    discount: 18,
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    category: 'Gà Rán',
  },

  // R&B Tea - Thái Hà
  {
    id: 'f-601',
    shopId: 'shop-6a',
    name: 'Hồng Trà Sữa R&B Premium',
    price: 45000,
    originalPrice: 60000,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    category: 'Trà Sữa',
  },
  {
    id: 'f-602',
    shopId: 'shop-6a',
    name: 'Trà Ngũ Cốc Macchiato',
    price: 52000,
    originalPrice: 65000,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    category: 'Trà Sữa',
  },

  // Tocotoco - Chùa Bộc
  {
    id: 'f-701',
    shopId: 'shop-7a',
    name: 'Trà Sữa Ba Anh Em (Size L)',
    price: 39000,
    originalPrice: 52000,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    category: 'Trà Sữa',
  },
  {
    id: 'f-702',
    shopId: 'shop-7a',
    name: 'Trà Xoài Kem Phô Mai',
    price: 42000,
    originalPrice: 55000,
    discount: 23,
    image: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=400&q=80',
    rating: 4.4,
    category: 'Đồ uống',
  },

  // Cơm Tấm Phúc Lộc Thọ - Đống Đa
  {
    id: 'f-801',
    shopId: 'shop-8a',
    name: 'Cơm Tấm Sườn Bì Chả Đặc Biệt',
    price: 55000,
    originalPrice: 75000,
    discount: 26,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    category: 'Cơm Tấm',
  },
  {
    id: 'f-802',
    shopId: 'shop-8a',
    name: 'Cơm Tấm Đùi Gà Nướng Ngũ Vị',
    price: 48000,
    originalPrice: 60000,
    discount: 20,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    category: 'Cơm Tấm',
  },
  
  // Highlands Coffee - Tôn Đức Thắng (shop-9a)
  {
    id: 'f-901',
    shopId: 'shop-9a',
    name: 'Mua 1 Trà tặng 1 Trà Sữa (Combo)',
    price: 69000,
    originalPrice: 134000,
    discount: 49,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    category: 'COMBO ƯU ĐÃI GREEN SM FOOD',
    description: 'Mua 1 ly Trà cỡ Lớn tặng 1 ly Trà Sữa cỡ Nhỏ thơm ngon mát lành.',
    toppings: TOPPINGS_HIGHLANDS,
  },
  {
    id: 'f-902',
    shopId: 'shop-9a',
    name: 'Combo Trà Chiều Highlands (nhỏ)',
    price: 147000,
    originalPrice: 167000,
    discount: 12,
    image: 'https://images.unsplash.com/photo-1558857563-b37102e99e00?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    category: 'COMBO ƯU ĐÃI GREEN SM FOOD',
    description: 'Combo gồm 1 Trà tự chọn + 1 Freeze mát lạnh + 1 bánh ngọt tự chọn.',
    toppings: TOPPINGS_HIGHLANDS,
  },
  {
    id: 'f-903',
    shopId: 'shop-9a',
    name: 'Combo Sáng Highlands',
    price: 45000,
    originalPrice: 54000,
    discount: 16,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    category: 'COMBO ƯU ĐÃI GREEN SM FOOD',
    description: 'Bạn chọn 1 Cà Phê Đá/Sữa đá truyền thống và 1 Bánh Mì bất kỳ cho bữa sáng tràn năng lượng.',
    toppings: TOPPINGS_HIGHLANDS,
  },
  {
    id: 'f-904',
    shopId: 'shop-9a',
    name: 'Combo Trà Chiều Highlands (2 người)',
    price: 83000,
    originalPrice: 96000,
    discount: 13,
    image: 'https://images.unsplash.com/photo-1541658016709-82535e94bc69?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    category: 'COMBO ƯU ĐÃI GREEN SM FOOD',
    description: 'Phần nước đôi tiết kiệm cho bạn và đồng nghiệp.',
    toppings: TOPPINGS_HIGHLANDS,
  },
  {
    id: 'f-905',
    shopId: 'shop-9a',
    name: 'MatchaFreeze Dừa Mây',
    price: 69000,
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    category: 'Món Mới Phải Thử!',
    description: 'Lớp Matcha thơm béo kết hợp cùng dừa xay thơm lừng béo ngậy, đi kèm thạch dai ngon ngọt lịm.',
    toppings: TOPPINGS_HIGHLANDS,
  },
  {
    id: 'f-906',
    shopId: 'shop-9a',
    name: 'MatchaFreeze Latte',
    price: 69000,
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    category: 'Món Mới Phải Thử!',
    description: 'Trà xanh matcha Nhật Bản hòa quyện sữa tươi thanh trùng thượng hạng.',
    toppings: TOPPINGS_HIGHLANDS,
  },
  {
    id: 'f-907',
    shopId: 'shop-9a',
    name: 'PhinDi Matcha Đỏ',
    price: 59000,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    category: 'Món Mới Phải Thử!',
    description: 'Cà phê phin kết hợp sữa matcha kem béo thơm thoang thoảng mứt dâu tây đỏ mọng.',
    toppings: TOPPINGS_HIGHLANDS,
  },
  {
    id: 'f-908',
    shopId: 'shop-9a',
    name: 'Phin Đen Đá',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80',
    rating: 4.5,
    category: 'Cà Phê Truyền Thống',
    description: 'Cà phê đen truyền thống pha phin chậm rãi, mang hương vị đắng tự nhiên lôi cuốn.',
    toppings: TOPPINGS_HIGHLANDS,
  },
  {
    id: 'f-909',
    shopId: 'shop-9a',
    name: 'Phin Sữa Đá',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=400&q=80',
    rating: 4.9,
    category: 'Cà Phê Truyền Thống',
    description: 'Cà phê phin thơm bùi đậm vị kết hợp cùng sữa đặc béo ngậy truyền thống.',
    toppings: TOPPINGS_HIGHLANDS,
  },
  {
    id: 'f-910',
    shopId: 'shop-9a',
    name: 'Bạc Xỉu',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1497515114629-f71d768fd07c?auto=format&fit=crop&w=400&q=80',
    rating: 4.6,
    category: 'Cà Phê Truyền Thống',
    description: 'Ly bạc xỉu ngọt dịu thơm bùi, thức uống yêu thích của giới trẻ.',
    toppings: TOPPINGS_HIGHLANDS,
  },
  {
    id: 'f-911',
    shopId: 'shop-9a',
    name: 'Phin Sữa Nóng',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80',
    rating: 4.4,
    category: 'Cà Phê Truyền Thống',
    description: 'Phin sữa nóng nồng nàn quyến rũ cho buổi sáng thư thái.',
    toppings: TOPPINGS_HIGHLANDS,
  },
  {
    id: 'f-912',
    shopId: 'shop-9a',
    name: 'Phin Đen Nóng',
    price: 35000,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=400&q=80',
    rating: 4.3,
    category: 'Cà Phê Truyền Thống',
    description: 'Ly cà phê đen nóng rang đậm, hậu vị ngọt sâu lắng.',
    toppings: TOPPINGS_HIGHLANDS,
  },
  {
    id: 'f-913',
    shopId: 'shop-9a',
    name: 'PhinDi Hạnh Nhân',
    price: 49000,
    image: 'https://images.unsplash.com/photo-1551046713-254e4c25f49e?auto=format&fit=crop&w=400&q=80',
    rating: 4.8,
    category: 'Phindi',
    description: 'Cà phê phin kết hợp sữa hạnh nhân bùi thơm hiện đại.',
    toppings: TOPPINGS_HIGHLANDS,
  },
  {
    id: 'f-914',
    shopId: 'shop-9a',
    name: 'PhinDi Choco',
    price: 49000,
    image: 'https://images.unsplash.com/photo-1544860707-c4b3e22c6db2?auto=format&fit=crop&w=400&q=80',
    rating: 4.7,
    category: 'Phindi',
    description: 'Sự kết hợp hoàn hảo giữa Cà Phê Phin êm dịu và Socola ngọt đắng hấp dẫn.',
    toppings: TOPPINGS_HIGHLANDS,
  }
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
