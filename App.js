import React, {useEffect, useState, useRef} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "./pages/Home.jsx";

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Time To Leave" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

