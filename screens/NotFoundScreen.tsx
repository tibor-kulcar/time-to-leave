import { TouchableOpacity } from 'react-native';

import { Container, Text } from '../components/Styled';
import { RootStackScreenProps } from '../types';

export default function NotFoundScreen({ navigation }: RootStackScreenProps<'NotFound'>) {
  return (
    <Container>
      <Text>This screen doesn't exist.</Text>
      <TouchableOpacity onPress={() => navigation.replace('Home')}>
        <Text>Go to home screen!</Text>
      </TouchableOpacity>
    </Container>
  );
}
