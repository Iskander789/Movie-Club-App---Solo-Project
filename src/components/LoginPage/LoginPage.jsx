import React, { useEffect } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import { useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

function LoginPage() {
  const user = useSelector((store) => store.user);
  const history = useHistory();

  useEffect(() => {
    // Clear the form state when the component mounts
    document.querySelector('input[name="username"]').value = '';
    document.querySelector('input[name="password"]').value = '';
  }, []);

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
