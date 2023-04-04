import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';

import {setToken} from '../redux/actions';
import {user_login} from '../api/user_api';

const SignIn = ({navigation}) => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');

  const {token} = useSelector(state => state.taskReducer);
  const dispatch = useDispatch();

  const inputTxtFunc = async () => {
    try {
      user_login({uEmail: emailId, uPassword: password}).then(response => {
        console.log('Log for user_api', response);
        AsyncStorage.setItem(
          'Token',
          JSON.stringify({uToken: response.data.token}),
        )
          .then(() => {
            console.log('AsyncStorage Token is set', response.data.token);
            dispatch(setToken(response.data.token));
          })
          .catch(err => {
            console.log('Error to store token in Async');
          });
        console.log('success res of sign In: ', response.data.token);
      });

      // const result = await axios.post('http://localhost:8000/user/loginUser', {
      //   uEmail: emailId,
      //   uPassword: password,
      // });
      // console.warn(emailId, '-=-', password);
    } catch (error) {
      if (error.message !== 'Network Error') {
        console.log(
          'failed res of sign In: with Response data',
          error.response.data,
          'code is- ',
          error.response.status,
        );
      } else {
        console.log(`This is:= ${error}`);
      }
    }
  };

  const getToken = () => {
    AsyncStorage.getItem('Token')
      .then(token => console.log('Token from Async is', JSON.parse(token)))
      .catch(err => {
        console.log(`Error to get token:- ${err}`);
      });
  };
  return (
    <ScrollView>
      <SafeAreaView style={styles.screen}>
        <TextInput
          onChangeText={value => setEmailId(value)}
          placeholder={'Email ID'}
          style={styles.loginInput}
        />
        <TextInput
          onChangeText={value => setPassword(value)}
          placeholder={'Password'}
          style={styles.loginInput}
        />
        <TouchableOpacity
          onPress={() => {
            Alert.alert('This');
          }}>
          <LinearGradient
            style={styles.signInBtn}
            colors={['#192f6a', '#3b5998', '#4c669f']}
            // start={{x: 0, y: 1}}
            // end={{x: 1, y: 1}}
            useAngle
            angle={98.5}
            // locations={[0, 1]}
          >
            <Text style={styles.btnTxt}>SignIn</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Button title={'Login'} onPress={inputTxtFunc} />
        <Button
          title={'Next page'}
          onPress={() => navigation.navigate('Dashboard')}
          // onPress={getToken}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  loginInput: {
    borderColor: '#595959',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 4,
    paddingHorizontal: 4,
    width: '90%',
    height: '25%',
    fontSize: 18,
    // height: 90,
    padding: 0,
  },
  signInBtn: {
    width: 200,
    height: '50%',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  btnTxt: {
    fontSize: 20,
    color: 'white',
    fontWeight: '600',
  },
});

export default SignIn;
