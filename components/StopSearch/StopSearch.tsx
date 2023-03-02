import React, { useState, memo, useCallback, useMemo } from 'react';
import { StyleSheet, ListRenderItemInfo, ListRenderItem } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { withTheme, DefaultTheme } from 'styled-components/native';

import { SearchItem, SearchItemText } from './styles';
import { usePersistantStore } from '../../store';
import { useDebounce } from '../../hooks/useDebounce';
import stops from '../../external_data/pid-stops.json';

const normalize = ({ str }:{ str:string }) => {
  const lwrcs = str ? str.toLowerCase() : '';
  return lwrcs.normalize("NFD").replace(/\p{Diacritic}/gu, "")
}

interface StopSearchProps {
  theme: DefaultTheme;
}

const StopSearch = ({ theme }: StopSearchProps) => {
  console.log("Stopsearch")
  const { searchString, setSearchString } = usePersistantStore();
  const [text, setText] = useState(searchString);
  const debouncedValue = useDebounce(text, 300);


  const getData = ({ text }:{ text:string }, { maxResults }:{ maxResults:number }) => {
    if (text == '') return [''];

    const filteredStops = stops
      .filter(stop => normalize({ str: stop })
      .includes(normalize({ str: text })))
      .slice(0, maxResults);
    if (text == filteredStops[0]) return[''];
    return filteredStops;
  };

  const data = getData({text: debouncedValue},{maxResults: 20});

  const renderItem = function (item:string) {
    console.log('item')
    return (
      <>
        {item && (
          <SearchItem
            onPress={() => {
              setText(item);
              setSearchString(item)
            }}
          >
            <SearchItemText>{item}</SearchItemText>
          </SearchItem>
        )}
      </>
    )
  };

  return (
    <Autocomplete
      data={data}
      value={text}
      placeholder={searchString}
      onChangeText={(txt) => {
        setText(txt);
      }}
      flatListProps={{
        renderItem: ({item}) => renderItem(item),
        keyExtractor: (_) => _,
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
