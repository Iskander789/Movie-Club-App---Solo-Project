import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { FETCH_USER, CLEAR_REDIRECT } from '../../redux/actions/types';
import Nav from '../Nav/Nav';
import LandingRegistration from '../LandingRegistration/LandingRegistration';
import LoginPage from '../LoginPage/LoginPage';
import UserPage from '../UserPage/UserPage';
import GroupsPage from '../GroupsPage/GroupsPage';
import CreateGroupPage from '../CreateGroupPage/CreateGroupPage';
import GroupDetailsPage from '../GroupDetailsPage/GroupDetailsPage';
import AboutThisApp from '../AboutThisApp/AboutThisApp';
import TechnologiesUsed from '../TechnologiesUsed/TechnologiesUsed';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import UserProfile from '../UserProfile/UserProfile';

function App() {
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.redirect);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user.id) {
      dispatch({ type: FETCH_USER });
    } else {
      setLoading(false);
    }
  }, [dispatch, user.id]);

  useEffect(() => {
    if (redirect) {
      dispatch({ type: CLEAR_REDIRECT });
    }
  }, [redirect, dispatch]);

  if (loading) {
    return <div>Loading...</div>;
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
        <ProtectedRoute exact path="/groups/create" component={CreateGroupPage} />
        <ProtectedRoute exact path="/groups/:id" component={GroupDetailsPage} />
        <ProtectedRoute exact path="/about" component={AboutThisApp} />
        <ProtectedRoute exact path="/technologies-used" component={TechnologiesUsed} />
        <ProtectedRoute exact path="/profile" component={UserProfile} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
