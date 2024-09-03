import {createSlice} from '@reduxjs/toolkit';

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
