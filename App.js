import React, {useEffect, useState, useRef} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);
  const secondhand = 0;
  const URL =
    "https://api.golemio.cz/v2/pid/departureboards?names=Perunova&minutesBefore=0&minutesAfter=20&includeMetroTrains=true&preferredTimezone=Europe_Prague&mode=departures&order=real&filter=routeOnce&skip=canceled&limit=3&total=3&offset=0";
  const API_TOKEN =
    "***REMOVED***";

  const getData = async () => {
    try {
      const response = await fetch(URL, {
        method: "GET", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "X-Access-Token": API_TOKEN,
        },
      });
      const json = await response.json();
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
    console.log('counter------', counter);
    const diff = secondhand == 0 ? (given - now) : (given - now) - (secondhand * 1000);
    const sec = (diff / 1000);
    const min = Math.floor(sec / 60);
    const diffSecs = Math.floor(sec - (min * 60));
    console.log('diffSecs', diffSecs);

    return min + " : " + diffSecs;
  }

  useEffect(() => {
    getData();
    const timeout = setTimeout(() => {
      setCounter(counter => counter + 1);
      const secondhand = counter + 1 ;
      //console.log('counter counter', counterRef.current);
      if (counter > 9) {
        getData();
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

      {isLoading ? (
        <Text style={styles.text}>Loading...</Text>
      ) : (
        <FlatList
          data={data.departures}
          renderItem={({item}) => (
          <>
            <Text style={styles.textName}>
              {item.route.short_name}
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
