import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import renderer from 'react-test-renderer';

import TextInput from '../TextInput/TextInput';
import { darkTheme } from '../../theme/darkTheme';

describe('TextInput', () => {
  test('renders correctly', () => {
    const tree = renderer.create(
      <ThemeProvider theme={darkTheme}>
        <TextInput />
      </ThemeProvider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
