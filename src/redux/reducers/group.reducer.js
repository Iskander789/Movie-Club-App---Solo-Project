import { SET_GROUPS, SET_OTHER_GROUPS } from '../actions/types';

const initialState = {
  userGroups: [],
  otherGroups: [],
};

export default function groupReducer(state = initialState, action) {
  switch (action.type) {
    case SET_GROUPS:
      return { ...state, userGroups: action.payload };
    case SET_OTHER_GROUPS:
      return { ...state, otherGroups: action.payload };
    default:
      return state;
  }
}
