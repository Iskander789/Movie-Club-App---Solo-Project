import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOGIN } from '../../redux/actions/types';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const errors = useSelector((store) => store.errors);

  const login = (event) => {
    event.preventDefault();
    if (username && password) {
      dispatch({
        type: LOGIN,
        payload: {
          username,
          password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  };

  return (
    <form className="login-formPanel" onSubmit={login}>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
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
        />
      </div>
      <div className="form-group">
        <button type="submit" className="btn">Log In</button>
      </div>
    </form>
  );
}

export default LoginForm;
