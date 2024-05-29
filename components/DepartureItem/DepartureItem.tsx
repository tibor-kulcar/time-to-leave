import clsx from 'clsx';
import { Drawer } from 'vaul';
import { useState } from 'react';

import { DepartureProps } from '@/types';
import { EstimatedTimeArrival } from '@/components/EstimatedTimeArrival';

// const walkingTimeInMilisecs = 3 * 60 * 1000;

type DepartureItemProps = {
  departure: DepartureProps;
  time: number;
};

const DepartureItem = ({ departure, time }: DepartureItemProps) => {
  // console.count('DepartureItem');
  const [snap, setSnap] = useState<number | string | null>('256px');

  const prediction = new Date(
    departure.departure_timestamp.predicted ||
      departure.departure_timestamp.scheduled
  ).getTime();
  const diff = prediction - time;

  if (diff < 0) return <></>;

  return (
    <Drawer.Root
      snapPoints={['256px', '512px']}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <Drawer.Overlay className="fixed inset-0 bg-black/40" />
      <Drawer.Trigger asChild>
        <button className="focus:border-none">
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
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Content
          className="
            flex flex-col
            fixed
            bottom-0 left-0 right-0
            h-full max-h-[97%]
            mx-[-1px]
            z-50
            bg-white
            border border-gray-200 border-b-none rounded-t-[10px]
          "
        >
          <div
            className="`
              flex flex-col max-w-md mx-auto w-full p-4 pt-5
              ${snap === 1 ? 'overflow-y-auto':'overflow-hidden'}
            `"
          >
            <div className="flex flex-col gap-8 text-gray-600">
              <div className="flex gap-4">
                <span className="text-5xl font-semibold">
                  {departure.route.short_name}
                </span>
                <div className="flex flex-col">
                  <div>
                    <small>Platform:</small>
                    {departure.stop.platform_code}
                  </div>
                  <div>
                    <small>Headsign:</small>
                    {departure.trip.headsign}
                  </div>
                </div>
              </div>
              <ul>
                <li>
                  <small>Arrival:</small>{' '}
                  {departure.arrival_timestamp.predicted
                    ? departure.arrival_timestamp.predicted
                    : departure.arrival_timestamp.scheduled}
                </li>
                <li>
                  <small>Departure:</small>{' '}
                  {departure.departure_timestamp.predicted
                    ? departure.departure_timestamp.predicted
                    : departure.departure_timestamp.scheduled}
                </li>
                <li>
                  <small>Delay:</small>{' '}
                  {departure.delay.is_available
                    ? `${departure.delay.minutes}min ${departure.delay.seconds}sec `
                    : null}
                </li>
                <li>
                  <small>Last stop:</small>
                  {departure.last_stop.name}
                </li>
              </ul>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default DepartureItem;
