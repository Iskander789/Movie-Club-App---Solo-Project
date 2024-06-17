import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import redirect from './redirect.reducer';

const rootReducer = combineReducers({
  errors,
  user,
  redirect,
});

export default rootReducer;
