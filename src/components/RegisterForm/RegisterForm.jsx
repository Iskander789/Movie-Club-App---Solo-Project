import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REGISTER } from '../../redux/actions/types';
import './RegisterForm.css';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: REGISTER,
      payload: {
        username,
        password,
      },
    });

    // Clear input fields after submission
    setUsername('');
    setPassword('');
  };

  // Ensure inputs are not pre-populated on component mount
  useEffect(() => {
    setUsername('');
    setPassword('');
  }, []);

  return (
    <form className="register-form" onSubmit={registerUser} autoComplete="off" key="registerForm">
      <h2>Register User</h2>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="new-username"
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          required
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
