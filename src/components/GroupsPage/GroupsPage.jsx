import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './GroupsPage.css';

function GroupsPage() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('/api/groups')
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.error('Error fetching groups: ', error);
      });
  }, []);

  return (
    <div className="groups-container">
      <h1 className="groups-header">Your Groups</h1>
      {groups.length === 0 ? (
        <p>You are not a member of any groups yet.</p>
      ) : (
        <ul className="groups-list">
          {groups.map((group) => (
            <li key={group.id}>
              <h2>{group.name}</h2>
              <p>{group.description}</p>
            </li>
          ))}
        </ul>
      )}
      <Link to="/groups/new" className="create-group-link">Create a New Group</Link>
    </div>
  );
}

export default GroupsPage;
