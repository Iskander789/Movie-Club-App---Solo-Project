// src/redux/sagas/user.saga.js

import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_USER, SET_USER, UNSET_USER, LOGIN, REGISTER, LOGOUT } from '../actions/types';

function* fetchUser() {
  try {
    const response = yield call(axios.get, '/api/user');
    yield put({ type: SET_USER, payload: response.data });
  } catch (error) {
    console.error('User get request failed', error);
    yield put({ type: UNSET_USER });
  }
}

function* loginUser(action) {
  try {
    yield call(axios.post, '/api/user/login', action.payload);
    yield put({ type: FETCH_USER });
  } catch (error) {
    console.error('User login failed', error);
  }
}

function* registerUser(action) {
  try {
    yield call(axios.post, '/api/user/register', action.payload);
    if (action.callback) {
      action.callback();
    }
  } catch (error) {
    console.error('User registration failed', error);
  }
}

function* logoutUser() {
  try {
    yield call(axios.post, '/api/user/logout');
    yield put({ type: UNSET_USER });
  } catch (error) {
    console.error('User logout failed', error);
  }
}

function* userSaga() {
  yield takeLatest(FETCH_USER, fetchUser);
  yield takeLatest(LOGIN, loginUser);
  yield takeLatest(REGISTER, registerUser);
  yield takeLatest(LOGOUT, logoutUser);
}

export default userSaga;
