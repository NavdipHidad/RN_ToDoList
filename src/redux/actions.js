import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

export const SET_TASKS = 'SET_TASKS';
export const SET_TASK_ID = 'SET_TASKS_ID';
export const GET_BIKES = 'GET_BIKES';
export const SET_TOKEN = 'SET_TOKEN';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1RW1haWwiOiJhbWFuQGdtYWlsLmNvbSIsInVJZCI6IjYzZmRhMzUwYmEzNDczMGM4ZmE0Nzk5ZiIsImlhdCI6MTY3ODA4ODUwMiwiZXhwIjoxNjc4MDg4ODAyfQ.tZZTmYRuhJQlYSYRuBCB-7bwgfyL0gNaFxhhffDNwR8';

const getBikes = () => {
  // const {token} = useSelector(state => state.taskReducer);
  try {
    console.log(`token at action`);
    return async dispatch => {
      const response = await axios.get(
        'http://localhost:8000/bikeType/getBikeType',
        {
          headers: {
            authorization: token,
          },
        },
      );
      // const json = await response.json();
      if (response) {
        console.warn('===:-', response.data);
        dispatch({
          type: GET_BIKES,
          payload: response.data,
        });
      } else {
        console.log('Unable to fetch');
      }
    };
  } catch (error) {
    console.log('Catch in action: ', error);
    //throw error;
  }
};

const setTasks = tasks => dispatch => {
  console.log('tasks at action: ', tasks);
  dispatch({
    type: SET_TASKS,
    payload: tasks,
  });
};

const setTaskID = taskID => dispatch => {
  // console.log('taskID at action: ', taskID);
  dispatch({
    type: SET_TASK_ID,
    payload: taskID,
  });
};

const setToken = uToken => dispatch => {
  console.log(`Token at action: ${uToken}`);
  dispatch({
    type: SET_TOKEN,
    payload: uToken,
  });
};

export {getBikes, setTasks, setTaskID, setToken};
