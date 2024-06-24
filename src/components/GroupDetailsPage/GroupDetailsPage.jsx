import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchGroupDetails } from '../../redux/actions/groupActions';
import './GroupDetailsPage.css';

function GroupDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const groupDetails = useSelector((store) => store.group.groupDetails);

  useEffect(() => {
    dispatch(fetchGroupDetails(id));
  }, [dispatch, id]);

  if (!groupDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="group-details-container">
      <h2>{groupDetails.name}</h2>
      <p>{groupDetails.description}</p>
    </div>
  );
}

export default GroupDetailsPage;
