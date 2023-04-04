import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import ToDoScreen from './screens/ToDoScreen';
import DoneScreen from './screens/DoneScreen';
import TabNavigator from './TabNavigator';
import TaskScreen from './screens/Task';
import CameraScreen from './screens/Camera';

function MyStackNavigator() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="TaskScreen" component={TaskScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      {/* <Stack.Screen name="ToDoScreen" component={ToDoScreen} /> */}
    </Stack.Navigator>
  );
}

export default MyStackNavigator;
