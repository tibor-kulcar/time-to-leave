import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import {
  Container,
  Icon,
  Item,
  SearchBar,
  Scroll,
  StopsList,
  ItemText,
} from '../components/Styled';
import { RootStackScreenProps } from '../types';
import StopSearch from '../components/StopSearch'
import EstimatedTimeArrival from '../components/EstimatedTimeArrival'
import { useDeparturesStore } from '../store';

export default function HomeScreen({ navigation }: RootStackScreenProps<'Root'>) {
  const [counter, setCounter] = useState(0);

  const {
    departures,
    isLoading,
    searchString,
    fetchDepartures,
  } = useDeparturesStore();

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
      <SearchBar>
        <StopSearch />
        <TouchableOpacity
          onPress={() => fetchDepartures()}
        >
          <Icon name="reload" size={24} />
        </TouchableOpacity>
      </SearchBar>

      <Scroll>
      {isLoading ? (
        <Item>
          <ItemText>Loading...</ItemText>
        </Item>
      ) : (
        <StopsList
          data={departures}
          renderItem={({ item }: { item: any }) => {
            const now = new Date().getTime();
            const prediction = new Date(item.arrival_timestamp.predicted).getTime();
            const diff = prediction - now;

            return (
              <>
                {departures && departures.length > 0 && diff > 0 && (
                  <Item faded={diff < 3000*60}>
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
      )}
      </Scroll>
    </Container >
  );
}
