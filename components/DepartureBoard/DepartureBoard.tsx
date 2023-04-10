import { useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import dynamic from 'next/dynamic';

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
  const { data, isLoading } = useSWR(
    '/api/pid?name=' + searchString?.value,
    (url) => fetcher(url),
    { refreshInterval: 10000 }
  );
  const { mutate } = useSWRConfig();
  const { departures } = data || [];
  const groupedData = useGroupDepartures(departures);

  useEffect(() => {
    mutate('/api/pid?name=' + searchString?.value);
  }, [searchString.value, mutate]);

  return (
    <div
      className="
        flex flex-col gap-4
        w-full
        p-3
        overflow-y-auto
      "
    >
      {isLoading && searchString?.value ? (
        <DeparturesListSkeleton />
      ) : (
        <DeparturesList departures={groupedData} />
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(DepartureBoard), { ssr: false });
