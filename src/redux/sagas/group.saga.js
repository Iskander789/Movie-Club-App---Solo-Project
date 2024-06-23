import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_GROUPS, SET_GROUPS, FETCH_OTHER_GROUPS, SET_OTHER_GROUPS, CREATE_GROUP } from '../actions/types';

function* fetchUserGroups() {
  try {
    const response = yield call(axios.get, '/api/groups/user');
    yield put({ type: SET_GROUPS, payload: response.data });
  } catch (error) {
    console.error('Error fetching user groups:', error);
  }
}

function* fetchOtherGroups() {
  try {
    const response = yield call(axios.get, '/api/groups/other');
    yield put({ type: SET_OTHER_GROUPS, payload: response.data });
  } catch (error) {
    console.error('Error fetching other groups:', error);
  }
}

function* createGroup(action) {
  try {
    yield call(axios.post, '/api/groups', action.payload);
    yield put({ type: FETCH_GROUPS });
    yield put({ type: FETCH_OTHER_GROUPS });
  } catch (error) {
    console.error('Error creating group:', error);
  }
}

function* groupSaga() {
  yield takeLatest(FETCH_GROUPS, fetchUserGroups);
  yield takeLatest(FETCH_OTHER_GROUPS, fetchOtherGroups);
  yield takeLatest(CREATE_GROUP, createGroup);
}

export default groupSaga;
