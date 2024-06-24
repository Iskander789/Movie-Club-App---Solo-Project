// src/redux/reducers/group.reducer.js

import {
  SET_GROUPS,
  SET_OTHER_GROUPS,
  SET_ERROR,
  SET_GROUP_DETAILS,
} from '../actions/types';

const initialState = {
  userGroups: [],
  otherGroups: [],
  error: null,
  groupDetails: null,
};

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GROUPS:
      return { ...state, userGroups: action.payload };
    case SET_OTHER_GROUPS:
      return { ...state, otherGroups: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case SET_GROUP_DETAILS:
      return { ...state, groupDetails: action.payload };
    default:
      return state;
  }
}
