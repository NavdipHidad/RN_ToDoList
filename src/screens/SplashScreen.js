import React, {useEffect} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setToken} from '../redux/actions';

import {getUserName, user_login} from '../api/user_api';
import ApiManager from '../api/Api_manager';

const SplashScreen = ({navigation}) => {
  const {token} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      handleGetToken();
    }, 3000);
  });

  const handleGetToken = async () => {
    const dataTokenAsync = await AsyncStorage.getItem('Token');
    const dataToken = JSON.parse(dataTokenAsync);
    const allKeys = await AsyncStorage.getAllKeys();
    console.log('All keys: ', allKeys);
    if (allKeys.length === 0) {
      console.log('All keys in condition: ', allKeys);
      navigation.replace('TabNavigator');
    }
    // const dataToken = {
    //   uToken:
    //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1RW1haWwiOiJhbWFuQGdtYWlsLmNvbSIsInVJZCI6IjYzZmRhMzUwYmEzNDczMGM4ZmE0Nzk5ZiIsImlhdCI6MTY3NzkwODIyNiwiZXhwIjoxNjc3OTExODI2fQ.9KDC9qxDwkt4QIQll3fR4Zw7j9JxnTxVQRUOVV1FypQ',
    // };
    console.log('dataToken at splash', dataToken);
    dispatch(setToken(dataToken.uToken));
    let tokenResponseStatus = 90;
    const tokenChecker = getUserName(dataToken)
      .then(response => {
        console.log('API at splash to verify token', response);
        // navigation.replace('TaskScreen');
        tokenResponseStatus = response.status;
        console.log('tokenResponseStatus ', tokenResponseStatus);
        if (tokenResponseStatus == 200) {
          navigation.replace('TaskScreen');
        } else {
          navigation.replace('TabNavigator');
        }
      })
      .catch(err => {
        console.log('Error at splash to verify token', err);
      });
    // if (tokenResponseStatus == 200) {
    //   navigation.replace('TaskScreen');

    // console.log('dataToken at splash', dataToken);
    // console.log('-> ', dataToken['uToken']);
    // try {
    //   const response = await axios.get(
    //     'http://localhost:8000/user/getUserName',
    //     {
    //       headers: {
    //         authorization: dataToken.uToken,
    //       },
    //     },
    //   );
    //   console.log('Name at splash', response);
    // } catch (error) {
    //   console.log('Error of axios on splash', error);
    // }

    // navigation.replace('TaskScreen');
    // } else {
    //   navigation.replace('TabNavigator');
    // }
  };

  return (
    <View style={styles.screen}>
      <Image
        style={styles.logo}
        source={require('../../assets/checklist.png')}
      />
      {/* <Image style={styles.logo} source={require('./assets/checklist.png')} /> */}
      <Text style={styles.screenTxt}>Will build full App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0080ff',
  },
  logo: {
    height: 150,
    width: 150,
    margin: 10,
  },
  screenTxt: {
    color: '#ffffff',
    fontSize: 27,
  },
});

export default SplashScreen;
