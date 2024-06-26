import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ProtectedRoute({ component: Component, ...rest }) {
  const user = useSelector((store) => store.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.id ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" /> // Redirect to landing page if not authenticated
        )
      }
    />
  );
}

export default ProtectedRoute;
