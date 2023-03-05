import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchDepartures } from '../../fetchers/pid';
import { ActivityIndicator } from './styles';

function LoadingIndicator() {
  const { isFetching } = useQuery(['departures'], fetchDepartures, {
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });

  return isFetching ? <ActivityIndicator /> : <></>;
}

export default LoadingIndicator;
