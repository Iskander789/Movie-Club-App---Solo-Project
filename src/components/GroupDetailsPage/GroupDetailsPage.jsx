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
      setGroupName(groupDetails.groupDetails.name);
      setGroupDescription(groupDetails.groupDetails.description);
    }
  }, [groupDetails]);

  const handleUpdate = () => {
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
            <>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
              <textarea
                value={groupDescription}
                onChange={(e) => setGroupDescription(e.target.value)}
              />
              <button onClick={handleUpdate} className="btn btn-primary">Save</button>
              <button onClick={() => setEditing(false)} className="btn btn-secondary">Cancel</button>
            </>
          ) : (
            <>
              <h2>{groupDetails.groupDetails.name}</h2>
              <p>{groupDetails.groupDetails.description}</p>
              <p><strong>Group Leader:</strong> {groupDetails.groupLeader.username}</p>
              <p><strong>Members:</strong></p>
              <ul>
                {groupDetails.groupMembers.map((member) => (
                  <li key={member.id}>{member.username}</li>
                ))}
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
