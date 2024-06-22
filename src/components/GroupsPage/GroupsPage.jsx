import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './GroupsPage.css';

function GroupsPage() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    axios.get('/api/groups')
      .then(response => setGroups(response.data))
      .catch(error => console.log('Error fetching groups:', error));
  }, []);

  return (
    <div className="container">
      <h2>Your Groups</h2>
      {groups.length === 0 ? (
        <p>You are not a member of any groups yet.</p>
      ) : (
        <ul>
          {groups.map(group => (
            <li key={group.id}>{group.name}</li>
          ))}
        </ul>
      )}
      <Link to="/create-group" className="btn">Create a New Group</Link>
    </div>
  );
}

export default GroupsPage;
