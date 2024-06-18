import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import './LoginPage.css';

function LoginPage() {
  const history = useHistory();
  const errors = useSelector((store) => store.errors);

  return (
    <div className="login-container">
      <div className="formPanel">
        <h2>Login</h2>
        {errors.loginMessage && (
          <h3 className="alert" role="alert">
            {errors.loginMessage}
          </h3>
        )}
        <LoginForm />
        <center>
          <button
            type="button"
            className="btn_asLink"
            onClick={() => {
              history.push('/landing');
            }}
          >
            Register
          </button>
        </center>
      </div>
    </div>
  );
}

export default LoginPage;
