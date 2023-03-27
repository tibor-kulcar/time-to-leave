import { useEffect, useMemo } from 'react';
import useSWR from 'swr';

import { DepartureProps, StopItem } from '@/types';
import { useSearch } from '@/hooks/useSearch';
// import { useLocalStorage } from 'usehooks-ts';

import { useClock } from '@/hooks/useClock';
import fetcher from '@/lib/fetcher';
import { EstimatedTimeArrival } from '@/components/EstimatedTimeArrival';

const DepartureBoard = () => {
  const walkingTimeInMilisecs = 3000;

  const [searchString] = useSearch();
  const now = useClock().getTime();
  const { data, mutate, error, isLoading } = useSWR(
    '/api/pid?name=' + searchString?.value,
    (url) => fetcher(url),
    { refreshInterval: 10000 }
  );

  useEffect(() => {
    console.log('searchString changed: ', searchString);
    mutate();
  }, [searchString.value]);
  console.log('searchString: ', searchString);

  return (
    <div
      className="
        flex flex-col items-center justify-center gap-4
        w-full
        p-3 mt-4
        overflow-y-auto
      "
    >
      {isLoading ? (
        <h2 className="text-3xl">Loading...</h2>
      ) : (
        <>
          {data?.departures.map((departure: DepartureProps, idx: number) => {
            const prediction = new Date(
              departure.departure_timestamp.predicted ||
                departure.departure_timestamp.scheduled
            ).getTime();
            const diff = prediction - now;

            return (
              <div className="flex justify-between w-full text-2xl" key={idx}>
                <button onClick={() => mutate()}>
                  {departure.route.short_name}
                </button>
                <EstimatedTimeArrival diff={diff} />
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default DepartureBoard;
