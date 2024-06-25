import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { FETCH_USER, CLEAR_REDIRECT } from '../../redux/actions/types';
import Nav from '../Nav/Nav'; // Ensure Nav is imported
import LandingRegistration from '../LandingRegistration/LandingRegistration';
import LoginPage from '../LoginPage/LoginPage';
import UserPage from '../UserPage/UserPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'; // Ensure ProtectedRoute is imported

function App() {
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.user.redirect);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({ type: FETCH_USER });
  }, [dispatch]);

  useEffect(() => {
    if (redirect) {
      dispatch({ type: CLEAR_REDIRECT });
    }
  }, [redirect, dispatch]);

  return (
    <Router>
      {redirect && <Redirect to={redirect} />}
      <Nav /> {/* Ensure Nav is included */}
      <Switch>
        <Route exact path="/" component={LandingRegistration} />
        <Route exact path="/login" component={LoginPage} />
        <ProtectedRoute exact path="/home" component={UserPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
