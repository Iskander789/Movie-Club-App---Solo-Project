import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // sends the user registration info from the payload to the server
    yield axios.post('/api/user/register', action.payload);

    console.log('User registered, dispatching login action'); // Add this line for logging

    // automatically log the user in after registration
    const loginAction = {
      type: 'LOGIN',
      payload: {
        username: action.payload.username,
        password: action.payload.password,
      },
    };
    yield put(loginAction);

  } catch (error) {
    console.log('Error with user registration:', error);
    if (error.response.status === 500) {
      yield put({ type: 'REGISTRATION_FAILED' });
    } else {
      yield put({ type: 'REGISTRATION_FAILED_NO_CODE' });
    }
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
