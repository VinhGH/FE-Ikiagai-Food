export type ApiEnvelope<T> = {
  data: T;
  statusCode: number;
};

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar: string | null;
  salutation?: string | null;
  gender?: string | null;
  birthday?: string | null;
  role: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  emoji: string | null;
  image: string | null;
  type: 'main' | 'scroll' | 'filter' | 'food';
  sortOrder: number;
};

export type Food = {
  id: string;
  shopId: string;
  name: string;
  price: number;
  originalPrice: number | null;
  discount: number | null;
  image: string;
  description: string | null;
  rating: number;
  category: string | null;
  toppings?: ToppingSection[];
};

export type ToppingSection = {
  id: string;
  foodId: string;
  title: string;
  isRequired: boolean;
  maxSelections: number | null;
  options: ToppingOption[];
};

export type ToppingOption = {
  id: string;
  sectionId: string;
  name: string;
  price: number;
};
