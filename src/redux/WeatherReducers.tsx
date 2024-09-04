import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';
import Config from 'react-native-config';

interface WeatherData {
  main?: {temp: number};
  weather?: {description: string}[];
}

interface WeatherState {
  weather: WeatherData | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  weather: null,
  isLoading: false,
  error: null,
};

const API_KEY = Config.API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeather = (city: string) => async (dispatch: any) => {
  dispatch(fetchWeatherRequest());

  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    dispatch(fetchWeatherSuccess(response.data));
  } catch (error: any) {
    dispatch(fetchWeatherFailure(error.status));
  }
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    fetchWeatherRequest: state => {
      state.weather = null;
      state.isLoading = true;
      state.error = null;
    },
    fetchWeatherSuccess: (state, action: PayloadAction<WeatherData>) => {
      state.weather = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchWeatherFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    resetWeather: state => {
      console.log('reseting');
      state.weather = null;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  fetchWeatherRequest,
  fetchWeatherSuccess,
  fetchWeatherFailure,
  resetWeather,
} = weatherSlice.actions;

export default weatherSlice.reducer;
