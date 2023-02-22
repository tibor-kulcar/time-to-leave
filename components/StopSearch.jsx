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
          item && (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              setText(item);
              setInput(item);
            }}
          >
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
          )
        ),
      }}
    />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  inpuContainer: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
    // backgroundColor: "#111",
    borderColor: "transparent"
  },
  text: {
    padding: 5,
    // color: "#fff",
    // backgroundColor: "#000",
    fontSize: 18, // Set the font size to 24
  },
  input: {
    height: "100%",
    flex: 1,
    fontSize: 24,
    // color: "#fff",
    // backgroundColor: "#000",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  listContainer: {
    position: "relative",
    // backgroundColor: "#000",
    // borderColor: "#111",
  },
  item: {
    paddingVertical: 10,
    // backgroundColor: "#000",
    // borderColor: "#111",
  }
});

export default StopSearch;
