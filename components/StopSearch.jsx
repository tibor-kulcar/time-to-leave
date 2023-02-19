import React from 'react';
import { StyleSheet, Text } from 'react-native';


const StopSearch = () => {
  const name = 'Stopsearch';
  return (
    <>
      <Text style={styles.text}>Hello, I am {name}!</Text>;
      <Text></Text>
    </>
  )
};
const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: "3rem", // Set the font size to 24
  }
});


export default StopSearch;