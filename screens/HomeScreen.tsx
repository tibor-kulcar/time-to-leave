import React, { memo } from 'react';
import { Container } from '../components/Styled';
import { SearchBar, DepartureBoard } from '../components';

import { RootStackScreenProps } from '../types';

function HomeScreen({ navigation }: RootStackScreenProps<'Root'>) {
  console.log('HomeScreen rendered');

  return (
    <Container>
      <SearchBar />
      <DepartureBoard />
    </Container>
  );
}

export default memo(HomeScreen);
