import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchUser() {
  try {
    const response = yield axios.get('/api/user/profile', {
      withCredentials: true,
    });

    yield put({ type: 'SET_USER', payload: response.data });
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
}

export default userSaga;
