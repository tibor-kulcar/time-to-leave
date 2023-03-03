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
  padding-top: ${Constants.statusBarHeight + 8 + 'px'};
`;

export const Scroll = styled.View`
  flex: 1;
  width: 100%;
  padding: 0 16px;
  padding-top: ${Constants.statusBarHeight/2 + 'px'};
  z-index: 1;
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
  color: ${(props) => props.theme.colors.text};c
`
