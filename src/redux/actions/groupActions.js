// src/redux/actions/groupActions.js

import {
  FETCH_GROUPS,
  CREATE_GROUP,
  FETCH_OTHER_GROUPS,
  FETCH_GROUP_DETAILS,
  FETCH_GROUP_MESSAGES,
  POST_MESSAGE,
  ADD_GROUP_MEMBER,
  SET_GROUP_MEMBERS,
  UPDATE_GROUP,
  DELETE_GROUP,
  CLEAR_REDIRECT,
  SET_GROUP_DETAILS
} from './types';

export const fetchGroups = () => ({ type: FETCH_GROUPS });

export const fetchOtherGroups = () => ({ type: FETCH_OTHER_GROUPS });

export const createGroup = (groupData) => ({ type: CREATE_GROUP, payload: groupData });

export const fetchGroupDetails = (groupId) => ({ type: FETCH_GROUP_DETAILS, payload: groupId });

export const fetchGroupMessages = (groupId) => ({ type: FETCH_GROUP_MESSAGES, payload: groupId });

export const postMessage = (groupId, message) => ({ type: POST_MESSAGE, payload: { groupId, message } });

export const addGroupMember = (groupId, userId) => ({ type: ADD_GROUP_MEMBER, payload: { groupId, userId } });

export const fetchGroupMembers = (groupId) => ({ type: FETCH_GROUP_MEMBERS, payload: groupId });

export const updateGroup = (groupId, groupData) => ({ type: UPDATE_GROUP, payload: { groupId, groupData } });

export const deleteGroup = (groupId) => ({ type: DELETE_GROUP, payload: groupId });

export const clearRedirect = () => ({ type: CLEAR_REDIRECT });
