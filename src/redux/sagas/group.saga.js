import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { CREATE_GROUP, setGroups } from '../actions/groupActions';

function* createGroup(action) {
  try {
    yield call(axios.post, '/api/groups', action.payload);
    const response = yield call(axios.get, '/api/groups');
    yield put(setGroups(response.data));
  } catch (error) {
    console.error('Error creating group:', error);
  }
}

function* groupSaga() {
  yield takeLatest(CREATE_GROUP, createGroup);
}

export default groupSaga;
