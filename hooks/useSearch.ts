'use client';

import { useLocalStorage } from './useLocalStorage';
import { StopItem } from '@/types';

export function useSearch() {
  const [lastSearch, setLastSearch] = useLocalStorage<StopItem[]>('search', []);

  const removeItem = (value: string) => {
    setLastSearch((prev) => prev.filter((item) => item.value !== value));
  };

  return { lastSearch, setLastSearch, removeItem };
}
