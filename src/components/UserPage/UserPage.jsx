import React from 'react';
import { useSelector } from 'react-redux';

function UserPage() {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      {/* Other components and content */}
    </div>
  );
}

export default UserPage;
