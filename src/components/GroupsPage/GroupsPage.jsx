import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchGroups, fetchOtherGroups } from '../../redux/actions/groupActions';
import './GroupsPage.css';

function GroupsPage() {
  const dispatch = useDispatch();
  const userGroups = useSelector((state) => state.group.userGroups);
  const otherGroups = useSelector((state) => state.group.otherGroups);

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchOtherGroups());
  }, [dispatch]);

  return (
    <div className="groups-container">
      <h2>Your Groups</h2>
      {userGroups.length === 0 ? (
        <p>You are not a member of any groups yet.</p>
      ) : (
        <ul className="group-list">
          {userGroups.map((group) => (
            <li key={group.id}>
              <span>{group.name}</span>
              <Link to={`/groups/${group.id}`} className="btn btn-primary">View Details</Link>
            </li>
          ))}
        </ul>
      )}
      <div className="create-group-button">
        <Link to="/groups/new" className="btn btn-primary">Create a New Group</Link>
      </div>
      <h2>Other Groups</h2>
      <ul className="group-list">
        {otherGroups.map((group) => (
          <li key={group.id}>
            <span>{group.name}</span>
            <Link to={`/groups/${group.id}`} className="btn btn-primary">View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupsPage;
