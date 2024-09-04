import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {screenHeight, secondaryColor} from '../constants/costants';

export default function DayCards({data}: any) {
  const getDayName = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    const options: Intl.DateTimeFormatOptions = {weekday: 'long'};
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.day}>{getDayName(data.dt).split(',')[0]}</Text>
      <View style={styles.temp}>
        <Text style={styles.text}>Min : {data?.main?.temp_min}°C</Text>
        <Text style={styles.text}>Max : {data?.main?.temp_max}°C</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: screenHeight * 0.01,
    backgroundColor: secondaryColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  day: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    color: 'white',
  },
  temp: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
});
