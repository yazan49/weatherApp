import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import SearchedCard from '../components/SearchedCard';
import {
  backgroundColor,
  screenHeight,
  screenWidth,
} from '../constants/costants';
import DayCards from '../components/DayCards';
import WeatherChart from '../components/WeatherChart';
import LoadingIndicator from '../components/LoadingIndicatior';
import {useSelector} from 'react-redux';
import useFetchWeatherData from '../services/useFetchWeatherData';

export default function DetailsScreen({route}: any) {
  const weatherState = useSelector((state: any) => state.weather);
  const {weather} = weatherState;
  const city = weather ? weather.name : route.params.city;
  const {todayWeather, forecastData, isLoading, error} =
    useFetchWeatherData(city);

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

  const uniqueChartData = forecastData ? getDaysWeather(forecastData) : [];

  return (
    <View style={styles.main}>
      <ScrollView>
        {todayWeather && <SearchedCard data={todayWeather} />}
        {uniqueChartData.length > 0 && (
          <WeatherChart uniqueChartData={uniqueChartData} />
        )}
        {uniqueChartData.length > 0 && (
          <View style={styles.days}>
            {uniqueChartData.slice(0, 5).map((item, index) => (
              <DayCards key={item.dt_txt} data={item} index={index} />
            ))}
          </View>
        )}
        {isLoading && <LoadingIndicator />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: backgroundColor,
    padding: screenWidth * 0.03,
  },
  days: {
    marginBottom: screenHeight * 0.05,
  },
});
