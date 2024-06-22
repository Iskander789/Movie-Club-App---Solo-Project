import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './CreateGroupPage.css';

function CreateGroupPage() {
  const [groupName, setGroupName] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/groups', { name: groupName })
      .then(response => {
        console.log('Group created:', response.data);
        history.push('/groups');
      })
      .catch(error => console.log('Error creating group:', error));
  };

  return (
    <div className="container">
      <h2>Create a New Group</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="groupName">Group Name:</label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Create Group</button>
      </form>
    </div>
  );
}

export default CreateGroupPage;
