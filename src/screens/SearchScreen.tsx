import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {backgroundColor, secondaryColor} from '../constants/costants';
import SearchedCard from '../components/SearchedCard';
import {useDispatch, useSelector} from 'react-redux';
import {addToHistoryAndSave} from '../redux/HistoryReducers';
import {useDebounce} from 'use-debounce';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicatior';
import CustomAlert from '../components/CustomAlert';
import {fetchWeather} from '../redux/WeatherReducers';

export default function SearchScreen() {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const [city, setCity] = useState<string>('');
  const [value] = useDebounce(city, 1000);
  const weatherState = useSelector((state: any) => state.weather);
  const {weather, isLoading, error} = weatherState;
  const [alettVisible, setAlertVisible] = useState({
    status: false,
    message: '',
    type: '',
  });

  const handleDetails = () => {
    navigation.navigate('Details');
  };

  useEffect(() => {
    if (value) {
      dispatch(fetchWeather(value));
    }
  }, [value]);

  useEffect(() => {
    if (error) {
      if (error === 404) {
        setAlertVisible({
          status: true,
          message: 'Make sure you entered a correct name',
          type: 'error',
        });
      } else {
        setAlertVisible({
          status: true,
          message: 'Something went wrong, please try again',
          type: 'error',
        });
      }
    }
  }, [error]);

  useEffect(() => {
    if (!error && weather && value) {
      dispatch(addToHistoryAndSave({name: value}));
    }
  }, [weather, error]);

  useFocusEffect(
    useCallback(() => {
      setAlertVisible({
        status: false,
        message: '',
        type: '',
      });
    }, []),
  );

  return (
    <View style={styles.main}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        placeholder="Enter city name"
        placeholderTextColor={'black'}
        value={city}
        onChangeText={text => setCity(text)}
      />
      {isLoading && <LoadingIndicator />}
      {weather && <SearchedCard data={weather} onPress={handleDetails} />}
      <CustomAlert
        title={alettVisible.message}
        isVisible={alettVisible.status}
        onHide={() => setAlertVisible({status: false, message: '', type: ''})}
        type={alettVisible.type}
        subType="main"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: backgroundColor,
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
