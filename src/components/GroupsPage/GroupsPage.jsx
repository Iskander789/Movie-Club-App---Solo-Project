// src/components/GroupsPage/GroupsPage.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchGroups, fetchOtherGroups } from '../../redux/actions/groupActions';
import './GroupsPage.css';

function GroupsPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userGroups = useSelector((store) => store.group.userGroups);
  const otherGroups = useSelector((store) => store.group.otherGroups);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchOtherGroups());
  }, [dispatch]);

  const handleCreateGroup = () => {
    history.push('/groups/create');
  };

  const handleViewGroup = (id) => {
    history.push(`/groups/${id}`);
  };

  return (
    <div className="groups-page-container">
      <h2>Your Groups</h2>
      <button onClick={handleCreateGroup} className="btn btn-primary">Create New Group</button>
      <div className="groups-list">
        {userGroups.length > 0 ? (
          userGroups.map((group) => (
            <div key={group.id} className="group-card" onClick={() => handleViewGroup(group.id)}>
              <h3>{group.name}</h3>
              <p>{group.description}</p>
            </div>
          ))
        ) : (
          <p>You are not a member of any groups yet.</p>
        )}
      </div>
      <h2>Other Groups</h2>
      <div className="groups-list">
        {otherGroups.length > 0 ? (
          otherGroups.map((group) => (
            <div key={group.id} className="group-card" onClick={() => handleViewGroup(group.id)}>
              <h3>{group.name}</h3>
              <p>{group.description}</p>
            </div>
          ))
        ) : (
          <p>There are no other groups available.</p>
        )}
      </div>
    </div>
  );
}

export default GroupsPage;
