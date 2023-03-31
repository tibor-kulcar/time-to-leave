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
  if (diff < 0) return <></>;
  return (
    <div
      className={clsx(
        diff < walkingTimeInMilisecs && 'opacity-50',
        'flex space-x-4 w-full text-2xl'
      )}
    >
      <span className="font-semibold">{departure.route.short_name}</span>
      <span className="block flex-1 font-normal truncate overflow-hidden">
        {departure.trip.headsign}
      </span>
      <EstimatedTimeArrival diff={diff} />
    </div>
  );
};

export default DepartureItem;
