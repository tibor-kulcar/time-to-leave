import { DepartureProps, GroupedDepartureProps } from '../types';

export function useGroupDepartures(departures: DepartureProps[]) {
  const groupedData = departures?.reduce(
    (result: GroupedDepartureProps[], current: DepartureProps) => {
      const platformCode = current.stop.platform_code;
      const platformIndex = result.findIndex(
        (platform) => platform.platformCode === platformCode
      );

      if (platformIndex === -1) {
        result.push({ platformCode: platformCode, departures: [current] });
      } else {
        result[platformIndex].departures.push(current);
      }
      return result;
    },
    []
  );
  // console.log(groupedData);
  return groupedData;
}
