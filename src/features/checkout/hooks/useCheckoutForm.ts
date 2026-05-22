import { useState } from 'react';
import { api } from '../../../lib/axios';
import { useCartStore } from '../../../store/cartStore';

type CheckoutInput = {
  deliveryAddress: string;
  driverNote?: string;
  paymentMethod: 'cash' | 'egreen';
  voucherCode?: string;
};

export function useCheckoutForm() {
  const { shopId, items, clear } = useCartStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitOrder = async (input: CheckoutInput) => {
    if (!shopId || items.length === 0) {
      throw new Error('Giỏ hàng đang trống');
    }

    setIsLoading(true);
    setError(null);
    try {
      const order = await api.post('/orders', {
        shopId,
        ...input,
        items: items.map((item) => ({
          foodId: item.food.id,
          quantity: item.quantity,
          notes: item.notes,
          selectedToppingIds: item.selectedToppings.map((topping) => topping.id),
        })),
      });
      clear();
      return order;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Không thể tạo đơn hàng';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { submitOrder, isLoading, error };
}
