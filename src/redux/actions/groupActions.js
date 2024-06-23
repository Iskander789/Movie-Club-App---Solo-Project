import { FETCH_GROUPS, CREATE_GROUP } from './types';

export const fetchGroups = () => ({
  type: FETCH_GROUPS,
});

export const createGroup = (group) => ({
  type: CREATE_GROUP,
  payload: group,
});
