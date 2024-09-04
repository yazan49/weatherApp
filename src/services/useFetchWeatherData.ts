import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import Config from 'react-native-config';
import {WeatherData, TodayWeather} from '../types/WeatherTypes';

const API_KEY = Config.API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface FetchWeatherDataResult {
  todayWeather: TodayWeather | null;
  forecastData: WeatherData[] | null;
  isLoading: boolean;
  error: string | null;
}

const useFetchWeatherData = (city: string): FetchWeatherDataResult => {
  const [todayWeather, setTodayWeather] = useState<TodayWeather | null>(null);
  const [forecastData, setForecastData] = useState<WeatherData[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [todayRes, forecastRes] = await Promise.all([
        axios.get(`${BASE_URL}/weather`, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
          },
        }),
        axios.get(`${BASE_URL}/forecast`, {
          params: {
            q: city,
            appid: API_KEY,
            units: 'metric',
          },
        }),
      ]);

      setTodayWeather(todayRes.data);
      setForecastData(forecastRes.data.list);
    } catch (err: any) {
      setError(
        err.response?.status ? err.response.status.toString() : 'Unknown error',
      );
    } finally {
      setIsLoading(false);
    }
  }, [city]);

  useEffect(() => {
    if (city) {
      fetchData();
    }
  }, [city, fetchData]);

  return {todayWeather, forecastData, isLoading, error};
};

export default useFetchWeatherData;
