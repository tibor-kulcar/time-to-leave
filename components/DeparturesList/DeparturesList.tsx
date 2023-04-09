import Image from 'next/image';

import { GroupedDepartureProps } from '@/types';
import { DepartureItem } from '@/components/DepartureItem';
import { PlatformCode } from '@/components/PlatformCode';
import { useClock } from '@/hooks/useClock';
import happyTramImage from '@/public/icons/icon-512x512.png';

type DeparturesListProps = {
  departures: GroupedDepartureProps[];
};

const DeparturesList = ({ departures }: DeparturesListProps) => {
  const departuresLength = departures?.length;
  const now = useClock().getTime();
  return (
    <>
      {departuresLength ? (
        <div className="flex flex-col gap-2 p-3 border border-gray-500 dark:border-gray-700 rounded-[1.25rem]">
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
        <div className="flex flex-col items-center gap-10 p-12 text-center">
          <div className="rounded-[2rem] overflow-hidden">
            <Image
              src={happyTramImage}
              alt="Search your stop"
              className="round-xl max-w-[9rem] md:max-w-xs"
            />
          </div>
          <span className="text-xl italic opacity-75">
            Find your stop,
            <br />
            catch your ride,
            <br />
            never stay behind!
          </span>
        </div>
      )}
    </>
  );
};

export default DeparturesList;
