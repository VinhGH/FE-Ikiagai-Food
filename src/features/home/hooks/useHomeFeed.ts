// ──────────────────────────────────────────────────────────────────
// features/home/hooks/useHomeFeed.ts
// Hook lấy danh sách món ăn cho Home Screen
// ──────────────────────────────────────────────────────────────────

import { useGetFoods } from '../../food/hooks/useGetFoods';
import type { IFood } from '../../food/types';

interface UseHomeFeedResult {
  foods: IFood[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook lấy danh sách món ăn hiển thị ở Home feed.
 * Wraps useGetFoods với interface rõ ràng cho Home screen.
 *
 * @example
 * const { foods, isLoading, error, refetch } = useHomeFeed();
 */
export function useHomeFeed(category?: string): UseHomeFeedResult {
  return useGetFoods(category);
}
