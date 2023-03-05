import React from 'react';

import { SearchView } from './styles';
import { StopSearch } from '../StopSearch';
import { LoadingIndicator } from '../LoadingIndicator';

const SearchBar = () => {
  console.log('SearchBar component entry');
  return (
    <SearchView>
      <StopSearch />
      <LoadingIndicator />
    </SearchView>
  );
};

export default SearchBar;
