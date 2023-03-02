import { useEffect } from 'react';

import { Container } from '../components/Styled';
import { SearchBar, DepartureBoard } from '../components'

import { RootStackScreenProps } from '../types';
import { useDeparturesStore } from '../store';

export default function HomeScreen({ navigation }: RootStackScreenProps<'Root'>) {
  const {
    isLoading,
    searchString,
    fetchDepartures,
  } = useDeparturesStore();

  useEffect(() => {
    if (searchString && !isLoading) fetchDepartures();
  }, [searchString]);

  return (
    <Container>
      <SearchBar />
      <DepartureBoard />
    </Container >
  );
}
