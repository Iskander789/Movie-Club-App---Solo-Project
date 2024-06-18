import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOGOUT } from '../actions/types';

function* logout() {
  try {
    yield axios.post('/api/user/logout');
    yield put({ type: 'UNSET_USER' });
  } catch (error) {
    console.log('Error with logout:', error);
  }
}

function* logoutSaga() {
  yield takeLatest(LOGOUT, logout);
}

export default logoutSaga;
