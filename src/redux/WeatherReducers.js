import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WeatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weather: {},
  },
  reducers: {
    setWeather(state, action) {
      state.weather = action.payload;
    },
  },
});
export const {setWeather} = WeatherSlice.actions;
