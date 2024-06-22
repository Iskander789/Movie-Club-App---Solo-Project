import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOGOUT, REDIRECT } from '../actions/types';

function* logout() {
  try {
    yield axios.post('/api/user/logout');
    yield put({ type: REDIRECT, payload: '/login' }); // Redirect to login after logout
  } catch (error) {
    console.log('Logout failed', error);
  }
}

function* logoutSaga() {
  yield takeLatest(LOGOUT, logout);
}

export default logoutSaga;
