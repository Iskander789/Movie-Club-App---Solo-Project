import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import redirect from './redirect.reducer';

const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  redirect, // handles redirect state
});

export default rootReducer;
