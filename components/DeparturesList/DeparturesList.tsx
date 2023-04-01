import { GroupedDepartureProps } from '@/types';
import { DepartureItem } from '@/components/DepartureItem';
import { PlatformCode } from '@/components/PlatformCode';
import { useClock } from '@/hooks/useClock';

type DeparturesListProps = {
  departures: GroupedDepartureProps[];
};

const DeparturesList = ({ departures }: DeparturesListProps) => {
  const departuresLength = departures?.length || 0;
  const now = useClock().getTime();
  return (
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
  );
};

export default DeparturesList;
