import { create } from 'zustand';
import type { IFood, IToppingOption } from '../features/food/types';

export interface ICartItem {
  id: string; // unique cart item id (e.g. foodId-toppingsHash)
  food: IFood;
  quantity: number;
  notes?: string;
  selectedToppings: IToppingOption[];
}

interface CartState {
  cartItems: ICartItem[];
  addToCart: (food: IFood, quantity?: number, selectedToppings?: IToppingOption[], notes?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItemsCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  addToCart: (food, quantity = 1, selectedToppings = [], notes = '') => {
    set((state) => {
      // Sort toppings to ensure same selection generates same hash
      const sortedToppings = [...selectedToppings].sort((a, b) => a.id.localeCompare(b.id));
      const toppingsHash = sortedToppings.map((t) => t.id).join(',');
      const cartItemId = toppingsHash ? `${food.id}-${toppingsHash}` : food.id;

      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === cartItemId
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...state.cartItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity,
          notes: notes || updatedItems[existingItemIndex].notes,
        };
        return { cartItems: updatedItems };
      }

      return {
        cartItems: [
          ...state.cartItems,
          { id: cartItemId, food, quantity, notes, selectedToppings: sortedToppings },
        ],
      };
    });
  },
  removeFromCart: (cartItemId) => {
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== cartItemId),
    }));
  },
  updateQuantity: (cartItemId, quantity) => {
    set((state) => {
      if (quantity <= 0) {
        return {
          cartItems: state.cartItems.filter((item) => item.id !== cartItemId),
        };
      }
      return {
        cartItems: state.cartItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        ),
      };
    });
  },
  clearCart: () => set({ cartItems: [] }),
  getTotalPrice: () => {
    return get().cartItems.reduce((sum, item) => {
      const toppingsPrice = item.selectedToppings.reduce((acc, topping) => acc + topping.price, 0);
      return sum + (item.food.price + toppingsPrice) * item.quantity;
    }, 0);
  },
  getTotalItemsCount: () => {
    return get().cartItems.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
