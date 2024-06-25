import {
  SET_USER,
  UNSET_USER,
  LOGIN,
  LOGIN_FAILED,
  REGISTER,
  REGISTRATION_FAILED,
  REDIRECT,
  CLEAR_REDIRECT,
  FETCH_USER,
} from '../actions/types';

const initialState = {
  user: {},
  errors: {
    loginMessage: '',
    registrationMessage: '',
  },
  redirect: '',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UNSET_USER:
      return {
        ...state,
        user: {},
      };
    case LOGIN_FAILED:
      return {
        ...state,
        errors: {
          ...state.errors,
          loginMessage: action.payload,
        },
      };
    case REGISTRATION_FAILED:
      return {
        ...state,
        errors: {
          ...state.errors,
          registrationMessage: action.payload,
        },
      };
    case REDIRECT:
      return {
        ...state,
        redirect: action.payload,
      };
    case CLEAR_REDIRECT:
      return {
        ...state,
        redirect: '',
      };
    default:
      return state;
  }
};

export default userReducer;
