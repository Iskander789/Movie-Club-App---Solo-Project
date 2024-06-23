import { combineReducers } from 'redux';
import user from './user.reducer';
import errors from './errors.reducer';
import group from './group.reducer';
import redirect from './redirect.reducer';

const rootReducer = combineReducers({
  user,
  errors,
  group,
  redirect,
});

export default rootReducer;
