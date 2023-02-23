import React, { useEffect, useState } from 'react';


import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import EstimatedTimeArrival from "../components/EstimatedTimeArrival.jsx";
import StopSearch from "../components/StopSearch.jsx";


const Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [inputValue, setInputValue] = useState('Perunova');

  const URL = "https://api.golemio.cz/v2/pid/departureboards";
  // TDOD
  const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hYmVsZWttQGdtYWlsLmNvbSIsImlkIjoxNjY2LCJuYW1lIjpudWxsLCJzdXJuYW1lIjpudWxsLCJpYXQiOjE2NzU0MzU2NDYsImV4cCI6MTE2NzU0MzU2NDYsImlzcyI6ImdvbGVtaW8iLCJqdGkiOiIxYmNmODFhYy04MDY5LTRjMWMtYjMzMC1iNmZmNDhmZmZjYjIifQ.xHnRNNU2OkEq4Jo6Fa9kY4_L9VbO5a6p87p4-QfyatQ";
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
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <StopSearch inputValue={inputValue} setInput={setInputValue} />
        <TouchableOpacity
          onPress={() => getData()}
        >
          <Ionicons name="reload" size={24} />
        </TouchableOpacity>
      </View>


      <View style={styles.scroll}>
      {isLoading ? (
        <View style={styles.item}>
          <Text style={styles.textTime}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
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
                    <Text style={styles.textName}>
                      {item.route.short_name} {item.stop.platform_code}
                    </Text>

                    <EstimatedTimeArrival diff={diff} />
                  </View>
                )}
              </>
            )
          }}
        />
      )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight,
    // backgroundColor: "#111",
  },
  scroll: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    zIndex: 1,
  },
  search: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%",
    padding: 5,
    zIndex: 10,
  },
  list: {
    // borderColor: "#111",
    zIndex: 100,
    position: "relative",
  },
  item: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    paddingHorizontal: 25,
    // borderColor: "#111"
  },
  textName: {
    // color: "#777777",
    fontSize: 48,
  },
  textNameFaded: {
    opacity: 0.3
  },
  textTime: {
    // color: "#fff",
    fontSize: 48,
  },
});

export default Home;


