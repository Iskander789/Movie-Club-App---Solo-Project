import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { FETCH_GROUPS, SET_GROUPS, FETCH_OTHER_GROUPS, SET_OTHER_GROUPS, FETCH_GROUP_DETAILS, SET_GROUP_DETAILS, CREATE_GROUP } from '../actions/types';

function* fetchGroups() {
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

function* fetchGroupDetails(action) {
  try {
    const response = yield call(axios.get, `/api/groups/${action.payload}`);
    yield put({ type: SET_GROUP_DETAILS, payload: response.data });
  } catch (error) {
    console.error('Error fetching group details:', error);
  }
}

function* createGroup(action) {
  try {
    yield call(axios.post, '/api/groups', action.payload);
    yield put(fetchGroups());
  } catch (error) {
    console.error('Error creating group:', error);
  }
}

function* groupSaga() {
  yield takeEvery(FETCH_GROUPS, fetchGroups);
  yield takeEvery(FETCH_OTHER_GROUPS, fetchOtherGroups);
  yield takeEvery(FETCH_GROUP_DETAILS, fetchGroupDetails);
  yield takeEvery(CREATE_GROUP, createGroup);
}

export default groupSaga;
