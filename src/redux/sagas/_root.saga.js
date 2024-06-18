// src/redux/sagas/_root.saga.js
import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import logoutSaga from './logout.saga'; // Import the logout saga

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    logoutSaga(), // Include the logout saga
  ]);
}
