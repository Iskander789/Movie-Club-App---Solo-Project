import {
  SET_GROUPS,
  SET_OTHER_GROUPS,
  SET_GROUP_DETAILS,
  SET_ERROR,
  SET_GROUP_MESSAGES,
} from '../actions/types';

const initialState = {
  userGroups: [],
  otherGroups: [],
  groupDetails: null,
  messages: [],
  error: null,
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GROUPS:
      return { ...state, userGroups: action.payload };
    case SET_OTHER_GROUPS:
      return { ...state, otherGroups: action.payload };
    case SET_GROUP_DETAILS:
      return { ...state, groupDetails: action.payload };
    case SET_GROUP_MESSAGES:
      return { ...state, messages: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default groupReducer;
