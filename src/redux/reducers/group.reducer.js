import { SET_GROUPS, CREATE_GROUP } from '../actions/groupActions';

const groupReducer = (state = [], action) => {
  switch (action.type) {
    case SET_GROUPS:
      return action.payload;
    case CREATE_GROUP:
      return [...state, action.payload];
    default:
      return state;
  }
};

export default groupReducer;
