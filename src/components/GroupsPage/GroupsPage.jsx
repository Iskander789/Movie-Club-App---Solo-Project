// src/components/GroupsPage/GroupsPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './GroupsPage.css';

function GroupsPage() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('/api/groups')
      .then(response => setGroups(response.data))
      .catch(error => console.error('Error fetching groups:', error));
  }, []);

  return (
    <div className="container">
      <h2>Your Groups</h2>
      {groups.length > 0 ? (
        <ul className="group-list">
          {groups.map(group => (
            <li key={group.id} className="group-item">
              <h3>{group.name}</h3>
              <p>{group.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>You are not a member of any groups yet.</p>
      )}
    </div>
  );
}

export default GroupsPage;
