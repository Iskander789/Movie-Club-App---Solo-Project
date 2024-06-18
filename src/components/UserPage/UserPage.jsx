import React from 'react';
import { useSelector } from 'react-redux';
import './UserPage.css';

function UserPage() {
  const user = useSelector((store) => store.user);

  return (
    <div className="container">
      <h1>Welcome, {user.username}!</h1>
      <p>This is your home page. You can navigate to different sections using the navigation bar above.</p>
    </div>
  );
}

export default UserPage;
