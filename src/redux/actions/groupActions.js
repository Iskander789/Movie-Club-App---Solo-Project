// src/redux/actions/groupActions.js

import axios from 'axios';
import {
  FETCH_GROUPS,
  CREATE_GROUP,
  FETCH_OTHER_GROUPS,
  FETCH_GROUP_DETAILS,
  SET_ERROR,
  FETCH_GROUP_MESSAGES,
  POST_MESSAGE,
  ADD_GROUP_MEMBER,
  SET_GROUP_MEMBERS,
  UPDATE_GROUP,
  DELETE_GROUP
} from './types';

export const fetchGroups = () => ({ type: FETCH_GROUPS });

export const fetchOtherGroups = () => ({ type: FETCH_OTHER_GROUPS });

export const createGroup = (groupData) => ({ type: CREATE_GROUP, payload: groupData });

export const fetchGroupDetails = (groupId) => ({ type: FETCH_GROUP_DETAILS, payload: groupId });

export const fetchGroupMessages = (groupId) => ({ type: FETCH_GROUP_MESSAGES, payload: groupId });

export const postMessage = (groupId, message) => ({ type: POST_MESSAGE, payload: { groupId, message } });

export const addGroupMember = (groupId, userId) => ({ type: ADD_GROUP_MEMBER, payload: { groupId, userId } });

export const fetchGroupMembers = (groupId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/groups/${groupId}/members`);
    dispatch({ type: SET_GROUP_MEMBERS, payload: response.data });
  } catch (error) {
    console.error('Error fetching group members:', error);
    dispatch({ type: SET_ERROR, payload: 'Error fetching group members' });
  }
};

export const updateGroup = (groupId, groupData) => async (dispatch) => {
  try {
    await axios.put(`/api/groups/${groupId}`, groupData);
    dispatch(fetchGroupDetails(groupId));
    dispatch(fetchGroups());
    dispatch(fetchOtherGroups());
  } catch (error) {
    console.error('Error updating group:', error);
    dispatch({ type: SET_ERROR, payload: 'Error updating group' });
  }
};

export const deleteGroup = (groupId) => async (dispatch) => {
  try {
    await axios.delete(`/api/groups/${groupId}`);
    dispatch(fetchGroups());
    dispatch(fetchOtherGroups());
  } catch (error) {
    console.error('Error deleting group:', error);
    dispatch({ type: SET_ERROR, payload: 'Error deleting group' });
  }
};
