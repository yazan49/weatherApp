import {configureStore} from '@reduxjs/toolkit';
import HistoryReducers from './HistoryReducers';
import WeatherReducers from './WeatherReducers';

export default configureStore({
  reducer: {
    history: HistoryReducers,
    weather: WeatherReducers,
  },
});
