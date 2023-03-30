import React from 'react';

import { GroupedDepartureProps } from '@/types';
import { DepartureItem } from '@/components/DepartureItem';

type DeparturesListProps = {
  departures: GroupedDepartureProps[];
};

const DeparturesList = ({ departures }: DeparturesListProps) => {
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

              {departures.map((departure, idx) => (
                <DepartureItem departure={departure} key={idx} />
              ))}
            </div>
          );
        })
      )}
    </div>
  );
};

export default DeparturesList;
