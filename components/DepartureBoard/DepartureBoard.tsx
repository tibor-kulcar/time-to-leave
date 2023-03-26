import { useEffect, useMemo } from 'react';
import useSWR from 'swr';

import { DepartureProps, StopItem } from '@/types';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useClock } from '@/hooks/useClock';
import fetcher from '@/lib/fetcher';
import { EstimatedTimeArrival } from '@/components/EstimatedTimeArrival';

const DepartureBoard = () => {
  const walkingTimeInMilisecs = 3000;
  const now = useClock().getTime();
  const [searchString] = useLocalStorage<StopItem>('searchString', {
    label: '',
    value: '',
  });
  const { data, mutate, error, isLoading } = useSWR(
    '/api/pid?name=' + searchString.value,
    (url) => fetcher(url)
  );

  const { departures } = data?.data || [];
  useEffect(() => {
    console.log('searchString: ', searchString);
    mutate();
  }, [searchString]);
  return (
    <div className="z-10 flex flex-col items-center justify-center w-full gap-4 p-3 mt-4 overflow-y-auto ">
      {data?.departures.map((departure: DepartureProps, idx: number) => {
        const prediction = new Date(
          departure.departure_timestamp.predicted ||
            departure.departure_timestamp.scheduled
        ).getTime();
        const diff = prediction - now;

        return (
          <div className="flex justify-between w-full text-2xl" key={idx}>
            <span>{departure.route.short_name}</span>
            <EstimatedTimeArrival diff={diff} />
          </div>
        );
      })}
    </div>
  );
};

export default DepartureBoard;
