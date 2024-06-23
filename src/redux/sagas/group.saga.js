import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_GROUPS, SET_GROUPS, CREATE_GROUP } from '../actions/types';

function* fetchGroups() {
  try {
    const response = yield call(axios.get, '/api/groups');
    yield put({ type: SET_GROUPS, payload: response.data });
  } catch (error) {
    console.error('Error fetching groups:', error);
  }
}

function* createGroup(action) {
  try {
    yield call(axios.post, '/api/groups', action.payload);
    yield put({ type: FETCH_GROUPS });
  } catch (error) {
    console.error('Error creating group:', error);
  }
}

function* groupSaga() {
  yield takeLatest(FETCH_GROUPS, fetchGroups);
  yield takeLatest(CREATE_GROUP, createGroup);
}

export default groupSaga;
