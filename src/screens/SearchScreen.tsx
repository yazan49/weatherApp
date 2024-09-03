import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {primaryColor, secondaryColor} from '../constants/costants';
import {WeatherData} from '../types/WeatherTypes';
import {fetchCurrentWeather} from '../services/weatherService';
import SearchedCard from '../components/SearchedCard';
import {useDispatch} from 'react-redux';
import {addToHistoryAndSave} from '../redux/HistoryReducers';
import {useDebounce} from 'use-debounce';
import {setWeather} from '../redux/WeatherReducers';

export default function SearchScreen({navigation}: any) {
  const dispatch: any = useDispatch();
  const [data, setData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>('');
  const [value] = useDebounce(city, 1000);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDetails = () => {
    navigation.navigate('Details', {data: data});
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchCurrentWeather(city, 'weather');
      setData(res);
      setIsLoading(false);
      dispatch(addToHistoryAndSave(res));
      //   dispatch(setWeather(res))
    } catch (error) {
      console.log('err', error);
      Alert.alert('Make Sure You Entered A Correct Name');
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   AsyncStorage.clear();
  // }, []);

  useEffect(() => {
    if (value) {
      getData();
    }
  }, [value]);

  return (
    <View style={styles.main}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        placeholderTextColor={secondaryColor}
        value={city}
        onChangeText={text => setCity(text)}
      />
      {isLoading && <ActivityIndicator size={30} />}
      {data && <SearchedCard data={data} onPress={handleDetails} />}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: primaryColor,
    alignItems: 'center',
    padding: 16,
  },
  content: {
    padding: 10,
    backgroundColor: secondaryColor,
    marginBottom: 20,
    borderRadius: 10,
    width: '100%',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  tempText: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  windText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  humidityText: {
    fontSize: 16,
    color: 'white',
  },
  noDataText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    marginVertical: 10,
  },
});
