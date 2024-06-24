import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchGroupDetails, updateGroup, deleteGroup } from '../../redux/actions/groupActions';
import './GroupDetailsPage.css';

function GroupDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const group = useSelector((store) => store.group.groupDetails);
  const user = useSelector((store) => store.user);
  const [isEditing, setIsEditing] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  useEffect(() => {
    dispatch(fetchGroupDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (group) {
      setGroupName(group.name);
      setGroupDescription(group.description);
    }
  }, [group]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    dispatch(updateGroup(id, { name: groupName, description: groupDescription }));
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteGroup(id));
    history.push('/groups');
  };

  const handleBack = () => {
    history.push('/groups');
  };

  return (
    <div className="group-details-container">
      {group ? (
        <>
          <h2>Group Details</h2>
          {isEditing ? (
            <>
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
                <button onClick={handleSave} className="btn btn-primary">Save</button>
                <button onClick={handleCancel} className="btn btn-secondary">Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {group.name}</p>
              <p><strong>Description:</strong> {group.description}</p>
              {group.user_id === user.id && (
                <div className="form-actions">
                  <button onClick={handleEdit} className="btn btn-primary">Edit</button>
                  <button onClick={handleDelete} className="btn btn-secondary">Delete</button>
                </div>
              )}
            </>
          )}
          <button onClick={handleBack} className="btn btn-secondary back-button">Back</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GroupDetailsPage;
