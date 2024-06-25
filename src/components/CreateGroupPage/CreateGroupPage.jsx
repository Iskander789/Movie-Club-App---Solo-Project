import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup } from '../../redux/actions/groupActions';
import './CreateGroupPage.css';

function CreateGroupPage() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const errorMessage = useSelector((store) => store.group.errorMessage);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createGroup({ name, description }));
  };

  return (
    <div className="create-group-container">
      <h2>Create a New Group</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="create-group-form">
        <div className="form-group">
          <label htmlFor="name">Group Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Create Group</button>
      </form>
    </div>
  );
}

export default CreateGroupPage;
