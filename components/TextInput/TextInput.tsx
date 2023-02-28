import React from 'react';
import { TextInputProps } from 'react-native'
import {
  InputContainer,
  Input,
  InputLabel,
  InputMessage
} from './styles';

import { View } from '../Styled'

interface StyledTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const TextInput = ({ label, error, ...rest }: StyledTextInputProps) => {
  return (
    <InputContainer>
      <InputLabel>{ label }</InputLabel>
      <Input {...rest} />
      <View>
        {error && <InputMessage>{ error }</InputMessage>}
      </View>
    </InputContainer>
  );
};

export default (TextInput);
