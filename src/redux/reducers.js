import {SET_TASKS, SET_TASK_ID, GET_BIKES, SET_TOKEN} from './actions';

const initialState = {
  tasks: [],
  taskID: 1,
  bikes: [],
  token: {},
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TASKS:
      // console.log('gre');
      // break;
      return {...state, tasks: action.payload};
    case SET_TASK_ID:
      return {...state, taskID: action.payload};
    case GET_BIKES:
      return {...state, bikes: action.payload};
    case SET_TOKEN:
      return {...state, token: action.payload};
    default:
      return state;
  }
}

export default taskReducer;
