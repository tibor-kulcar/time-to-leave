
import React from 'react';
import { withTheme, DefaultTheme } from 'styled-components/native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { SearchView } from './styles';
import { Icon} from '../Styled';
import { StopSearch } from '../StopSearch/'

import { useDeparturesStore } from '../../store';

interface SearchBarProps {
  theme: DefaultTheme;
}

const SearchBar = ({ theme }: SearchBarProps) => {
  const {
    isLoading,
    fetchDepartures,
   } = useDeparturesStore();

  return (
    <SearchView>
      <StopSearch />

      {isLoading
        ? <ActivityIndicator color={theme.colors.text} />
        : (
          <TouchableOpacity
            onPress={() => fetchDepartures()}
          >
            <Icon name="reload" size={20} />
          </TouchableOpacity>
        )
      }
    </SearchView>
  )
};

export default withTheme(SearchBar);
