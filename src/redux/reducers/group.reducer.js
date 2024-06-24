import { SET_GROUPS, SET_OTHER_GROUPS, SET_ERROR } from '../actions/types';

const initialState = {
  userGroups: [],
  otherGroups: [],
  error: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_GROUPS:
      return {
        ...state,
        userGroups: action.payload,
        error: '' // Clear any existing errors
      };
    case SET_OTHER_GROUPS:
      return {
        ...state,
        otherGroups: action.payload,
        error: '' // Clear any existing errors
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}
