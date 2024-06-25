import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { REGISTER } from '../../redux/actions/types';
import './RegisterForm.css';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const registrationMessage = useSelector((store) => store.errors.registrationMessage);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: REGISTER, payload: { username, password } });
  };

  return (
    <form className="formPanel" onSubmit={handleSubmit}>
      <h2>Register</h2>
      {registrationMessage && (
        <h3 className="alert" role="alert">
          {registrationMessage}
        </h3>
      )}
      <div>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <input className="btn" type="submit" name="submit" value="Register" />
      </div>
    </form>
  );
}

export default RegisterForm;
