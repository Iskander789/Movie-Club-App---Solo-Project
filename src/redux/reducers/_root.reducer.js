// src/redux/reducers/_root.reducer.js
import { combineReducers } from 'redux';
import user from './user.reducer';
import errors from './errors.reducer';
import group from './group.reducer';
import redirect from './redirect.reducer';
import { SET_USER } from '../actions/types'; // Import the action type

const appReducer = combineReducers({
  user,
  errors,
  group,
  redirect,
});

const rootReducer = (state, action) => {
  if (action.type === SET_USER) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
