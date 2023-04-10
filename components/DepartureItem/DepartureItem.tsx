import clsx from 'clsx';

import { DepartureProps } from '@/types';
import { EstimatedTimeArrival } from '@/components/EstimatedTimeArrival';

// const walkingTimeInMilisecs = 3 * 60 * 1000;

type DepartureItemProps = {
  departure: DepartureProps;
  time: number;
};

const DepartureItem = ({ departure, time }: DepartureItemProps) => {
  // console.count('DepartureItem');

  const prediction = new Date(
    departure.departure_timestamp.predicted ||
      departure.departure_timestamp.scheduled
  ).getTime();
  const diff = prediction - time;

  if (diff < 0) return <></>;

  return (
    <div
      className={clsx(
        'grid grid-flow-col gap-2 auto-cols-[_2.8rem_2fr_auto] w-full text-2xl leading-tight'
        // diff < walkingTimeInMilisecs ? 'text-bone-600 dark:text-bone-800' : ''
      )}
    >
      <span className="font-semibold">{departure.route.short_name}</span>
      <span className="w-full font-normal truncate overflow-hidden">
        {departure.trip.headsign}
      </span>
      <EstimatedTimeArrival diff={diff} />
    </div>
  );
};

export default DepartureItem;
