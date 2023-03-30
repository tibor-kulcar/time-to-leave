import clsx from 'clsx';

import { DepartureProps } from '@/types';
import { useClock } from '@/hooks/useClock';
import { EstimatedTimeArrival } from '@/components/EstimatedTimeArrival';

const walkingTimeInMilisecs = 3 * 60 * 1000;

type DepartureItemProps = {
  departure: DepartureProps;
};

const DepartureItem = ({ departure }: DepartureItemProps) => {
  const now = useClock().getTime();
  const prediction = new Date(
    departure.departure_timestamp.predicted ||
      departure.departure_timestamp.scheduled
  ).getTime();
  const diff = prediction - now;

  return (
    <div
      className={clsx(
        diff < walkingTimeInMilisecs && 'opacity-50',
        'flex justify-between w-full text-2xl'
      )}
    >
      <div className="flex space-x-4">
        <span className="font-bold">{departure.route.short_name}</span>
        <span className="font-thin">{departure.trip.headsign}</span>
      </div>
      <EstimatedTimeArrival diff={diff} />
    </div>
  );
};

export default DepartureItem;
