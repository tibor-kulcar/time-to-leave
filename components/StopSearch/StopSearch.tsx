import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { withTheme, DefaultTheme } from 'styled-components/native';

import { SearchItem, SearchItemText } from './styles';
import { useDeparturesStore } from '../../store';
import pidStops from '../../external_data/pid-stops.json';

interface Stop {
  stop_name: string;
}

const pidStopsArray: Stop[] = pidStops as Stop[]; // Type assertion to cast JSON to Stop[]

const stopNames = pidStopsArray ? pidStopsArray.map(stop => stop.stop_name) : [];
// remove duplicates
const stops = [...new Set(stopNames)];

const normalize = ({ str }:{ str:string }) => {
  const lwrcs = str ? str.toLowerCase() : '';
  return lwrcs.normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

const filterData = ({ text }:{ text:string }) => {
  if (text == '') return [''];

  const filteredStops = stops.filter(stop => normalize({ str: stop }).includes(normalize({ str: text })));
  if (text == filteredStops[0]) return[''];
  return filteredStops;
};

interface StopSearchProps {
  theme: DefaultTheme;
}

const StopSearch = ({ theme }: StopSearchProps) => {
  const { searchString, setSearchString } = useDeparturesStore();
  const [text, setText] = useState(searchString);
  const data = filterData({text: text});

  return (
    <Autocomplete
      data={data}
      value={text}
      onChangeText={(txt) => {
        setText(txt);
      }}
      flatListProps={{
        keyExtractor: (_) => _,
        renderItem: ({ item }) => {
          // console.log(item)
          return (
          <>
            {item && (
              <SearchItem
                onPress={() => {
                  setText(item);
                  setSearchString(item);
                }}
              >
                <SearchItemText>{item}</SearchItemText>
              </SearchItem>
            )}
          </>
        )},
      }}
      containerStyle={[
        styles.container,
        { borderColor: theme.colors.background }
      ]}
      inputContainerStyle={[
        styles.inpuContainer,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.background,
        }
      ]}
      listContainerStyle={[
        styles.listContainer,
        { backgroundColor: theme.colors.background }
      ]
      }
      style={[
        styles.input,
        {
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
          borderColor: theme.colors.background,
        }
      ]}
    />
  );
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

export default withTheme(StopSearch);
