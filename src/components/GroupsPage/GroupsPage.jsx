// src/components/GroupsPage/GroupsPage.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
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
    <div className="groups-page-container">
      <h1>Groups</h1>
      <button className="btn btn-primary create-group-button" onClick={() => history.push('/groups/new')}>
        Create New Group
      </button>
      <div className="groups-section">
        <h2>Your Groups</h2>
        <div className="groups-list">
          {userGroups.map((group) => (
            <div key={group.id} className="group-item">
              <Link to={`/groups/${group.id}`} className="group-link">
                {group.name}
              </Link>
              <p>{group.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="groups-section">
        <h2>Other Groups</h2>
        <div className="groups-list">
          {otherGroups.map((group) => (
            <div key={group.id} className="group-item">
              <Link to={`/groups/${group.id}`} className="group-link">
                {group.name}
              </Link>
              <p>{group.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GroupsPage;
