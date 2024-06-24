import axios from 'axios';
import { FETCH_GROUPS, CREATE_GROUP, FETCH_GROUP_DETAILS, FETCH_OTHER_GROUPS, SET_GROUPS, SET_GROUP_DETAILS } from './types';

// Action to fetch user's groups
export const fetchGroups = () => ({
  type: FETCH_GROUPS,
});

// Action to fetch other groups
export const fetchOtherGroups = () => ({
  type: FETCH_OTHER_GROUPS,
});

// Action to create a new group
export const createGroup = (groupData) => ({
  type: CREATE_GROUP,
  payload: groupData,
});

// Action to fetch group details
export const fetchGroupDetails = (groupId) => ({
  type: FETCH_GROUP_DETAILS,
  payload: groupId,
});
