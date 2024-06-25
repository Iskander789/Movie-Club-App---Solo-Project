import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN, FETCH_USER, SET_USER, REDIRECT } from '../actions/types';

function* loginUser(action) {
  try {
    const response = yield axios.post('/api/user/login', action.payload);
    yield put({ type: SET_USER, payload: response.data });  // Ensure the payload is the user data
    yield put({ type: FETCH_USER });
    yield put({ type: REDIRECT, payload: '/home' });  // Redirect to home after login
  } catch (error) {
    console.error('Error logging in', error);
  }
}

function* loginSaga() {
  yield takeLatest(LOGIN, loginUser);
}

export default loginSaga;
