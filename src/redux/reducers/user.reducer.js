// Define action types
const SET_USER = 'SET_USER';
const UNSET_USER = 'UNSET_USER';

const initialState = {};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case UNSET_USER:
      return {};
    default:
      return state;
  }
};

export default userReducer;
