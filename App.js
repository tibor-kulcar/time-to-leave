import React, {useEffect, useState, useRef} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const [stopInput, setText] = useState('');
    
  function handleChange(event) {
      setText(event.target.value);
    }

  const URL = "https://api.golemio.cz/v2/pid/departureboards";
  const API_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hYmVsZWttQGdtYWlsLmNvbSIsImlkIjoxNjY2LCJuYW1lIjpudWxsLCJzdXJuYW1lIjpudWxsLCJpYXQiOjE2NzU0MzU2NDYsImV4cCI6MTE2NzU0MzU2NDYsImlzcyI6ImdvbGVtaW8iLCJqdGkiOiIxYmNmODFhYy04MDY5LTRjMWMtYjMzMC1iNmZmNDhmZmZjYjIifQ.xHnRNNU2OkEq4Jo6Fa9kY4_L9VbO5a6p87p4-QfyatQ";
  const query = {
    names:[stopInput],
    minutesBefore: 0,
    minutesAfter: 20,
    includeMetroTrains: true,
    preferredTimezone: 'Europe/Prague',
    mode: 'departures',
    order: 'real',
    filter: 'routeOnce',
    skip: 'canceled',
    limit: 3,
    total: 3,
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

  const formatTime = (timeString) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZone: "Europe/Prague",
    };
    const now = new Date();
    const given = new Date(timeString);
    console.log(
      'NOW: ', new Intl.DateTimeFormat('cs-CZ', options).format(now),
      'EST: ', new Intl.DateTimeFormat('cs-CZ', options).format(given),
      given - now

    )
    const timeLeft = given - now;

    const output = new Intl.DateTimeFormat('cs-CZ', options).format(timeLeft);

    return output
  }

  const getTimeDiff = (timeString) => {
    const now = new Date();
    const given = new Date(timeString);

    const diff = given - now;
    const sec = (diff / 1000);
    const min = Math.floor(sec / 60);
    const diffSecs = Math.floor(sec - (min * 60));
    console.log('diffSecs', diffSecs);

    return min + " : " + diffSecs;
  }

  useEffect(() => {
    console.log('effect entered: ', counter)
    if (counter == 0) getData();

    const timeout = setTimeout(() => {
      console.log('timeout triggered', counter);
      setCounter(counter => counter + 1);

      if (counter > 8) {
        console.log('counter is now: ', counter)
        setCounter(0);
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [counter]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
      </Text>

      <input type="text" value={stopInput} onChange={handleChange} />
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
            <Text style={styles.textTime}>
              {getTimeDiff(item.arrival_timestamp.predicted)}
            </Text>
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
