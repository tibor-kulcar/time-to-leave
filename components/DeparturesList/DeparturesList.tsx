import React from 'react';

import { GroupedDepartureProps } from '@/types';
import { useClock } from '@/hooks/useClock';
import { EstimatedTimeArrival } from '@/components/EstimatedTimeArrival';

type DeparturesListProps = {
  departures: GroupedDepartureProps[];
};

const DeparturesList = ({ departures }: DeparturesListProps) => {
  const now = useClock().getTime();
  return (
    <>
      {departures?.map((item: GroupedDepartureProps, idx: number) => {
        const { departures } = item;
        // const departuresLength = departures.length;

        return (
          <div key={idx} className="w-full">
            <div className="text-left">
              {departures[0].stop.platform_code && (
                <span className="px-2 py-0.5 rounded bg-gray-200 text-gray-900 font-semibold text-xs">
                  {`${departures[0].stop.platform_code} `}
                </span>
              )}
            </div>

            {departures.map((departure, idx) => {
              const prediction = new Date(
                departure.departure_timestamp.predicted ||
                  departure.departure_timestamp.scheduled
              ).getTime();
              const diff = prediction - now;

              return (
                <div className="flex justify-between w-full text-2xl" key={idx}>
                  <div className="flex space-x-4">
                    <span className="font-bold">
                      {departure.route.short_name}
                    </span>
                    <span className="font-thin">{departure.trip.headsign}</span>
                  </div>
                  <EstimatedTimeArrival diff={diff} />
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
};

export default DeparturesList;
