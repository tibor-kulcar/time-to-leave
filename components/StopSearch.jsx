import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

import pidStops from '../external_data/pid-stops.json';
import { darkTheme, lightTheme } from '../theme';
import {
  Container,
  SearchBar,
  Scroll,
  StopsList,
  SearchItem,
  SearchItemText,
} from '../style';




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

const StopSearch = ({inputValue, setInput}) => {
  const [text, setText] = useState(inputValue);
  const data = filterData(text);

  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme

  return (
    <Autocomplete
      data={data}
      value={text}
      containerStyle={[styles.container, {
        borderColor: theme['BACKGROUND_COLOR']
      }]}
      inputContainerStyle={[styles.inpuContainer, {
        backgroundColor: theme['BACKGROUND_COLOR'],
        borderColor: theme['BACKGROUND_COLOR']
      }]}
      listContainerStyle={[styles.listContainer, {
        backgroundColor: theme['BACKGROUND_COLOR'],
      }]}
      style={[styles.input, {
        color: theme['TEXT_COLOR'],
        backgroundColor: theme['BACKGROUND_COLOR'],
        borderColor: theme['BACKGROUND_COLOR']
      }]}
      onChangeText={(txt) => {
        setText(txt);
      }}
      flatListProps={{
        keyExtractor: (_, idx) => idx,
        renderItem: ({ item }) => (
          <>
            {item && (
              <SearchItem
                onPress={() => {
                  setText(item);
                  setInput(item);
                }}
              >
                <SearchItemText>{item}</SearchItemText>
              </SearchItem>
            )}
          </>
        ),
      }}
    />
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 40,
    width: "100%",
    paddingHorizontal: 10,
  },
  inpuContainer: {
    flex: 1,
    width: "100%",
  },
  input: {
    height: "100%",
    flex: 1,
    fontSize: 24,
    paddingVertical: 5,
  },
  listContainer: {
    position: "relative",
  },
});


export default StopSearch;
