import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

export const HistorySlice = createSlice({
  name: 'history',
  initialState: {
    history: [],
  },
  reducers: {
    setHistory: (state, action) => {
      state.history = Array.isArray(action.payload) ? action.payload : [];
    },
    addToHistory: (state, action) => {
      const newCity = action.payload;
      if (!newCity || !newCity.name) {
        return;
      }

      const itemInHistory = state.history.find(
        item => item.name === newCity.name,
      );
      if (!itemInHistory) {
        state.history.push(newCity);
      }
    },
    removeFromHistory: (state, action) => {
      const city = action.payload;
      if (!city || !city.name) {
        return;
      }
      state.history = state.history.filter(item => item.name !== city.name);
    },
  },
});

export const {addToHistory, removeFromHistory, setHistory} =
  HistorySlice.actions;

export const loadHistory = () => async dispatch => {
  try {
    const history = await AsyncStorage.getItem('history');
    if (history) {
      const parsedHistory = JSON.parse(history);
      dispatch(setHistory(Array.isArray(parsedHistory) ? parsedHistory : []));
    }
  } catch (error) {
    console.log('Error loading history from storage:', error);
  }
};

export const addToHistoryAndSave = city => async dispatch => {
  dispatch(addToHistory(city));
  try {
    const history = await AsyncStorage.getItem('history');
    const currentHistory = history ? JSON.parse(history) : [];
    const cityNames = new Set(currentHistory.map(item => item.name));
    if (!cityNames.has(city.name)) {
      const updatedHistory = [...currentHistory, city];
      await AsyncStorage.setItem('history', JSON.stringify(updatedHistory));
    }
  } catch (error) {
    console.error('Error saving city to storage:', error);
  }
};

export const removeFromHistoryAndSave = city => async dispatch => {
  dispatch(removeFromHistory(city));
  try {
    const history = await AsyncStorage.getItem('history');
    if (history) {
      const currentHistory = JSON.parse(history);
      const updatedHistory = currentHistory.filter(
        item => item.name !== city.name,
      );
      await AsyncStorage.setItem('history', JSON.stringify(updatedHistory));
    } else {
      console.log('No history found in AsyncStorage');
    }
  } catch (error) {
    console.error('Error removing city from storage:', error);
  }
};

export default HistorySlice.reducer;
