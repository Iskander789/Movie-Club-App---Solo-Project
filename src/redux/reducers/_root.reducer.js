// src/redux/reducers/_root.reducer.js
import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import redirect from './redirect.reducer';

const rootReducer = combineReducers({
  errors,
  user,
  redirect, // Ensure redirect reducer is combined
});

export default rootReducer;
