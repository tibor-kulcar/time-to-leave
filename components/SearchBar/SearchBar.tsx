import React from 'react';

import { StopSearch } from '@/components/StopSearch';

const SearchBar = () => {
  return (
    <div
      className="
        flex flex-row justify-center items-center gap-4
        w-full
        z-10
      "
    >
      <StopSearch />
    </div>
  );
};

export default SearchBar;
