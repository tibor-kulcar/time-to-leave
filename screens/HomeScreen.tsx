import React, { memo } from 'react';
import { Container } from '../components/Styled';
import { SearchBar, DepartureBoard } from '../components';

import { useQuery } from '@tanstack/react-query';
// import { fetchTrip } from '../fetchers/gtfs';

function HomeScreen() {
  console.log('HomeScreen rendered');
  // const { isLoading, data, refetch } = useQuery(['trip'], fetchTrip, {
  //   // refetchInterval: 10000,
  //   // refetchOnWindowFocus: true,
  // });
  // if (data) {
  //   // const { stop_times } = data?.data;
  //   // const stop = stop_times
  //   //   .filter((item) => item.stop.properties.stop_id.includes('U476Z1P'))
  //   //   .map((item) => ({ item }));

  //   console.log(data);
  // }

  // console.log(isLoading, data?.data);

  // const;

  return (
    <Container>
      <SearchBar />
      <DepartureBoard />
    </Container>
  );
}

export default memo(HomeScreen);
