import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {secondaryColor} from '../constants/costants';

export default function SearchedCard({data, onPress}: any) {
  return (
    <View style={styles.main}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.description}>
          Description: {data.weather[0].description}
        </Text>
        <Text style={styles.temp}>Temp : {data.main.temp} °C</Text>
        <Text style={styles.wind}>Wind Speed: {data.wind.speed} </Text>
        <Text style={styles.wind}>Humidity: {data.main.humidity} </Text>
      </TouchableWithoutFeedback>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    padding: 20,
    width: '100%',
    backgroundColor: secondaryColor,
    borderRadius: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: 'white',
  },
  temp: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  wind: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  description: {
    marginVertical: 5,
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});
