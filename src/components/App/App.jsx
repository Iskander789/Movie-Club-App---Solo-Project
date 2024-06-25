import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { FETCH_USER, CLEAR_REDIRECT } from '../../redux/actions/types';
import LandingRegistration from '../LandingRegistration/LandingRegistration';
import LoginPage from '../LoginPage/LoginPage';
import UserPage from '../UserPage/UserPage';

function App() {
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.redirect);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.username) {
      dispatch({ type: FETCH_USER });
    }
  }, [dispatch, user.username]);

  useEffect(() => {
    if (redirect) {
      dispatch({ type: CLEAR_REDIRECT });
    }
  }, [redirect, dispatch]);

  return (
    <Router>
      {redirect && <Redirect to={redirect} />}
      <Switch>
        <Route exact path="/" component={LandingRegistration} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/home" component={UserPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
