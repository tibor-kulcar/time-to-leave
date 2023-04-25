import { DepartureProps, GroupedDepartureProps } from '../types';

export function useGroupDepartures(departures: DepartureProps[]) {
  const groupedData: GroupedDepartureProps[] = [];

  departures?.forEach((departure) => {
    const platformCode = departure.stop.platform_code;
    const platformIndex = groupedData.findIndex(
      (group) => group.platformCode === platformCode
    );

    if (platformIndex === -1) {
      groupedData.push({ platformCode, departures: [departure] });
    } else {
      groupedData[platformIndex].departures.push(departure);
    }
  });

  return groupedData.sort((a, b) =>
    a.platformCode?.localeCompare(b.platformCode)
  );
}
