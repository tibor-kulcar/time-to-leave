'use client';

import { useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';

import { useGroupDepartures } from '@/hooks/useGroupDepartures';
import { useSearch } from '@/hooks/useSearch';
import fetcher from '@/lib/fetcher';
import {
  DeparturesList,
  DeparturesListSkeleton,
} from '@/components/DeparturesList';

export function DepartureBoard() {
  const { lastSearch } = useSearch();
  const stopName = lastSearch[0]?.value;
  const swrKey = stopName ? `/api/pid?name=${stopName}` : null;

  const { data, isLoading } = useSWR(
    swrKey,
    fetcher,
    { refreshInterval: 10000 }
  );

  const { departures } = data || [];
  const groupedData = useGroupDepartures(departures);

  return (
    <div className="flex flex-col gap-4 p-3 w-full overflow-y-auto">
      {isLoading && lastSearch[0]?.value ? (
        <DeparturesListSkeleton />
      ) : (
        <DeparturesList departures={groupedData} />
      )}
    </div>
  );
}
