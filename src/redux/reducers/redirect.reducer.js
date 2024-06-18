// Define action types
const REDIRECT = 'REDIRECT';
const CLEAR_REDIRECT = 'CLEAR_REDIRECT';

const redirectReducer = (state = '', action) => {
  switch (action.type) {
    case REDIRECT:
      return action.payload;
    case CLEAR_REDIRECT:
      return '';
    default:
      return state;
  }
};

export default redirectReducer;
