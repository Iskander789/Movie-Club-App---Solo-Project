import { FETCH_GROUPS, CREATE_GROUP, FETCH_OTHER_GROUPS, FETCH_GROUP_DETAILS, DELETE_GROUP, UPDATE_GROUP, SET_ERROR } from './types';

// Action creators
export const fetchGroups = () => ({ type: FETCH_GROUPS });

export const fetchOtherGroups = () => ({ type: FETCH_OTHER_GROUPS });

export const createGroup = (groupData) => ({ type: CREATE_GROUP, payload: groupData });

export const fetchGroupDetails = (groupId) => ({ type: FETCH_GROUP_DETAILS, payload: groupId });

export const updateGroup = (groupId, groupData) => ({ type: UPDATE_GROUP, payload: { groupId, groupData } });

export const deleteGroup = (groupId) => ({ type: DELETE_GROUP, payload: groupId });

export const setError = (error) => ({ type: SET_ERROR, payload: error });
