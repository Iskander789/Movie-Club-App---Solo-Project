import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createGroup } from '../../redux/actions/groupActions';
import './CreateGroupPage.css';

function CreateGroupPage() {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const error = useSelector((store) => store.group.error);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName || !groupDescription) {
      alert('All fields are required');
      return;
    }
    dispatch(createGroup({ name: groupName, description: groupDescription, history }));
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <div className="create-group-container">
      <h2>Create a New Group</h2>
      <form className="create-group-form" onSubmit={handleSubmit}>
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
          <button type="submit" className="btn btn-primary">Create Group</button>
          <button
            type="button"
            className="btn btn-secondary"
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
