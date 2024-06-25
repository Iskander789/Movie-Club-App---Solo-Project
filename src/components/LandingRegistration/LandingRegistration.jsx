import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import './LandingRegistration.css';

function LandingRegistration() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  useEffect(() => {
    if (user.id) {
      history.push('/home');
    }
  }, [user.id, history]);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to Movie Club</h1>
        <p>Welcome to Movie Club, the place where movie enthusiasts come together to share their passion for films.</p>
        <p>Create an account, join up to four different clubs, and start discussing your favorite movies today!</p>
        <p>Features include:</p>
        <ul>
          <li>Joining multiple movie clubs</li>
          <li>Participating in discussions</li>
          <li>Rating and reviewing movies</li>
          <li>Getting recommendations based on your interests</li>
        </ul>
        <center>
          <button
            type="button"
            className="btn_asLink"
            onClick={() => {
              history.push('/login');
            }}
          >
            Already a user? Login here
          </button>
        </center>
      </div>
      <div className="register-formPanel">
        <RegisterForm />
      </div>
    </div>
  );
}

export default LandingRegistration;
