import React from 'react';
import { StyleSheet, Text } from 'react-native';

const twoDigits = new Intl.NumberFormat("en-US", {
  style: "decimal",
  minimumIntegerDigits: 2,
});

const getTimeDiff = (diff) => {
  const sec = (diff / 1000);
  const min = Math.floor(sec / 60);
  const diffSecs = Math.floor(sec - (min * 60));

  return twoDigits.format(min) + ":" + twoDigits.format(diffSecs);
}

const EstimatedTimeArrival = ({diff}) => {
  return (
    <Text style={styles.textTime}>
      {diff && (
        getTimeDiff(diff)
      )}
    </Text>
  );
};

const styles = StyleSheet.create({
  textTime: {
    // color: "#fff",
    fontSize: 48,
  }
});

export default EstimatedTimeArrival;