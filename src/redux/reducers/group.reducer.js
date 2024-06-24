import { SET_GROUPS, SET_OTHER_GROUPS, SET_GROUP_DETAILS } from '../actions/types';

const initialState = {
  userGroups: [],
  otherGroups: [],
  currentGroup: null,
};

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GROUPS:
      return { ...state, userGroups: action.payload };
    case SET_OTHER_GROUPS:
      return { ...state, otherGroups: action.payload };
    case SET_GROUP_DETAILS:
      return { ...state, currentGroup: action.payload };
    default:
      return state;
  }
}
