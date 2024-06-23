import { all } from 'redux-saga/effects';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import userSaga from './user.saga';
import groupSaga from './group.saga'; // Ensure this is correctly imported
import logoutSaga from './logout.saga';

export default function* rootSaga() {
  yield all([
    loginSaga(),
    registrationSaga(),
    userSaga(),
    groupSaga(), // Ensure this is correctly run
    logoutSaga(),
  ]);
}
