import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {Store} from './src/redux/store';

import MyStackNavigator from './src/StackNavigator';
import TabNavigator from './src/TabNavigator';
import SplashScreen from './src/screens/SplashScreen';

const App = () => {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <MyStackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
