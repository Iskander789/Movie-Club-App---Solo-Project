// src/redux/sagas/logout.saga.js
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOGOUT, UNSET_USER, REDIRECT } from '../actions/types';

function* logout() {
  try {
    yield axios.post('/api/user/logout');
    yield put({ type: UNSET_USER });
    yield put({ type: REDIRECT, payload: '/login' });
  } catch (error) {
    console.log('Logout failed', error);
  }
}

function* logoutSaga() {
  yield takeLatest(LOGOUT, logout);
}

export default logoutSaga;
