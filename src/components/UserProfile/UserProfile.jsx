import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './UserProfile.css';

function UserProfile() {
  const user = useSelector((store) => store.user);
  const [profile, setProfile] = useState({
    username: '',
    email: '',
    group_name: '',
    profile_picture: ''
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get('/api/user/profile')
      .then(response => setProfile(response.data))
      .catch(error => console.log('Error fetching profile:', error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put('/api/user/profile', profile)
      .then(response => {
        console.log('Profile updated');
        setIsEditing(false);
      })
      .catch(error => console.log('Error updating profile:', error));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('profile_picture', file);

    axios.post('/api/user/profile_picture', formData)
      .then(response => setProfile({ ...profile, profile_picture: response.data.path }))
      .catch(error => console.log('Error uploading profile picture:', error));
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Fetch the profile again to reset any changes made in the form
    axios.get('/api/user/profile')
      .then(response => setProfile(response.data))
      .catch(error => console.log('Error fetching profile:', error));
  };

  return (
    <div className="container">
      <h2>User Profile</h2>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" name="username" value={profile.username} onChange={handleChange} />
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={profile.email} onChange={handleChange} />
          </div>
          <div>
            <label>Group Name:</label>
            <input type="text" name="group_name" value={profile.group_name} onChange={handleChange} />
          </div>
          <div>
            <label>Profile Picture:</label>
            <input type="file" onChange={handleFileChange} />
            {profile.profile_picture && <img src={`/${profile.profile_picture}`} alt="Profile" className="profile-picture" />}
          </div>
          <button type="submit">Submit Changes</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <div>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Group Name:</strong> {profile.group_name}</p>
          {profile.profile_picture && <img src={`/${profile.profile_picture}`} alt="Profile" className="profile-picture" />}
          <button onClick={() => setIsEditing(true)}>Update Profile</button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;
