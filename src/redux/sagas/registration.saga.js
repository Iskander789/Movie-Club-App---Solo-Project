import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* registerUser(action) {
  try {
    yield axios.post('/api/user/register', action.payload);
    yield put({ type: 'SET_USER', payload: 'Created' });
    yield put({ type: 'REDIRECT', payload: '/login' });
  } catch (error) {
    if (error.response && error.response.status === 409) {
      yield put({ type: 'REGISTRATION_FAILED', payload: 'Username already taken' });
    } else {
      yield put({ type: 'REGISTRATION_FAILED', payload: 'User registration failed. Please try again.' });
    }
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
}

export default registrationSaga;
