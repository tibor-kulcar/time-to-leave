import React, {useEffect, useState, useRef} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { getHeaderTitle } from '@react-navigation/elements';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Home from "./pages/Home.jsx";
import Settings from "./pages/Settings.jsx";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Time To Leave"
          component={Home}
          options={({ navigation }) => {
            const goToSettings = () => navigation.navigate("Settings");
            return {
              headerRight: () => (
                <TouchableOpacity onPress={goToSettings}>
                  <Ionicons name="cog-sharp" size={24} style={styles.icon} />
                </TouchableOpacity>
              )
            };
          }}
        />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 5,
  },
});
