import React from 'react';
import { TextInputProps } from 'react-native';
import { InputContainer, Input, InputLabel, InputMessage } from './styles';

type StyledTextInputProps = TextInputProps & {
  label?: string;
  error?: string;
};

const TextInput = ({ label, error, ...rest }: StyledTextInputProps) => {
  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <Input {...rest} />
      <InputMessage>{error}</InputMessage>
    </InputContainer>
  );
};

export default TextInput;
