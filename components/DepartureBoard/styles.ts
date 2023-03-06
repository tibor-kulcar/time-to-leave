import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { DepartureProps } from '../../types';

export const StopsList = styled(FlatList as new () => FlatList<DepartureProps>)`
  position: relative;
  z-index: 100;
`;

export const StopsListHeader = styled.View`
  display: block;
  padding: 4px 0;
  margin-top: 8px;
  border-bottom-color: ${(props) => props.theme.colors.borderColor};
  border-bottom-width: 0.5px;
`;

export const StopsListHeaderText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.colors.secondary};
`;
