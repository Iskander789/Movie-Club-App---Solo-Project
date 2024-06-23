export const CREATE_GROUP = 'CREATE_GROUP';
export const SET_GROUPS = 'SET_GROUPS';

export const createGroup = (group) => ({
  type: CREATE_GROUP,
  payload: group,
});

export const setGroups = (groups) => ({
  type: SET_GROUPS,
  payload: groups,
});
