import {configureStore} from '@reduxjs/toolkit';
import HistoryReducers from './HistoryReducers';

export default configureStore({
  reducer: {
    history: HistoryReducers,
  },
});
