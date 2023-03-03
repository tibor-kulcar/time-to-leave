import React, { useState, memo, useCallback, useMemo, useEffect } from 'react';
import { StyleSheet, ListRenderItemInfo, ListRenderItem } from 'react-native';

import { AutocompleteDropdown, TAutocompleteDropdownItem } from 'react-native-autocomplete-dropdown';
import { withTheme, DefaultTheme } from 'styled-components/native';

import { SearchItem, SearchItemText } from './styles';
import { usePersistantStore } from '../../store';
import stops from '../../external_data/pid-stops-index.json';

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
  // const [text, setText] = useState(searchString);
  const [text, setText] = useState(searchString);
  const [data, setData] = useState([{id:'', title:''}]);
  const [selectedItem, setSelectedItem] = useState();
  const [suggestionsList, setSuggestionsList] = useState();


  const handleOnSelect = (item:TAutocompleteDropdownItem) => {
    console.log(item);
    if (item) {
      setSearchString(item)
    }
  }

  const getData = ({ text }:{ text:string }) => {
    if (text == '') return [''];

    const filteredStops = stops
      .filter(stop => normalize({ str: stop.title })
      .includes(normalize({ str: text })));
    // if (text == filteredStops[0]) return[''];
    setData(filteredStops);
    console.log(data);
  };

  return (
    <>
    <SearchItemText>
      {JSON.stringify(selectedItem)}
    </SearchItemText>
    <AutocompleteDropdown
      clearOnFocus={false}
      closeOnBlur={false}
      closeOnSubmit={false}
      // controller={controller => {
      //   console.log(controller)
      //   dropdownController.current = controller
      // }}
      onChangeText={(txt: string) => getData({text: txt})}
      onSubmit={(evt) => setSearchString(evt)}
      // debounce={250}
      // initialValue={searchString} // or just '2'
      onSelectItem={handleOnSelect}
      dataSet={data}
      containerStyle={styles.container}
    />
    </>
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
