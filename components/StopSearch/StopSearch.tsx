import React, { useState } from 'react';
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from 'react-native-autocomplete-dropdown';
import { withTheme, DefaultTheme } from 'styled-components/native';

import { Icon } from '../Styled';
import { ItemSeparator } from './styles';

import { usePersistantStore } from '../../store';
import stops from '../../external_data/pid-stops.json';

const normalize = (str: string) => {
  const lwrcs = str ? str.toLowerCase() : '';
  return lwrcs.normalize('NFD').replace(/\p{Diacritic}/gu, '');
};

interface StopSearchProps {
  theme: DefaultTheme;
}

const StopSearch = ({ theme }: StopSearchProps) => {
  const { searchString, setSearchString } = usePersistantStore();
  const [suggestionsList, setSuggestionsList] = useState(stops);

  const handleOnSelect = (item: TAutocompleteDropdownItem) => {
    if (item) setSearchString(item);
  };

  const getSuggestions = async (q: string) => {
    const filteredStops = stops
      .filter((item) => normalize(item.title).includes(normalize(q)))
      .map((item) => ({
        id: item.id,
        title: item.title,
      }))
      .slice(0, 30);

    setSuggestionsList(filteredStops);
  };

  return (
    <>
      <AutocompleteDropdown
        dataSet={suggestionsList}
        initialValue={searchString}
        onSelectItem={handleOnSelect}
        direction="down"
        clearOnFocus={true}
        closeOnBlur={false}
        closeOnSubmit={false}
        useFilter={false}
        onChangeText={getSuggestions}
        debounce={250}
        showChevron={false}
        textInputProps={{
          placeholder: searchString.title || undefined,
          placeholderTextColor: theme.colors.secondary,
          autoCorrect: false,
          autoCapitalize: 'none',
          style: {
            borderRadius: 2,
            backgroundColor: theme.colors.background,
            color: theme.colors.text,
            paddingLeft: 8,
            borderBottomWidth: 1,
            borderBottomColor: theme.colors.borderColor,
            fontSize: 28,
          },
        }}
        inputContainerStyle={{ backgroundColor: 'transparent' }}
        ClearIconComponent={<Icon name="close" size={24} />}
        containerStyle={{
          flex: 1,
          width: '100%',
        }}
        suggestionsListContainerStyle={{
          backgroundColor: theme.colors.backgroundSecondary,
          borderColor: theme.colors.borderColor,
        }}
        suggestionsListTextStyle={{ color: theme.colors.text }}
        suggestionsListMaxHeight={600}
        ItemSeparatorComponent={<ItemSeparator />}
      />
    </>
  );
};

export default withTheme(StopSearch);
