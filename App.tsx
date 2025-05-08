// App.js
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import store from './src/redux/store';
import MyStack from './src/routes/Stack';
import { ThemeProvider } from './src/context/ThemeProvider';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
}
