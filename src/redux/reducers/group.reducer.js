import { SET_GROUPS } from '../actions/types';

const groupReducer = (state = [], action) => {
  switch (action.type) {
    case SET_GROUPS:
      return action.payload;
    default:
      return state;
  }
};

export default groupReducer;
