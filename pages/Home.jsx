import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import {
  Container,
  SearchBar,
  Scroll,
  StopsList,
  Item,
  ItemText,
  Icon,
} from '../style';

import EstimatedTimeArrival from "../components/EstimatedTimeArrival.jsx";
import StopSearch from "../components/StopSearch.jsx";


const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState('Perunova');

  const URL = "https://api.golemio.cz/v2/pid/departureboards";
  // TDOD
  const API_TOKEN = "***REMOVED***";
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

  const getQueryString = (queries) => {
    return Object.keys(queries).reduce((result, key) => {
        return [...result, `${encodeURIComponent(key)}=${encodeURIComponent(queries[key])}`]
    }, []).join('&');
  };

  const getData = async () => {
    try {
      const response = await fetch(URL + '?' + getQueryString(query), {
        method: "GET",
        headers: {
          "X-Access-Token": API_TOKEN,
        },
      });
      const json = await response.json();
      // console.log(json)
      setData(json);
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
        <StopSearch inputValue={inputValue} setInput={setInputValue} />
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
          data={data.departures}
          renderItem={({item}) => {
            const now = new Date();
            const prediction = new Date(item.arrival_timestamp.predicted);
            const diff = prediction - now;

            return (
              <>
                {data && data.departures.length > 0 && diff > 0 && (
                  <View style={[
                    styles.item,
                    diff < 3000*60 ?
                      styles.textNameFaded :
                      null
                  ]}>
                    <ItemText>
                      {item.route.short_name} {item.stop.platform_code}
                    </ItemText>

                    <EstimatedTimeArrival diff={diff} />
                  </View>
                )}
              </>
            )
          }}
        />
      )}
      </Scroll>
    </Container>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  textNameFaded: {
    opacity: 0.3
  },
});

export default Home;


