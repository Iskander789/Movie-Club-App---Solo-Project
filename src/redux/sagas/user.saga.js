// src/redux/sagas/user.saga.js
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_USER, SET_USER, UNSET_USER } from '../actions/types';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const response = yield axios.get('/api/user');
    yield put({ type: SET_USER, payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
    if (error.response.status === 403) {
      yield put({ type: UNSET_USER });
      yield put({ type: 'REDIRECT', payload: '/login' });
    }
  }
}

// watcher Saga: spawns a new fetchUser task on each FETCH_USER
function* userSaga() {
  yield takeLatest(FETCH_USER, fetchUser);
}

export default userSaga;
