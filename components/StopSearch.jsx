import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import pidStops from '../external_data/pid-stops.json';

const stopNames = pidStops.map(stop => stop.stop_name);
// remove duplicates
const stops = [...new Set(stopNames)];

const normalize = (str) => {
  const lwrcs = str.toLowerCase();
  return lwrcs.normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

const filterData = (text) => {
  if (text == '') return [''];

  const filteredStops = stops.filter(stop => normalize(stop).includes(normalize(text)));
  if (text == filteredStops[0]) return[''];
  return filteredStops;
};

const StopSearch = ({setInput}) => {
  const [text, setText] = useState('');
  const data = filterData(text);

  return (
    <Autocomplete
      data={data}
      value={text}
      containerStyle={styles.container}
      inputContainerStyle={styles.inpuContainer}
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
  )
};

const styles = StyleSheet.create({
  container: {
  },
  inpuContainer: {
    borderColor: "#111",
    borderBottomColor: "#777",
  },
  text: {
    padding: "5px",
    color: "#fff",
    backgroundColor: "#000",
    fontSize: "1rem", // Set the font size to 24
  },
  input: {
    height: 40,
    width: "100%",
    color: "#fff",
    backgroundColor: "#111",
    paddingHorizontal: 10,
  },
});

export default StopSearch;
