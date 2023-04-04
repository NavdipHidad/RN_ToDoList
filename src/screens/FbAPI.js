import React, {useState, useEffect} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';

import {getBikes} from '../redux/actions';
const FbAPI = () => {
  const [isLoading, setLoading] = useState(false);
  const [movieData, setMovieData] = useState([]);

  const {bikes} = useSelector(state => state.taskReducer);
  const {token} = useSelector(state => state.taskReducer);
  //   if (bikes) {
  //     setLoading(false);
  //   }
  const dispatch = useDispatch();

  const getFromAxios = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/bikeType/getBikeType',
        {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1RW1haWwiOiJrYXJ0aWtAZ21haWwuY29tIiwidUlkIjoiNjNkM2IyYTg4MGE1MDg1NDBjZjE2OWUxIiwiaWF0IjoxNjc3NjU2MDk0LCJleHAiOjE2Nzc2NTk2OTR9.u0odOHsxrvUaexCjR-PZrYpeMqLafskLBU4bytvJBDE',
          },
        },
      );
      console.log('Res by Axios', response);
    } catch (error) {
      console.log(error);
    }
  };

  const postToAxios = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/bikeType/addBikeType',
        {
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1RW1haWwiOiJrYXJ0aWtAZ21haWwuY29tIiwidUlkIjoiNjNkM2IyYTg4MGE1MDg1NDBjZjE2OWUxIiwiaWF0IjoxNjc3NjU2MDk0LCJleHAiOjE2Nzc2NTk2OTR9.u0odOHsxrvUaexCjR-PZrYpeMqLafskLBU4bytvJBDE',
          },
          bikeType: 'EV',
        },
      );
      console.log('Post res by Axios', response);
    } catch (error) {
      console.log(error);
    }
  };

  const getMoviess = async () => {
    try {
      const response = await fetch(
        'http://localhost:8000/bikeType/getBikeType',
        {
          method: 'GET',
          headers: {
            authorization:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1RW1haWwiOiJrYXJ0aWtAZ21haWwuY29tIiwidUlkIjoiNjNkM2IyYTg4MGE1MDg1NDBjZjE2OWUxIiwiaWF0IjoxNjc3NjU2MDk0LCJleHAiOjE2Nzc2NTk2OTR9.u0odOHsxrvUaexCjR-PZrYpeMqLafskLBU4bytvJBDE',
          },
        },
      );
      const json = await response.json();
      setMovieData(json);
      //   console.warn(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getBikes());
    // getMoviess();
    // getFromAxios();
    // postToAxios();
    // console.warn('in effect - ', getMoviess());
  }, []);

  //   console.warn('at screen: ', bikes);
  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={bikes}
          keyExtractor={({_id}) => _id}
          renderItem={({item}) => (
            <Text>
              {/* {item.title}, {item.releaseYear} */}
              {item.bikeType}
            </Text>
          )}
        />
      )}
      {/* <Text>By the token: {token}</Text> */}
    </View>
  );
};

export default FbAPI;
