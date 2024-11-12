'use client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { DepartureProps } from '@/types';
import { EstimatedTimeArrival } from '@/components/EstimatedTimeArrival';
import { useNotification } from '@/notifications/useNotification';

const walkingTimeInMilisecs = 3 * 60 * 1000;

type DepartureItemProps = {
  departure: DepartureProps;
  time: number;
};

const DepartureItem = ({ departure, time }: DepartureItemProps) => {
  const { isSupported, isSubscribed, handleSubscribe, subscription } =
    useNotification();
  const [isActive, setIsActive] = useState(false);

  const prediction = new Date(
    departure.departure_timestamp.predicted ||
      departure.departure_timestamp.scheduled
  ).getTime();
  const diff = prediction - time;

  // Move the useEffect before any conditional returns
  useEffect(() => {
    // If departure time has passed, don't set up notifications
    if (diff < 0) return;

    const sendNotification = async (title: string, message: string) => {
      if (!subscription) return;

      await fetch('/api/web-push/send', {
        method: 'POST',
        body: JSON.stringify({ title, message, subscription }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    };

    const shouldNotify = isActive && diff < walkingTimeInMilisecs;

    if (shouldNotify) {
      sendNotification(
        `Your tram ${departure.route.short_name} is arriving`,
        `In ${Math.floor(walkingTimeInMilisecs / 60000)} minutes`
      );
      setIsActive(false);
    }
  }, [isActive, diff, departure.route.short_name, subscription]);

  // After all Hooks, we can do the conditional return
  if (diff < 0) {
    return null;
  }

  return (
    <>
      {!isSupported && (
        <div className="p-6 w-full max-w-md">
          <p className="mb-6 text-center text-red-500">
            Push notifications are not supported in this browser. Consider
            adding to the home screen (PWA) if on iOS.
          </p>
        </div>
      )}
      <div
        onClick={() => {
          isSubscribed ? setIsActive(true) : handleSubscribe();
        }}
        className={clsx(
          'gap-2 grid grid-flow-col auto-cols-[_2.8rem_2fr_auto] w-full text-2xl leading-tight'
        )}
      >
        <span className="font-semibold">{departure.route.short_name}</span>
        <span className="w-full font-normal truncate overflow-hidden">
          {departure.trip.headsign}
        </span>
        <EstimatedTimeArrival diff={diff} />
      </div>
    </>
  );
};

export default DepartureItem;
