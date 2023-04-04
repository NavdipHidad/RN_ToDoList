import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ToDoScreen from './screens/ToDoScreen';
import DoneScreen from './screens/DoneScreen';
import Icons from 'react-native-vector-icons/Ionicons';
import FbAPI from './screens/FbAPI';
import SignInStackNavigator from './SignInStackNavigator';
Icons.loadFont();

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        //tabBarLabel: 'Resto',
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          if (route.name === 'ToDoScreen') {
            iconName = focused ? 'ios-clipboard' : 'ios-clipboard-outline';
            size = focused ? 30 : 25;
          } else if (route.name === 'DoneScreen') {
            iconName = focused
              ? 'ios-checkmark-done-circle'
              : 'ios-checkmark-done-circle-outline';
            size = focused ? 30 : 25;
          }
          return <Icons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0080ff',
        tabBarInactiveTintColor: '#000000',
      })}>
      <Tab.Screen
        name="SignInStackNavigator"
        component={SignInStackNavigator}
        options={{title: 'SignIn', headerShown: false}}
      />
      <Tab.Screen name="FbAPI" component={FbAPI} />
      <Tab.Screen name="ToDoScreen" component={ToDoScreen} />
      <Tab.Screen name="DoneScreen" component={DoneScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
