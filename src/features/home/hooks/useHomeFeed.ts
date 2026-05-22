import { useState, useEffect, useCallback } from 'react';
import { getBrands } from '../../food/api/foodApi';
import type { IBrand } from '../../food/types';

interface UseHomeFeedResult {
  brands: IBrand[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Hook lấy danh sách thương hiệu nhà hàng hiển thị ở Home.
 */
export function useHomeFeed(): UseHomeFeedResult {
  const [brands, setBrands] = useState<IBrand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    const fetchBrands = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getBrands();
        if (!controller.signal.aborted) {
          setBrands(data);
        }
      } catch (err: unknown) {
        if (!controller.signal.aborted) {
          setError(err instanceof Error ? err.message : 'Không thể tải thương hiệu');
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchBrands();

    return () => {
      controller.abort();
    };
  }, [trigger]);

  const refetch = useCallback(() => setTrigger((t) => t + 1), []);

  return { brands, isLoading, error, refetch };
}
