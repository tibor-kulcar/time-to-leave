import { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { REACT_APP_API_KEY } from "@env"

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

export default function HomeScreen({ navigation }: RootStackScreenProps<'Root'>) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState('Perunova');
  const URL = "https://api.golemio.cz/v2/pid/departureboards";

  const query = {
    names: inputValue,
    minutesBefore: 0,
    minutesAfter: 60,
    includeMetroTrains: true,
    preferredTimezone: 'Europe/Prague',
    mode: 'departures',
    order: 'real',
    filter: 'routeOnce',
    skip: 'canceled',
    limit: 10,
    total: 10,
    offset: 0,
  };

  interface Item {
    arrival_timestamp: {
      predicted: string;
    };
    route: {
      short_name: string;
    };
    stop: {
      platform_code: string;
    };
  }

  const getQueryString = (queries: {[key: string]: any}): string => {
    return Object.keys(queries).reduce((result: string[], key: string) => {
      return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`]
    }, []).join('&');
  };

  const getData = async () => {
    try {
      const response = await fetch(URL + '?' + getQueryString(query), {
        method: "GET",
        headers: {
          "X-Access-Token": REACT_APP_API_KEY,
        },
      });
      const json = await response.json();
      // console.log(json)
      setData(json.departures);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (counter == 0) getData();

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
    if (inputValue) getData();
  }, [inputValue]);

  return (
    <Container>
      <SearchBar>
        <StopSearch setInput={setInputValue} />
        <TouchableOpacity
          onPress={() => getData()}
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
          data={data}
          renderItem={({ item }: { item: any }) => {
            const now = new Date().getTime();
            const prediction = new Date(item.arrival_timestamp.predicted).getTime();
            const diff = prediction - now;

            return (
              <>
                {data && data.length > 0 && diff > 0 && (
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
