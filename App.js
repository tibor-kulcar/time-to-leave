import React, {useEffect, useState} from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList } from "react-native";

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const URL =
    "https://api.golemio.cz/v2/pid/departureboards?names=Perunova&minutesBefore=10&minutesAfter=20&includeMetroTrains=true&preferredTimezone=Europe_Prague&mode=departures&order=real&filter=routeOnce&skip=canceled&limit=3&total=3&offset=0";
  const API_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hYmVsZWttQGdtYWlsLmNvbSIsImlkIjoxNjY2LCJuYW1lIjpudWxsLCJzdXJuYW1lIjpudWxsLCJpYXQiOjE2NzU0MzU2NDYsImV4cCI6MTE2NzU0MzU2NDYsImlzcyI6ImdvbGVtaW8iLCJqdGkiOiIxYmNmODFhYy04MDY5LTRjMWMtYjMzMC1iNmZmNDhmZmZjYjIifQ.xHnRNNU2OkEq4Jo6Fa9kY4_L9VbO5a6p87p4-QfyatQ";

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
    const date = new Date(timeString);
    console.log(date)
    const output = new Intl.DateTimeFormat('cs-CZ', { timeStyle: 'short', timeZone: 'Europe/Prague' }).format(date);
    return output
  }



  useEffect(() => {
    getData();
  }, []);

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
            <Text style={styles.text}>
              {item.route.short_name}
            </Text>
            <Text>
              {formatTime(item.arrival_timestamp.predicted)}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: "3rem", // Set the font size to 24
  },
});
