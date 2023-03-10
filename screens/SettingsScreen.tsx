import { useState } from 'react';
import { usePersistantStore } from '../store';

import { Container, View, Scroll } from '../components/Styled';

import { TextInput } from '../components';

export default function SettingsScreen() {
  const { walkingTime, setWalkingTime } = usePersistantStore();
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState(walkingTime);

  function handleTextInputChange(val: string) {
    if (val === '') {
      setInputValue(val);
      setError(
        'Please provide a number. If left blank, the default value of 3 minutes will be used.'
      );
    } else if (/^\d+$/.test(val)) {
      setInputValue(val);
      setWalkingTime(val);
      setError('');
      console.log(val);
    } else {
      setInputValue(val);
      setError('Please enter a valid number.');
    }
  }
  return (
    <Container>
      <Scroll>
        <View>
          <TextInput
            label="Walking time to stop in minutes"
            keyboardType="number-pad"
            value={inputValue}
            onChangeText={handleTextInputChange}
            error={error}
          />
        </View>
      </Scroll>
    </Container>
  );
}
