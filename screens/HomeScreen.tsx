import { useState, useEffect } from 'react';

import {
  Container,
  Item,
  ItemText,
  Scroll,
  StopsList,
} from '../components/Styled';
import {
  EstimatedTimeArrival,
  SearchBar,
} from '../components'

import { RootStackScreenProps } from '../types';
import { useDeparturesStore } from '../store';

export default function HomeScreen({ navigation }: RootStackScreenProps<'Root'>) {
  const [counter, setCounter] = useState(0);
  const {
    departures,
    searchString,
    walkingTime,
    fetchDepartures,
  } = useDeparturesStore();
  const walkingTimeInMilisecs = parseInt(walkingTime)*1000*60;

  useEffect(() => {
    if (counter == 0) fetchDepartures();

    const timeout = setTimeout(() => {
      setCounter(counter => counter + 1);

      if (counter > 8) {
        setCounter(0);
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [counter]);

  useEffect(() => {
    if (searchString) fetchDepartures();
  }, [searchString]);

  return (
    <Container>
      <SearchBar />

      <Scroll>
        <StopsList
          data={departures}
          renderItem={({ item }: { item: any }) => {
            const now = new Date().getTime();
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
          }}
        />
      </Scroll>
    </Container >
  );
}
