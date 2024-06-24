// src/redux/sagas/group.saga.js

import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  FETCH_GROUPS,
  SET_GROUPS,
  CREATE_GROUP,
  FETCH_OTHER_GROUPS,
  SET_OTHER_GROUPS,
  SET_ERROR,
  FETCH_GROUP_DETAILS,
  SET_GROUP_DETAILS,
} from '../actions/types';

// Fetch user groups
function* fetchGroupsSaga() {
  try {
    const response = yield call(axios.get, '/api/groups/user');
    yield put({ type: SET_GROUPS, payload: response.data });
  } catch (error) {
    console.error('Error fetching user groups:', error);
  }
}

// Fetch other groups
function* fetchOtherGroupsSaga() {
  try {
    const response = yield call(axios.get, '/api/groups/other');
    yield put({ type: SET_OTHER_GROUPS, payload: response.data });
  } catch (error) {
    console.error('Error fetching other groups:', error);
  }
}

// Fetch group details
function* fetchGroupDetailsSaga(action) {
  try {
    const response = yield call(axios.get, `/api/groups/${action.payload}`);
    yield put({ type: SET_GROUP_DETAILS, payload: response.data });
  } catch (error) {
    console.error('Error fetching group details:', error);
  }
}

// Create a new group
function* createGroupSaga(action) {
  try {
    yield call(axios.post, '/api/groups', action.payload);
    yield put({ type: FETCH_GROUPS });
    yield put({ type: FETCH_OTHER_GROUPS });
  } catch (error) {
    console.error('Error creating group:', error);
    if (error.response && error.response.data && error.response.data.error) {
      yield put({ type: SET_ERROR, payload: error.response.data.error });
    }
  }
}

function* groupSaga() {
  yield takeLatest(FETCH_GROUPS, fetchGroupsSaga);
  yield takeLatest(FETCH_OTHER_GROUPS, fetchOtherGroupsSaga);
  yield takeLatest(CREATE_GROUP, createGroupSaga);
  yield takeLatest(FETCH_GROUP_DETAILS, fetchGroupDetailsSaga);
}

export default groupSaga;
