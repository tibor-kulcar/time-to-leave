import React, {useEffect, useState, useRef} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";

import EstimatedTimeArrival from "./components/EstimatedTimeArrival.jsx";
import StopSearch from "./components/StopSearch.jsx";

export default function App() {
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
    minutesAfter: 120,
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
      console.log(json)
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
  }, [inputValue])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
      </Text>


      <Text style={styles.text}>Hello, I am {inputValue}!</Text>
      <StopSearch setInput={setInputValue} />
      {/*

      setInput je v stopsearch {setInput}, a v returne sa vola setInput(txt),
      setInputValue je definovane tu v App.js ako inputValue, setInputValue

      */}
      {isLoading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <FlatList
          data={data.departures}
          renderItem={({item}) => (
          <>
            <Text style={styles.textName}>
              {item.route.short_name} {item.stop.platform_code}
            </Text>

            <EstimatedTimeArrival time={item} />
          </>
        )}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  textName: {
    color: "#777777",
    fontSize: "3rem", // Set the font size to 24
  },
  textTime: {
    color: "#fff",
    fontSize: "3rem", // Set the font size to 24
  }
});
