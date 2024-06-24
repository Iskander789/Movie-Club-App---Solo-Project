import { FETCH_GROUPS, FETCH_OTHER_GROUPS, FETCH_GROUP_DETAILS, SET_GROUP_DETAILS, CREATE_GROUP } from './types';

export const fetchGroups = () => ({
  type: FETCH_GROUPS,
});

export const fetchOtherGroups = () => ({
  type: FETCH_OTHER_GROUPS,
});

export const fetchGroupDetails = (groupId) => ({
  type: FETCH_GROUP_DETAILS,
  payload: groupId,
});

export const setGroupDetails = (group) => ({
  type: SET_GROUP_DETAILS,
  payload: group,
});

export const createGroup = (group) => ({
  type: CREATE_GROUP,
  payload: group,
});
