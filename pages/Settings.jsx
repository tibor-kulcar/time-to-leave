import React, { useEffect, useState } from 'react';

import {
  Container,
  SearchBar,
  ItemText,
} from '../style';


const Settings = () => {
  const [isLoading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('Perunova');

  return (
    <Container>
      <SearchBar>
        <ItemText>Settings page...</ItemText>
      </SearchBar>
    </Container>
  )
}

export default Settings;


