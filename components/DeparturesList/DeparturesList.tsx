import Image from 'next/image';

import { GroupedDepartureProps } from '@/types';
import { DepartureItem } from '@/components/DepartureItem';
import { PlatformCode } from '@/components/PlatformCode';
import { useClock } from '@/hooks/useClock';
import happyTramImage from '@/public/icons/icon.svg';

type DeparturesListProps = {
  departures: GroupedDepartureProps[];
};

const DeparturesList = ({ departures }: DeparturesListProps) => {
  const departuresLength = departures?.length;
  const now = useClock().getTime();
  return (
    <>
      {departuresLength ? (
        <div className="flex flex-col gap-2 p-3 border-2 border-gray-500 dark:border-gray-700 rounded-xl">
          {departuresLength < 1 ? (
            <div className="text-black dark:text-white/75 text-center">
              No departures available
            </div>
          ) : (
            departures?.map((item: GroupedDepartureProps, idx: number) => {
              const { departures } = item;

              return (
                <div key={idx} className="w-full">
                  <PlatformCode code={departures[0].stop.platform_code} />

                  {departures.map((departure, idx) => (
                    <DepartureItem departure={departure} time={now} key={idx} />
                  ))}
                </div>
              );
            })
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 p-12 text-center">
          <Image
            src={happyTramImage}
            alt="Search your stop"
            className="max-w-[200px] md:max-w-xs"
          />
          <span className="text-xl italic">
            Find your stop, catch your ride, and never be left behind!
          </span>
        </div>
      )}
    </>
  );
};

export default DeparturesList;
