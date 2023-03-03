import React from 'react';
import { withTheme, DefaultTheme } from 'styled-components/native';

import { SearchView } from './styles';
import { StopSearch } from '../StopSearch';
import { LoadingIndicator } from '../LoadingIndicator';

interface SearchBarProps {
  theme: DefaultTheme;
}

const SearchBar = ({ theme }: SearchBarProps) => {
  console.log('SearchBar component entry');
  return (
    <SearchView>
      <StopSearch />
      <LoadingIndicator />
    </SearchView>
  );
};

export default withTheme(SearchBar);
