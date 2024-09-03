import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Alert,
  View,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import SearchedCard from '../components/SearchedCard';
import {primaryColor, secondaryColor} from '../constants/costants';
import {fetchCurrentWeather} from '../services/weatherService';
import DayCards from '../components/DayCards';
import WeatherChart from '../components/WeatherChart';

export default function DetailsScreen({route}: any) {
  const data = route.params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [weatherData, setWeatherData] = useState<any[]>([]);
  const [todayWeather, setTodayWeather] = useState<any>();

  const city = data.data.name;

  const getData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchCurrentWeather(city, 'forecast');
      setWeatherData(res.list);
      setIsLoading(false);
    } catch (error) {
      console.log('err', error);
      Alert.alert('Make Sure You Entered A Correct Name');
      setIsLoading(false);
    }
  };

  const getToday = async () => {
    try {
      setIsLoading(true);
      const res = await fetchCurrentWeather(city, 'weather');
      setTodayWeather(res);
      setIsLoading(false);
    } catch (error) {
      console.log('err', error);
      Alert.alert('Make Sure You Entered A Correct Name');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (city) {
      getData();
      getToday();
    }
  }, [city]);

  const extractDate = (dateTime: string) => {
    return dateTime.split(' ')[0];
  };

  const getDaysWeather = (data: any[]) => {
    const seen = new Set();
    return data.filter(item => {
      const date = extractDate(item.dt_txt);
      const isDuplicate = seen.has(date);
      seen.add(date);
      return !isDuplicate;
    });
  };

  const uniqueChartData = getDaysWeather(weatherData);

  return (
    <ScrollView style={styles.main}>
      {todayWeather && <SearchedCard data={todayWeather} />}

      {uniqueChartData.length > 0 && (
        <WeatherChart uniqueChartData={uniqueChartData} />
      )}

      {uniqueChartData.length > 0 && (
        <View>
          {uniqueChartData.slice(0, 5).map((item, index) => (
            <DayCards key={item.dt_txt} data={item} index={index} />
          ))}
        </View>
      )}

      {isLoading && (
        <ActivityIndicator
          style={styles.loader}
          size={30}
          color={secondaryColor}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: primaryColor,
    padding: 16,
  },
  loader: {
    marginTop: 20,
    alignSelf: 'center',
  },
});
