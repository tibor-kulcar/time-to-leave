import React, { useEffect } from 'react';
import { ListRenderItem } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { ItemProps } from '../../types';
import { usePersistantStore } from '../../store';
import { useClock } from '../../hooks/useClock';
import { fetchDepartures } from '../../fetchers/pid';
import { Item, ItemText, Scroll } from '../Styled';
import EstimatedTimeArrival from '../EstimatedTimeArrival';
import { StopsList } from './styles';

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
  const walkingTimeInMilisecs = parseInt(walkingTime) * 1000 * 60;
  const now = useClock().getTime();

  useEffect(() => {
    if (searchString && !isLoading) {
      refetch();
    }
  }, [searchString]);

  const renderItem: ListRenderItem<ItemProps> = ({ item }) => {
    const prediction = new Date(item.arrival_timestamp.predicted).getTime();
    const diff = prediction - now;

    return (
      <>
        {departures && departures.length > 0 && diff > 0 && (
          <Item faded={diff < walkingTimeInMilisecs}>
            <ItemText>
              {item.route.short_name} {item.stop.platform_code}
            </ItemText>

            <EstimatedTimeArrival diff={diff} />
          </Item>
        )}
      </>
    );
  };

  return (
    <Scroll>
      <StopsList data={departures} renderItem={renderItem} />
    </Scroll>
  );
};

export default DepartureBoard;
