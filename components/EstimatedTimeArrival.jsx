import React from 'react';
import { StyleSheet, Text } from 'react-native';

const twoDigits = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumIntegerDigits: 2,
});

const getTimeDiff = (timeString) => {
  if (!timeString) return '??:??';

  const now = new Date();
  const given = new Date(timeString);

  const diff = given - now;
  const sec = (diff / 1000);
  const min = Math.floor(sec / 60);
  const diffSecs = Math.floor(sec - (min * 60));

  return twoDigits.format(min) + ":" + twoDigits.format(diffSecs);
}

const EstimatedTimeArrival = ({time}) => {
  return (
    <Text style={styles.textTime}>
      {time && (
        getTimeDiff(time?.arrival_timestamp.predicted)
      )}
    </Text>
  );
};

const styles = StyleSheet.create({
  textTime: {
    // color: "#fff",
    fontSize: 48, // Set the font size to 24
  }
});

export default EstimatedTimeArrival;