import styled from 'styled-components/native';

export const Input = styled.TextInput`
  backgroundColor: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  padding: 5px 10px;
  font-size: 20px;
`

export const InputContainer = styled.View`
  // background-color: ${(props) => props.theme.colors.background};
`;

export const InputLabel = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 12px;
  margin-bottom: 5px;
  text-transform: uppercase;
`
export const InputMessage = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 12px;
  margin-top: 5px;
`