import { useEffect } from 'react';
import useSWR from 'swr';

import { useGroupDepartures } from '@/hooks/useGroupDepartures';
import { useSearch } from '@/hooks/useSearch';
import fetcher from '@/lib/fetcher';
import {
  DeparturesList,
  DeparturesListSkeleton,
} from '@/components/DeparturesList';

const DepartureBoard = () => {
  // console.count('DepartureBoard');
  const [searchString] = useSearch();
  const { data, mutate, error, isLoading, isValidating } = useSWR(
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
        flex flex-col gap-4
        w-full
        p-3
        overflow-y-auto
      "
    >
      {isLoading ? (
        <>
          <DeparturesListSkeleton />
        </>
      ) : (
        <DeparturesList departures={groupedData} />
      )}
    </div>
  );
};

export default DepartureBoard;
