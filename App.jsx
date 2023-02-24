import React, {useEffect, useState, useRef} from 'react';
import { TouchableOpacity, useColorScheme } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeProvider } from "styled-components/native";

import { Icon } from './style';

import { darkTheme, lightTheme } from './theme.jsx';

import Home from "./pages/Home.jsx";
import Settings from "./pages/Settings.jsx";

const Stack = createStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "light" ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name={"Time To Leave"}
            component={Home}
            options={({ navigation }) => {
              const goToSettings = () => navigation.navigate("Settings");

              return {
                headerStyle: {
                  backgroundColor: theme['PRIMARY_COLOR'],
                },
                headerTintColor: theme['TEXT_COLOR'],
                headerShadowVisible: false,
                headerRight: () => (
                  <TouchableOpacity onPress={goToSettings}>
                    <Icon name="cog-sharp" size={24} />
                  </TouchableOpacity>
                )
              };
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={() => {
              return {
                headerStyle: {
                  backgroundColor: theme['PRIMARY_COLOR'],
                },
                headerShadowVisible: false,
                headerTintColor: theme['TEXT_COLOR'],
              };
            }}

          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

