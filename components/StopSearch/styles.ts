import styled from 'styled-components/native';

export const SearchItem = styled.TouchableOpacity`
  padding: 10px 8px;
  backgroundColor: ${(props) => props.theme.colors.secondary};
  borderColor: ${(props) => props.theme.colors.secondary};
`
export const SearchItemText = styled.Text`
  font-size: 18px;
  color: ${(props) => props.theme.colors.text};
`
