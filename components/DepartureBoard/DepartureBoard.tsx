import React, { useEffect } from 'react';
import { ListRenderItem, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { DepartureProps } from '../../types';
import { usePersistantStore } from '../../store';
import { useClock } from '../../hooks/useClock';
import { fetchDepartures } from '../../fetchers/pid';
import { Item, ItemText, Scroll } from '../Styled';
import EstimatedTimeArrival from '../EstimatedTimeArrival';
import { StopsList, StopsListHeader, StopsListHeaderText } from './styles';

const DepartureBoard = () => {
  const { searchString, walkingTime } = usePersistantStore();
  const { isLoading, data, refetch } = useQuery(
    ['departures'],
    fetchDepartures,
    {
      refetchInterval: 10000,
      refetchOnWindowFocus: true,
    }
  );
  const { departures } = data?.data || [];

  // console.log(departures);

  // const groupedData = departures?.reduce((result: any, current: any) => {
  //   const platformCode = current.stop.platform_code;
  //   if (!result[platformCode]) {
  //     result[platformCode] = [];
  //   }
  //   result[platformCode].push(current);
  //   return result;
  // }, {});

  type GroupedDeparture = {
    platformCode: string;
    departures: DepartureProps[];
  };

  const groupedData = departures?.reduce(
    (result: GroupedDeparture[], current: DepartureProps) => {
      const platformCode = current.stop.platform_code;
      const platformIndex = result.findIndex(
        (platform) => platform.platformCode === platformCode
      );

      if (platformIndex === -1) {
        result.push({ platformCode, departures: [current] });
      } else {
        result[platformIndex].departures.push(current);
      }

      return result;
    },
    []
  );

  const walkingTimeInMilisecs = parseInt(walkingTime) * 1000 * 60;
  const now = useClock().getTime();

  useEffect(() => {
    if (searchString && !isLoading) {
      refetch();
    }
  }, [searchString]);

  const renderItem: ListRenderItem<GroupedDeparture> = ({ item }) => {
    const { departures } = item;
    const departuresLength = departures.length - 2;

    return (
      <>
        <StopsListHeader>
          <StopsListHeaderText>
            {departures.map((departure, idx) => {
              const result =
                departure.trip.headsign + (departuresLength < idx ? '' : ' / ');
              return result;
            })}
          </StopsListHeaderText>
        </StopsListHeader>

        {departures &&
          departures.length > 0 &&
          departures.map((departure) => {
            const prediction = new Date(
              departure.arrival_timestamp.predicted
            ).getTime();
            const diff = prediction - now;
            return (
              <Item
                faded={diff < walkingTimeInMilisecs}
                key={departure.trip.id}
              >
                <ItemText>{departure.route.short_name}</ItemText>

                <EstimatedTimeArrival diff={diff} />
              </Item>
            );
          })}
      </>
    );
  };

  return (
    <Scroll>
      {groupedData && <StopsList data={groupedData} renderItem={renderItem} />}
    </Scroll>
  );
};

export default DepartureBoard;
