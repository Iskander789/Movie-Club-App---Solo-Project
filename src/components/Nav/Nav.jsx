import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

function Nav() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const isLoggedIn = Boolean(user.id);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav className="nav">
      <div className="nav-title">Movie Club</div>
      <div className="nav-links-container">
        <ul>
          {isLoggedIn && location.pathname !== '/home' && (
            <li>
              <Link to="/home" className="navLink">Home</Link>
            </li>
          )}
          {isLoggedIn && location.pathname !== '/info' && (
            <li>
              <Link to="/info" className="navLink">Info Page</Link>
            </li>
          )}
          {isLoggedIn && location.pathname !== '/about' && (
            <li>
              <Link to="/about" className="navLink">About</Link>
            </li>
          )}
          {isLoggedIn && location.pathname !== '/profile' && (
            <li>
              <Link to="/profile" className="navLink">Profile</Link>
            </li>
          )}
          {isLoggedIn && location.pathname !== '/groups' && (
            <li>
              <Link to="/groups" className="navLink">Your Groups</Link>
            </li>
          )}
        </ul>
        <ul>
          {isLoggedIn ? (
            <li>
              <Link to="/login" className="navLink" onClick={handleLogout}>Log Out</Link>
            </li>
          ) : (
            location.pathname !== '/login' && (
              <li>
                <Link to="/login" className="navLink">Login</Link>
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
