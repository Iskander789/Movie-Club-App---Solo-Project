import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { REGISTER, SET_USER, UNSET_USER, REDIRECT } from '../actions/types';

function* registerUser(action) {
  try {
    yield axios.post('/api/user/register', action.payload);
    yield put({ type: SET_USER, payload: action.payload });
    yield put({ type: REDIRECT, payload: '/login' });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: UNSET_USER });
    yield put({ type: 'REGISTRATION_FAILED', payload: error.message });
  }
}

function* registrationSaga() {
  yield takeLatest(REGISTER, registerUser);
}

export default registrationSaga;
