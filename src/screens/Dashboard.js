import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import axios from 'axios';

import {getBikes} from '../redux/actions';
import {useDispatch, useSelector} from 'react-redux';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [jwtToken, setJwtToken] = useState('');
  const {token} = useSelector(state => state.taskReducer);

  const getTokenFromRedux = () => {
    const reduxToken = token;
    console.log('Token from redux: - ', reduxToken);
  };

  const getToken = () => {
    AsyncStorage.getItem('Token')
      .then(token => {
        console.log('Token from Async is', JSON.parse(token));
        setJwtToken(JSON.parse(token).uToken);
        console.log(
          `token at dash ${
            JSON.parse(token).uToken
          } with type ${typeof JSON.parse(token).uToken}`,
        );
        return JSON.parse(token).uToken;
      })
      .catch(err => {
        console.log(`Error to get token:- ${err}`);
      });
  };

  useEffect(() => {
    getToken();
    // console.log(`Token in effect ${token}`);
    dispatch(
      getBikes(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1RW1haWwiOiJhbWFuQGdtYWlsLmNvbSIsInVJZCI6IjYzZmRhMzUwYmEzNDczMGM4ZmE0Nzk5ZiIsImlhdCI6MTY3NzkxMzYzNSwiZXhwIjoxNjc3OTE3MjM1fQ.2pY23yfQjseVZtYdwA6UsRqtDHb9RAyexgDcUtwZJNY',
      ),
    );
  }, []);

  return (
    <View style={styles.screen}>
      <Text>{jwtToken}</Text>
      <Button title="For Redux" onPress={getTokenFromRedux}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
