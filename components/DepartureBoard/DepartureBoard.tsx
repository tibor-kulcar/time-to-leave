import { useEffect, useMemo } from 'react';
import useSWR from 'swr';

import { DepartureProps, StopItem } from '@/types';
import { useGroupDepartures } from '@/hooks/useGroupDepartures';
import { useSearch } from '@/hooks/useSearch';

import fetcher from '@/lib/fetcher';
import { DeparturesList } from '@/components/DeparturesList';

const walkingTimeInMilisecs = 3000;

const DepartureBoard = () => {
  const [searchString] = useSearch();
  const { data, mutate, error, isLoading } = useSWR(
    '/api/pid?name=' + searchString?.value,
    (url) => fetcher(url),
    { refreshInterval: 10000 }
  );

  const { departures } = data || [];
  const groupedData = useGroupDepartures(departures);

  useEffect(() => {
    mutate();
  }, [searchString.value]);

  return (
    <div
      className="
        flex flex-col items-center justify-center gap-4
        w-full
        px-5 py-3
        overflow-y-auto
      "
    >
      {isLoading ? (
        <h2 className="text-3xl">Loading...</h2>
      ) : (
        <DeparturesList departures={groupedData} />
      )}
    </div>
  );
};

export default DepartureBoard;
