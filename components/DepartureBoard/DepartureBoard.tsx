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
  const [lastSearch] = useSearch();
  console.log('lastSearch', lastSearch[0]?.value);
  const { data, isLoading } = useSWR(
    '/api/pid?name=' + lastSearch[0]?.value,
    (url) => fetcher(url),
    { refreshInterval: 10000 }
  );
  const { mutate } = useSWRConfig();
  const { departures } = data || [];
  const groupedData = useGroupDepartures(departures);

  useEffect(() => {
    mutate('/api/pid?name=' + lastSearch[0]?.value);
  }, [lastSearch[0]?.value, mutate]);

  return (
    <div className="flex flex-col gap-4 p-3 w-full overflow-y-auto">
      {isLoading && lastSearch[0]?.value ? (
        <DeparturesListSkeleton />
      ) : (
        <DeparturesList departures={groupedData} />
      )}
    </div>
  );
};

export default dynamic(() => Promise.resolve(DepartureBoard), { ssr: false });
