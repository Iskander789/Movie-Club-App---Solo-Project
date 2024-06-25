import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { REGISTER, REGISTRATION_FAILED, SET_USER, REDIRECT } from '../actions/types';

function* registerUser(action) {
  try {
    const response = yield call(axios.post, '/api/user/register', action.payload);
    yield put({ type: SET_USER, payload: response.data });
    yield put({ type: REDIRECT, payload: '/login' });
  } catch (error) {
    if (error.response && error.response.status === 409) {
      yield put({ type: REGISTRATION_FAILED, payload: 'Username already taken' });
    } else {
      yield put({ type: REGISTRATION_FAILED, payload: 'Registration failed. Please try again.' });
    }
  }
}

function* registrationSaga() {
  yield takeLatest(REGISTER, registerUser);
}

export default registrationSaga;
