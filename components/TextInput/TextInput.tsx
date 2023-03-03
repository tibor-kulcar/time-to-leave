import React from 'react';
import { TextInputProps, Text } from 'react-native';
import { InputContainer, Input, InputLabel, InputMessage } from './styles';

interface StyledTextInputProps extends TextInputProps {
  label?: string;
  error?: string;
}

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
