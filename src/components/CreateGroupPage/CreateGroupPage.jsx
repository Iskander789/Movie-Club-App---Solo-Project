import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createGroup } from '../../redux/actions/groupActions';
import './CreateGroupPage.css';

function CreateGroupPage() {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName || !groupDescription) {
      setError('All fields are required');
      return;
    }
    dispatch(createGroup({ name: groupName, description: groupDescription }));
    history.push('/groups');
  };

  return (
    <div className="create-group-container">
      <h2>Create a New Group</h2>
      <form className="create-group-form" onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="groupName">Group Name:</label>
          <input
            id="groupName"
            type="text"
            className="form-input"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="groupDescription">Group Description:</label>
          <textarea
            id="groupDescription"
            className="form-input"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">Create Group</button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => history.push('/groups')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateGroupPage;
