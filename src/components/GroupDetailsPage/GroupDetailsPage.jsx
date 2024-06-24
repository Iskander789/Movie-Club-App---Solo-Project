import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { fetchGroupDetails, updateGroup, deleteGroup } from '../../redux/actions/groupActions';
import './GroupDetailsPage.css';

function GroupDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const groupDetails = useSelector((store) => store.group.groupDetails);
  const user = useSelector((store) => store.user);

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    dispatch(fetchGroupDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (groupDetails) {
      setName(groupDetails.name);
      setDescription(groupDetails.description);
    }
  }, [groupDetails]);

  const handleSave = () => {
    dispatch(updateGroup(id, { name, description }));
    setEditMode(false);
  };

  const handleDelete = () => {
    dispatch(deleteGroup(id));
    history.push('/groups');
  };

  return (
    <div className="group-details-container">
      {groupDetails ? (
        <>
          {editMode ? (
            <>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Group Name"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Group Description"
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditMode(false)}>Cancel</button>
            </>
          ) : (
            <>
              <h2>{groupDetails.name}</h2>
              <p>{groupDetails.description}</p>
              {groupDetails.user_id === user.id && (
                <>
                  <button onClick={() => setEditMode(true)}>Edit</button>
                  <button onClick={handleDelete}>Delete</button>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default GroupDetailsPage;
