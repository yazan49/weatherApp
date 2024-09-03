import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AppStack from './src/navigation/AppStack';
import {Provider} from 'react-redux';
import store from './src/redux/Store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
}
