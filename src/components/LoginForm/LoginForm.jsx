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
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  };

  return (
    <form onSubmit={login}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          required
          onChange={(event) => setUsername(event.target.value)}
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
        />
      </div>
      <div>
        <input type="submit" name="submit" value="Log In" />
      </div>
    </form>
  );
}

export default LoginForm;
