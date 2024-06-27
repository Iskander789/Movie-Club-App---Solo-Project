// src/components/GroupDetailsPage/GroupDetailsPage.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchGroupDetails, updateGroup, deleteGroup } from '../../redux/actions/groupActions';
import GroupChat from '../GroupChat/GroupChat';
import './GroupDetailsPage.css';

function GroupDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const groupDetails = useSelector((store) => store.group.groupDetails);
  const [editing, setEditing] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  useEffect(() => {
    dispatch(fetchGroupDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (groupDetails) {
      setGroupName(groupDetails.name || '');
      setGroupDescription(groupDetails.description || '');
    }
  }, [groupDetails]);

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateGroup(id, { name: groupName, description: groupDescription }));
    setEditing(false);
  };

  const handleDelete = () => {
    dispatch(deleteGroup(id));
    history.push('/groups');
  };

  return (
    <div className="group-details-container">
      {groupDetails ? (
        <>
          {editing ? (
            <form onSubmit={handleUpdate}>
              <div>
                <label>Group Name:</label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                />
              </div>
              <div>
                <label>Group Description:</label>
                <textarea
                  value={groupDescription}
                  onChange={(e) => setGroupDescription(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </form>
          ) : (
            <>
              <h2>{groupDetails.name}</h2>
              <p>{groupDetails.description}</p>
              <p><strong>Group Leader:</strong> {groupDetails.groupLeader ? groupDetails.groupLeader.username : 'Loading...'}</p>
              <p><strong>Members:</strong></p>
              <ul>
                {groupDetails.groupMembers && groupDetails.groupMembers.length > 0 ? (
                  groupDetails.groupMembers.map((member) => (
                    <li key={member.id}>{member.username}</li>
                  ))
                ) : (
                  <p>No members yet.</p>
                )}
              </ul>
              <button onClick={() => setEditing(true)} className="btn btn-primary">Edit</button>
              <button onClick={handleDelete} className="btn btn-danger">Delete Group</button>
            </>
          )}
          <GroupChat groupId={id} />
          <button onClick={() => history.push('/groups')} className="btn btn-secondary">Back</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GroupDetailsPage;
