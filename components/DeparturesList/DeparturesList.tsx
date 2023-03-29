import React from 'react';

import { GroupedDepartureProps } from '@/types';
import { useClock } from '@/hooks/useClock';
import { EstimatedTimeArrival } from '@/components/EstimatedTimeArrival';

type DeparturesListProps = {
  departures: GroupedDepartureProps[];
};

const DeparturesList = ({ departures }: DeparturesListProps) => {
  const now = useClock().getTime();
  const departuresLength = departures?.length || 0;

  return (
    <div className="flex flex-col gap-2 p-3 border-2 border-gray-700 rounded-xl">
      {departuresLength < 1 ? (
        <div className=" text-white/75 text-center">
          No departures available
        </div>
      ) : (
        departures?.map((item: GroupedDepartureProps, idx: number) => {
          const { departures } = item;

          return (
            <div key={idx} className="w-full">
              <div className="text-left">
                {departures[0].stop.platform_code && (
                  <span className="px-2 py-0.5 rounded-md bg-gray-500 text-gray-900 font-bold text-xs">
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
                if (diff < 0) return;
                return (
                  <div
                    className="flex justify-between w-full text-2xl"
                    key={idx}
                  >
                    <div className="flex space-x-4">
                      <span className="font-bold">
                        {departure.route.short_name}
                      </span>
                      <span className="font-thin">
                        {departure.trip.headsign}
                      </span>
                    </div>
                    <EstimatedTimeArrival diff={diff} />
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
};

export default DeparturesList;
