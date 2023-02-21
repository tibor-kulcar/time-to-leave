import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import pidStops from '../external_data/pid-stops.json';

const stopNames = pidStops.map(stop => stop.stop_name);
// remove duplicates
const stops = [...new Set(stopNames)];

const StopSearch = ({setInput}) => {
  const [text, setText] = useState('');

  const filterData = (text) => {
    if (text == '') return [''];

    const filteredStops = stops.filter(stop => stop.toLowerCase().includes(text.toLowerCase()));
    if (text == filteredStops[0]) return[''];
    return filteredStops;
  };

  const data = filterData(text);
  return (
    <>
      <Autocomplete
        data={data}
        value={text}
        style={styles.input}
        onChangeText={(txt) => {
          setText(txt);
        }}
        flatListProps={{
          keyExtractor: (_, idx) => idx,
          renderItem: ({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setText(item);
                setInput(item);
              }}
            >
              <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </>
  )
};
const styles = StyleSheet.create({
  text: {
    padding: "5px",
    color: "#fff",
    backgroundColor: "#000",
    fontSize: "1rem", // Set the font size to 24
  },
  input: {
    height: 40,
    color: "#000",
    borderWidth: 0,
    padding: 10,
  },
});


export default StopSearch;