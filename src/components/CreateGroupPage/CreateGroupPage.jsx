import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './CreateGroupPage.css';

function CreateGroupPage() {
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: 'CREATE_GROUP',
      payload: { groupName, description }
    });
    history.push('/groups');
  };

  const handleCancel = () => {
    history.push('/groups');
  };

  return (
    <div className="create-group-container">
      <h2>Create a New Group</h2>
      <form onSubmit={handleSubmit} className="create-group-form">
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
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn">Create Group</button>
        <button type="button" className="btn cancel-btn" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

export default CreateGroupPage;
