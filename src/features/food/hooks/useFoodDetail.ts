// ──────────────────────────────────────────────────────────────────
// features/food/hooks/useFoodDetail.ts
// Hook lấy chi tiết 1 món ăn theo ID
// ──────────────────────────────────────────────────────────────────

import { useState, useEffect } from 'react';
import { getFoodById, getShopById } from '../api/foodApi';
import type { IFood, IShop } from '../types';

interface UseFoodDetailResult {
  food: IFood | null;
  shop: IShop | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook lấy chi tiết món ăn và thông tin quán theo ID.
 *
 * @param id - ID của món ăn (string | string[])
 *
 * @example
 * const { id } = useLocalSearchParams();
 * const { food, shop, isLoading } = useFoodDetail(id as string);
 */
export function useFoodDetail(id: string | undefined): UseFoodDetailResult {
  const [food, setFood] = useState<IFood | null>(null);
  const [shop, setShop] = useState<IShop | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    // UX Skill #42: cleanup abort khi unmount hoặc id thay đổi
    const controller = new AbortController();

    const fetchDetail = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [foodData] = await Promise.all([
          getFoodById(id, controller.signal),
        ]);

        if (controller.signal.aborted) return;

        setFood(foodData);

        // Lấy thêm thông tin quán nếu có shopId
        if (foodData?.shopId) {
          const shopData = await getShopById(foodData.shopId, controller.signal);
          if (!controller.signal.aborted) {
            setShop(shopData);
          }
        }
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Không thể tải thông tin');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchDetail();

    return () => {
      controller.abort();
    };
  }, [id]);

  return { food, shop, isLoading, error };
}
