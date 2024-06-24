// src/components/GroupsPage/GroupsPage.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchGroups, fetchOtherGroups } from '../../redux/actions/groupActions';
import { Link } from 'react-router-dom';
import './GroupsPage.css';

function GroupsPage() {
  const dispatch = useDispatch();
  const userGroups = useSelector((store) => store.group.userGroups);
  const otherGroups = useSelector((store) => store.group.otherGroups);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchOtherGroups());
  }, [dispatch]);

  return (
    <div className="groups-container">
      <h2>Your Groups</h2>
      <ul className="group-list">
        {userGroups.map((group) => (
          <li key={group.id} className="group-item">
            <Link to={`/groups/${group.id}`}>{group.name}</Link>
          </li>
        ))}
      </ul>

      <div className="create-group-button">
        <Link to="/groups/new" className="btn">Create a New Group</Link>
      </div>

      <h2>Other Groups</h2>
      <ul className="group-list">
        {otherGroups.map((group) => (
          <li key={group.id} className="group-item">
            <Link to={`/groups/${group.id}`}>{group.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupsPage;
