import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from "styled-components/native";
// Android Fix 
import 'intl';
import 'intl/locale-data/jsonp/en';
// Android Fix 

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { darkTheme } from './theme/darkTheme';
import { lightTheme } from './theme/lightTheme';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </ThemeProvider>
    );
  }
}
