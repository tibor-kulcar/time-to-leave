import styled from 'styled-components/native';
import { FlatList } from 'react-native';

import { ItemProps } from '../../types';

export const StopsList = styled(FlatList as new () => FlatList<ItemProps>)`
  position: relative;
  z-index: 100;
`;
