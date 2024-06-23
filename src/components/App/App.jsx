import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutThisApp from '../AboutThisApp/AboutThisApp';
import TechnologiesUsed from '../TechnologiesUsed/TechnologiesUsed';
import UserPage from '../UserPage/UserPage';
import LandingRegistration from '../LandingRegistration/LandingRegistration';
import LoginPage from '../LoginPage/LoginPage';
import UserProfile from '../UserProfile/UserProfile';
import GroupsPage from '../GroupsPage/GroupsPage';
import CreateGroupPage from '../CreateGroupPage/CreateGroupPage';

import '../../global.css';  // Corrected path to global.css

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const redirect = useSelector((store) => store.redirect);
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  useEffect(() => {
    if (redirect) {
      history.push(redirect);
      dispatch({ type: 'CLEAR_REDIRECT' });
    }
  }, [redirect, history, dispatch]);

  return (
    <div>
      <Nav />
      <Switch>
        <Redirect exact from="/" to={user.id ? '/home' : '/landing'} />
        <ProtectedRoute exact path="/about">
          <AboutThisApp />
        </ProtectedRoute>
        <ProtectedRoute exact path="/technologies-used">
          <TechnologiesUsed />
        </ProtectedRoute>
        <ProtectedRoute exact path="/home">
          <UserPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/groups">
          <GroupsPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/groups/new">
          <CreateGroupPage />
        </ProtectedRoute>
        <Route exact path="/login">
          {user.id ? <Redirect to="/home" /> : <LoginPage />}
        </Route>
        <Route exact path="/landing">
          {user.id ? <Redirect to="/home" /> : <LandingRegistration />}
        </Route>
        <ProtectedRoute exact path="/profile">
          <UserProfile />
        </ProtectedRoute>
        <Route>
          <h1>404</h1>
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
