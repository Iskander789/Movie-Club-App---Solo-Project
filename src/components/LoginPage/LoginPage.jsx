import React from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

function LoginPage() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  if (user.id) {
    return <Redirect to="/user" />;
  }

  return (
    <div>
      <LoginForm />
      <center>
        <button
          type="button"
          className="btn btn_asLink"
          onClick={() => {
            history.push('/registration');
          }}
        >
          Register
        </button>
      </center>
    </div>
  );
}

export default LoginPage;
