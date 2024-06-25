import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { FETCH_USER, CLEAR_REDIRECT } from '../../redux/actions/types';
import Nav from '../Nav/Nav';
import LandingRegistration from '../LandingRegistration/LandingRegistration';
import LoginPage from '../LoginPage/LoginPage';
import UserPage from '../UserPage/UserPage';
import GroupsPage from '../GroupsPage/GroupsPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.user.redirect);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.id) {
      console.log('Fetching user because user.id is null');
      dispatch({ type: FETCH_USER });
    }
  }, [dispatch, user.id]);

  useEffect(() => {
    if (redirect) {
      console.log('Redirecting to:', redirect);
      dispatch({ type: CLEAR_REDIRECT });
    }
  }, [redirect, dispatch]);

  if (!user.id && window.location.pathname !== '/login' && window.location.pathname !== '/') {
    console.log('User not logged in, redirecting to /login');
    return <Router><Redirect to="/login" /></Router>;
  }

  return (
    <Router>
      {redirect && <Redirect to={redirect} />}
      <Nav />
      <Switch>
        <Route exact path="/" component={LandingRegistration} />
        <Route exact path="/login" component={LoginPage} />
        <ProtectedRoute exact path="/home" component={UserPage} />
        <ProtectedRoute exact path="/groups" component={GroupsPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
