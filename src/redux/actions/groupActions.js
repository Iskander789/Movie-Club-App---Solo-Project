import { FETCH_GROUPS, CREATE_GROUP, FETCH_OTHER_GROUPS } from './types';

export const fetchGroups = () => ({
  type: FETCH_GROUPS,
});

export const fetchOtherGroups = () => ({
  type: FETCH_OTHER_GROUPS,
});

export const createGroup = (group) => ({
  type: CREATE_GROUP,
  payload: group,
});
