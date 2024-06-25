import {
  SET_USER,
  UNSET_USER,
  LOGIN_FAILED,
  REGISTRATION_FAILED,
  REDIRECT,
  CLEAR_REDIRECT,
} from '../actions/types';

const initialState = {
  id: null,
  username: '',
  email: '',
  profile_picture: '',
  group_name: '',
  is_leader: false,
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
        ...action.payload,
      };
    case UNSET_USER:
      return initialState;
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
