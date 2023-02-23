import React, { useEffect, useState } from 'react';

import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Settings = () => {
  const [isLoading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState('Perunova');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.search}>
        <Text style={styles.textTime}>Settings page...</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: StatusBar.currentHeight,
    // backgroundColor: "#111",
  },
  scroll: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    zIndex: 1,
  },
  search: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    width: "100%",
    padding: 5,
    zIndex: 10,
  },
  list: {
    // borderColor: "#111",
    zIndex: 100,
    position: "relative",
  },
  item: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    paddingHorizontal: 25,
    // borderColor: "#111"
  },
  textName: {
    // color: "#777777",
    fontSize: 48,
  },
  textNameFaded: {
    opacity: 0.3
  },
  textTime: {
    // color: "#fff",
    fontSize: 48,
  },
});

export default Settings;


