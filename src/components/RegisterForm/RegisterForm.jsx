import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REGISTER } from '../../redux/actions/types';
import './RegisterForm.css';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errors = useSelector((store) => store.errors);

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: REGISTER,
      payload: {
        username: username,
        password: password,
      },
    });

    // Clear input fields after submission
    setUsername('');
    setPassword('');
  };

  return (
    <div className="register-form-container">
      <form className="formPanel" onSubmit={registerUser} autoComplete="off">
        <h2>Register User</h2>
        {errors.registrationMessage && (
          <h3 className="alert" role="alert">
            {errors.registrationMessage}
          </h3>
        )}
        <div className="form-group">
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
        <div className="form-group">
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
        <div className="form-group">
          <input className="btn" type="submit" name="submit" value="Register" />
        </div>
        <div className="form-group">
          <button
            type="button"
            className="btn_asLink"
            onClick={() => history.push('/login')}
          >
            Already a Member? Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
