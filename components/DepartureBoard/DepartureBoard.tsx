import React, { useEffect, useCallback } from 'react';
import {
  Item,
  ItemText,
  Scroll,
} from '../Styled';
import EstimatedTimeArrival from '../EstimatedTimeArrival'
import { useDeparturesStore, usePersistantStore } from '../../store';
import { useClock } from '../../hooks/useClock';
import { StopsList } from './styles';

const DepartureBoard = () => {
  const {
    departures,
    fetchDepartures,
    fetchTime,
    isLoading,
  } = useDeparturesStore();
  const {
    searchString,
    walkingTime
  } = usePersistantStore();
  const walkingTimeInMilisecs = parseInt(walkingTime)*1000*60;

  const lastFetch = fetchTime.getTime();
  const now = useClock().getTime();

  useEffect(() => {
    if (now - lastFetch > 10000) {
      fetchDepartures()
    }
  }, [now]);

  useEffect(() => {
    if (searchString && !isLoading) {
      fetchDepartures()
    }
  }, [searchString]);


  const renderItem = function ({ item }: { item: any }) {
    // console.log(item)
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
    )
  };

  return (
    <Scroll>
      <StopsList
        data={departures}
        renderItem={renderItem}
      />
    </Scroll>
  );
};

export default (DepartureBoard);
