import { TouchableOpacity } from 'react-native';

import { Container, Text } from '../components/Styled';
import { RootStackScreenProps } from '../types';

export default function SettingsScreen({ navigation }: RootStackScreenProps<'Settings'>) {
  return (
    <Container>
      <Text>Settings</Text>
      <TouchableOpacity onPress={() => navigation.replace('Home')}>
        <Text>Go to home screen!</Text>
      </TouchableOpacity>
    </Container >
  );
}
