import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserPage() {
  const user = useSelector((store) => store.user);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <Link to="/profile">Go to Profile</Link>
      <LogOutButton className="btn" />
    </div>
  );
}

export default UserPage;
