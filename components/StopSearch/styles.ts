import styled from 'styled-components/native';

export const ItemSeparator = styled.View`
  height: 1px;
  background-color: ${(props) => props.theme.colors.borderColor};
  opacity: 0.5;
`;
