import { create } from 'zustand';
import type { Food, ToppingOption } from '../types/api';

export type CartItem = {
  id: string;
  food: Food;
  quantity: number;
  notes?: string;
  selectedToppings: ToppingOption[];
};

type CartState = {
  shopId: string | null;
  items: CartItem[];
  addItem: (input: { food: Food; quantity?: number; notes?: string; selectedToppings?: ToppingOption[] }) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  subtotal: () => number;
};

function makeCartItemId(foodId: string, toppings: ToppingOption[]) {
  const toppingHash = toppings.map((item) => item.id).sort().join('-');
  return `${foodId}-${toppingHash || 'base'}`;
}

export const useCartStore = create<CartState>((set, get) => ({
  shopId: null,
  items: [],

  addItem: ({ food, quantity = 1, notes, selectedToppings = [] }) => {
    const id = makeCartItemId(food.id, selectedToppings);
    set((state) => {
      const existing = state.items.find((item) => item.id === id);
      const nextShopId = state.shopId ?? food.shopId;

      if (state.shopId && state.shopId !== food.shopId) {
        return {
          shopId: food.shopId,
          items: [{ id, food, quantity, notes, selectedToppings }],
        };
      }

      if (existing) {
        return {
          shopId: nextShopId,
          items: state.items.map((item) => (item.id === id ? { ...item, quantity: item.quantity + quantity } : item)),
        };
      }

      return {
        shopId: nextShopId,
        items: [...state.items, { id, food, quantity, notes, selectedToppings }],
      };
    });
  },

  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: quantity <= 0 ? state.items.filter((item) => item.id !== id) : state.items.map((item) => (item.id === id ? { ...item, quantity } : item)),
    }));
  },

  removeItem: (id) => {
    set((state) => ({ items: state.items.filter((item) => item.id !== id) }));
  },

  clear: () => set({ shopId: null, items: [] }),

  subtotal: () =>
    get().items.reduce((sum, item) => {
      const toppingTotal = item.selectedToppings.reduce((toppingSum, topping) => toppingSum + topping.price, 0);
      return sum + (item.food.price + toppingTotal) * item.quantity;
    }, 0),
}));
