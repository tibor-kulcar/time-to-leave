import React from 'react';
import { withTheme, DefaultTheme } from 'styled-components/native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';

import { fetchDepartures } from '../../fetchers/pid';
import { Icon } from '../Styled';

type LoadingIndicatorProps = {
  theme: DefaultTheme;
};

function LoadingIndicator({ theme }: LoadingIndicatorProps) {
  const { isLoading, refetch } = useQuery(['departures'], fetchDepartures, {
    refetchInterval: 10000,
    refetchOnWindowFocus: true,
  });

  return isLoading ? (
    <ActivityIndicator color={theme.colors.text} />
  ) : (
    <TouchableOpacity onPress={() => refetch()}>
      <Icon name="reload" size={20} />
    </TouchableOpacity>
  );
}

export default withTheme(LoadingIndicator);
