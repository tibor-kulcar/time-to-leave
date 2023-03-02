
import React, { useEffect } from 'react';
import { withTheme, DefaultTheme } from 'styled-components/native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { SearchView } from './styles';
import { Icon} from '../Styled';
import { StopSearch } from '../StopSearch/'

import { useDeparturesStore } from '../../store';

interface SearchBarProps {
  theme: DefaultTheme;
}

interface LoadingIndicatorProps {
  theme: DefaultTheme;
}

function LoadingIndicator ({ theme }: LoadingIndicatorProps) {
  const {
     isLoading,
    fetchDepartures,
  } = useDeparturesStore();

  return (
    isLoading
      ? <ActivityIndicator color={theme.colors.text} />
      : (
        <TouchableOpacity
          onPress={() => fetchDepartures()}
        >
          <Icon name="reload" size={20} />
        </TouchableOpacity>
      )
  )
}

const SearchBar = ({ theme }: SearchBarProps) => {
  console.log('SearchBar component entry')
  return (
    <SearchView>
      <StopSearch />
      <LoadingIndicator theme={theme} />
    </SearchView>
  )
};

export default withTheme(SearchBar);
