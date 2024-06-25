import { takeLatest, put, call } from 'redux-saga/effects';
import axios from 'axios';
import { LOGIN, REGISTER, FETCH_USER, SET_USER, REDIRECT, REGISTRATION_FAILED, LOGIN_FAILED, UNSET_USER, LOGOUT } from '../actions/types';

function* loginUser(action) {
  try {
    yield call(axios.post, '/api/user/login', action.payload);
    yield put({ type: FETCH_USER });
    yield put({ type: REDIRECT, payload: '/home' });
  } catch (error) {
    console.log('Error logging in', error);
    yield put({ type: LOGIN_FAILED, payload: 'Login failed. Please try again.' });
  }
}

function* registerUser(action) {
  try {
    yield call(axios.post, '/api/user/register', action.payload);
    yield put({ type: SET_USER, payload: action.payload });
    yield put({ type: REDIRECT, payload: '/login' });
  } catch (error) {
    console.log('Error registering user', error);
    if (error.response && error.response.status === 409) {
      yield put({ type: REGISTRATION_FAILED, payload: 'Username already taken' });
    } else {
      yield put({ type: REGISTRATION_FAILED, payload: 'Registration failed. Please try again.' });
    }
  }
}

function* fetchUser() {
  try {
    const response = yield call(axios.get, '/api/user');
    yield put({ type: SET_USER, payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
    yield put({ type: UNSET_USER });
  }
}

function* logoutUser() {
  try {
    yield call(axios.post, '/api/user/logout');
    yield put({ type: UNSET_USER });
    yield put({ type: REDIRECT, payload: '/login' });
  } catch (error) {
    console.log('Error logging out', error);
  }
}

function* userSaga() {
  yield takeLatest(LOGIN, loginUser);
  yield takeLatest(REGISTER, registerUser);
  yield takeLatest(FETCH_USER, fetchUser);
  yield takeLatest(LOGOUT, logoutUser);
}

export default userSaga;
