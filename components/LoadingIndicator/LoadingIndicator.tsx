import React from 'react';
import { withTheme, DefaultTheme } from 'styled-components/native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import { Icon } from '../Styled';

import { useDeparturesStore } from '../../store';

type LoadingIndicatorProps = {
  theme: DefaultTheme;
};

function LoadingIndicator({ theme }: LoadingIndicatorProps) {
  const { isLoading, fetchDepartures } = useDeparturesStore();

  return isLoading ? (
    <ActivityIndicator color={theme.colors.text} />
  ) : (
    <TouchableOpacity onPress={() => fetchDepartures()}>
      <Icon name="reload" size={20} />
    </TouchableOpacity>
  );
}

export default withTheme(LoadingIndicator);
