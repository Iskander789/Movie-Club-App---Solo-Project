import {
  FETCH_GROUPS,
  SET_GROUPS,
  FETCH_OTHER_GROUPS,
  SET_OTHER_GROUPS,
  FETCH_GROUP_DETAILS,
  SET_GROUP_DETAILS,
  SET_ERROR,
  FETCH_GROUP_MESSAGES,
  SET_GROUP_MESSAGES,
  POST_MESSAGE,
  ADD_GROUP_MEMBER,
  SET_GROUP_MEMBERS,
  UPDATE_GROUP,
  DELETE_GROUP,
  SET_REDIRECT,
  CLEAR_REDIRECT,
} from '../actions/types';

const initialState = {
  userGroups: [],
  otherGroups: [],
  groupDetails: null,
  groupMessages: [],
  redirect: '',
  errorMessage: null,
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
      return { ...state, groupMessages: action.payload };
    case SET_REDIRECT:
      return { ...state, redirect: action.payload };
    case CLEAR_REDIRECT:
      return { ...state, redirect: '' };
    case SET_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default groupReducer;
