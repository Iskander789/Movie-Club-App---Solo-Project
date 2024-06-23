import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchGroups, fetchOtherGroups } from '../../redux/actions/groupActions';
import './GroupsPage.css';

function GroupsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userGroups = useSelector((state) => state.group.userGroups);
  const otherGroups = useSelector((state) => state.group.otherGroups);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchOtherGroups());
  }, [dispatch]);

  return (
    <div className="groups-page">
      <h2>Your Groups</h2>
      {userGroups.length ? (
        userGroups.map((group) => <p key={group.id}>{group.name}</p>)
      ) : (
        <p>You are not a member of any groups yet.</p>
      )}
      <button onClick={() => history.push('/groups/new')} className="btn btn-primary create-group-btn">
        Create a New Group
      </button>
      <h2>Other Groups</h2>
      {otherGroups.length ? (
        otherGroups.map((group) => <p key={group.id}>{group.name}</p>)
      ) : (
        <p>There are no other groups available.</p>
      )}
    </div>
  );
}

export default GroupsPage;
