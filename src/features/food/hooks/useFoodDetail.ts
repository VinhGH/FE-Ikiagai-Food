import { useEffect, useState } from 'react';
import { api } from '../../../lib/axios';
import type { Food } from '../../../types/api';

export function useFoodDetail(id?: string) {
  const [food, setFood] = useState<Food | null>(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    let isMounted = true;
    setIsLoading(true);
    api
      .get<Food>(`/foods/${id}`, { skipAuth: true })
      .then((data) => {
        if (isMounted) setFood(data);
      })
      .catch((err) => {
        if (isMounted) setError(err instanceof Error ? err.message : 'Không tải được món ăn');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { food, isLoading, error };
}
