import { combineReducers } from 'redux';
import user from './user.reducer';
import errors from './errors.reducer';
import group from './group.reducer'; 

const rootReducer = combineReducers({
  user,
  errors,
  group, 
  
});

export default rootReducer;
