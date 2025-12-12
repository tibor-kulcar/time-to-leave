'use client';

import useSWR from 'swr';
import { useCallback } from 'react';
import { useSearch } from '@/hooks/useSearch';
import { StopItem } from '@/types';
import fetcher from '@/lib/fetcher';
import { StopCombobox } from './StopCombobox';

const MAX_SEARCH_HISTORY = 10;

export function StopSearch() {
  const { lastSearch, setLastSearch, removeItem } = useSearch();

  // Only fetch loading state, actual data fetching happens in DepartureBoard
  const { isLoading } = useSWR(
    lastSearch[0]?.value ? `/api/pid?name=${lastSearch[0].value}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  const handleChange = useCallback(
    (newValue: StopItem | null) => {
      if (!newValue) return;

      setLastSearch((prev) => {
        // Remove duplicates and add new value at the beginning
        const filtered = prev.filter((item) => item.value !== newValue.value);
        return [newValue, ...filtered].slice(0, MAX_SEARCH_HISTORY);
      });
    },
    [setLastSearch]
  );

  return (
    <div className="flex flex-row justify-center items-center gap-4 py-3 w-full">
      <StopCombobox
        value={lastSearch[0]}
        lastSearch={lastSearch}
        isLoading={isLoading}
        onChange={handleChange}
        onRemove={removeItem}
      />
    </div>
  );
}
