import { Ionicons } from "@expo/vector-icons";
import styled from 'styled-components/native';
import Constants from 'expo-constants';

export const Text = styled.Text`
  color: ${(props) => props.theme && props.theme.colors.text};
`;

export const View = styled.View`
  background-color: ${(props) => props.theme.colors.background};
`;

export const Container = styled.SafeAreaView`
  background-color: ${(props) => props.theme.colors.background};
  flex: 1;
  // align-items: center;
  // justify-content: center;
  padding-top: ${Constants.statusBarHeight + 10 + 'px'};
`;

export const SearchBar = styled.View`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 16px 5px 5px;
  z-index: 10;
  gap: 16px;
`;

export const Scroll = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 15px;
  padding-top: ${Constants.statusBarHeight/2 + 'px'};
  z-index: 1;
`;

export const StopsList = styled.FlatList`
  position: relative;
  z-index: 100;
`;

interface ItemProps {
  faded?: boolean;
}
export const Item = styled.View<ItemProps>`
  flex-direction: row;
  justify-Content: space-between;
  gap: 5px;
  opacity: ${({ faded }) => (faded ? .3 : 1)};
`;

export const ItemText = styled.Text`
  font-size: 40px;
  color: ${(props) => props.theme.colors.text};
`

export const Icon = styled(Ionicons)`
  margin-right: 5px;
  color: ${(props) => props.theme.colors.text};
`
