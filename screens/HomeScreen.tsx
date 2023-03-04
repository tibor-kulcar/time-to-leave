import React, { memo } from 'react';
import { Container } from '../components/Styled';
import { SearchBar, DepartureBoard } from '../components';

function HomeScreen() {
  console.log('HomeScreen rendered');

  return (
    <Container>
      <SearchBar />
      <DepartureBoard />
    </Container>
  );
}

export default memo(HomeScreen);
