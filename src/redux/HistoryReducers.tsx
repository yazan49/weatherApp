import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface City {
  name: string;
}

interface HistoryState {
  history: City[];
}

const initialState: HistoryState = {
  history: [],
};

export const HistorySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    setHistory: (state, action: PayloadAction<City[]>) => {
      state.history = Array.isArray(action.payload) ? action.payload : [];
    },
    addToHistory: (state, action: PayloadAction<City>) => {
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
    removeFromHistory: (state, action: PayloadAction<City>) => {
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

export const loadHistory = () => async (dispatch: any) => {
  try {
    const history = await AsyncStorage.getItem('history');
    if (history) {
      const parsedHistory = JSON.parse(history) as City[];
      dispatch(setHistory(Array.isArray(parsedHistory) ? parsedHistory : []));
    }
  } catch (error) {
    console.log('Error loading history from storage:', error);
  }
};

export const addToHistoryAndSave = (city: City) => async (dispatch: any) => {
  dispatch(addToHistory(city));
  try {
    const history = await AsyncStorage.getItem('history');
    const currentHistory = history ? (JSON.parse(history) as City[]) : [];
    const cityNames = new Set(currentHistory.map(item => item.name));
    if (!cityNames.has(city.name)) {
      const updatedHistory = [...currentHistory, city];
      await AsyncStorage.setItem('history', JSON.stringify(updatedHistory));
    }
  } catch (error) {
    console.error('Error saving city to storage:', error);
  }
};

export const removeFromHistoryAndSave =
  (city: City) => async (dispatch: any) => {
    dispatch(removeFromHistory(city));
    try {
      const history = await AsyncStorage.getItem('history');
      if (history) {
        const currentHistory = JSON.parse(history) as City[];
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
