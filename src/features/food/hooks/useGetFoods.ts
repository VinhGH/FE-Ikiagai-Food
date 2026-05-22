import { useEffect, useState } from 'react';
import { api } from '../../../lib/axios';
import type { Category, Food } from '../../../types/api';

export function useGetFoods(searchQuery: string, category: string) {
  const [foods, setFoods] = useState<Food[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    if (category !== 'all') params.set('category', category);

    setIsLoading(true);
    api
      .get<Food[]>(`/foods${params.toString() ? `?${params.toString()}` : ''}`, { skipAuth: true })
      .then((data) => {
        if (isMounted) setFoods(data);
      })
      .catch((err) => {
        if (isMounted) setError(err instanceof Error ? err.message : 'Không tải được danh sách món');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [searchQuery, category]);

  return { foods, isLoading, error };
}

export function useFoodCategories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    let isMounted = true;
    api.get<Category[]>('/categories?type=filter', { skipAuth: true }).then((data) => {
      if (isMounted) setCategories(data);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return categories;
}
