import { useCartStore } from '../../../store/cartStore';

export function useCartActions() {
  return useCartStore();
}
