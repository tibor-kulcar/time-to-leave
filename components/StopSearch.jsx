import React, { useState } from 'react';
import { StyleSheet, Text, TextInput,TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import pidStops from '../external_data/pid-stops.json';

const StopSearch = ({setInput}) => {
  const stops = pidStops.map(stop => stop.stop_name);
  //console.log('props', props)
  const [text, setText] = useState('');
  
  const filterData = (text) => {
    if (text == '') return [''];
    const filteredStops = stops.filter(stop => stop.includes(text)); 
    
    if (text == filteredStops[0]) return[''];

    return filteredStops;
  };

  const data = filterData(text);
  return (
    
   // {text};
    <>
      <Autocomplete
        data={data}
        value={text}
        onChangeText={(txt) => {
          setText(txt)
          setInput(txt)

        
        console.log(txt)
      }}
        flatListProps={{
          keyExtractor: (_, idx) => idx,
          renderItem: ({ item }) => (
            <TouchableOpacity onPress={() => {
              setInput(item)
              setText(item)
            }}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Text></Text>
    </>
  )

};
const styles = StyleSheet.create({
  text: {
    color: "#fff",
    fontSize: "3rem", // Set the font size to 24
  },
  input: {
    height: 40,
    color: "#fff",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});


export default StopSearch;