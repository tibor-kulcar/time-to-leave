import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
 const URL="https://api.golemio.cz/v2/pid/departureboards?names=Perunova&minutesBefore=10&minutesAfter=20&includeMetroTrains=true&preferredTimezone=Europe_Prague&mode=departures&order=real&filter=routeOnce&skip=canceled&limit=3&total=3&offset=0";
 const API_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hYmVsZWttQGdtYWlsLmNvbSIsImlkIjoxNjY2LCJuYW1lIjpudWxsLCJzdXJuYW1lIjpudWxsLCJpYXQiOjE2NzU0MzU2NDYsImV4cCI6MTE2NzU0MzU2NDYsImlzcyI6ImdvbGVtaW8iLCJqdGkiOiIxYmNmODFhYy04MDY5LTRjMWMtYjMzMC1iNmZmNDhmZmZjYjIifQ.xHnRNNU2OkEq4Jo6Fa9kY4_L9VbO5a6p87p4-QfyatQ";
 async function getData(url = '') {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'X-Access-Token': API_TOKEN,
    },
  
  });
  
  return response.json(); // parses JSON response into native JavaScript objects
}

getData(URL)
  .then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.text} >Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: '3rem', // Set the font size to 24
  }
});
