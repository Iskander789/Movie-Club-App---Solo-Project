import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function UserPage() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  const handleLogout = () => {
    // Logic to log out the user
  };

  return (
    <div className="container">
      <h1>Welcome, {user.username}!</h1>
      {/* Remove the "Go to Profile" link from here */}
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}

export default UserPage;
