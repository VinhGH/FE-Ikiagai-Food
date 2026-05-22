// ──────────────────────────────────────────────────────────────────
// features/food/hooks/useGetFoods.ts
// Hook lấy danh sách món ăn – quản lý loading / error / data
// ──────────────────────────────────────────────────────────────────

import { useState, useEffect, useCallback } from 'react';
import { getFoods } from '../api/foodApi';
import type { IFood } from '../types';

interface UseGetFoodsResult {
  foods: IFood[];
  isLoading: boolean;
  error: string | null;
  /** Gọi lại để reload dữ liệu */
  refetch: () => void;
}

/**
 * Hook lấy danh sách món ăn theo category.
 *
 * @example
 * const { foods, isLoading, error, refetch } = useGetFoods();
 */
export function useGetFoods(category?: string): UseGetFoodsResult {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    // UX Skill #42: cleanup abort khi unmount
    const controller = new AbortController();

    const fetchFoods = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getFoods({ category }, controller.signal);
        if (!controller.signal.aborted) {
          setFoods(data);
        }
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Không thể tải dữ liệu');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchFoods();

    return () => {
      controller.abort();
    };
  }, [category, trigger]);

  // UX Skill #24: useCallback để tránh re-render không cần thiết
  const refetch = useCallback(() => setTrigger((t) => t + 1), []);

  return { foods, isLoading, error, refetch };
}
