import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { REGISTER } from '../../redux/actions/types';
import './LandingRegistration.css';

function LandingRegistration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errors = useSelector((store) => store.errors);
  const history = useHistory();

  const registerUser = (event) => {
    event.preventDefault();
    dispatch({
      type: REGISTER,
      payload: {
        username,
        password,
      },
      callback: () => history.push('/login')  // Navigate to login after successful registration
    });
  };

  useEffect(() => {
    setUsername('');
    setPassword('');
  }, []);

  return (
    <div className="landing-container">
      <div className="formPanel">
        <h2>Register User</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <form onSubmit={registerUser}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              required
              onChange={(event) => setUsername(event.target.value)}
              autoComplete="new-username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              required
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <input className="btn" type="submit" name="submit" value="Register" />
          </div>
        </form>
        <div className="login-section">
          <p>Already a Member?</p>
          <button type="button" className="btn_asLink" onClick={() => history.push('/login')}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingRegistration;
