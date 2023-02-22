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
      listContainerStyle={styles.listContainer}
      style={styles.input}
      onChangeText={(txt) => {
        setText(txt);
      }}
      flatListProps={{
        keyExtractor: (_, idx) => idx,
        renderItem: ({ item }) => (
          <TouchableOpacity
            style={styles.item}
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
    flex: 1,
    paddingHorizontal: 10,
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
    fontSize: 24,
    color: "#fff",
    backgroundColor: "#000",
    paddingHorizontal: 10,
  },
  listContainer: {
    position: "relative",
    borderColor: "#111",
    backgroundColor: "#000",
    zIndex: 100,

  },
  item: {
    paddingVertical: 10,
    backgroundColor: "#000"
  }
});

export default StopSearch;
