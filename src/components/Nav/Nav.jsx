import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

function Nav() {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  const isLoggedIn = Boolean(user.id);

  return (
    <nav className="nav">
      <div className="nav-title">Movie Club</div>
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
        {!isLoggedIn && location.pathname !== '/' && (
          <li>
            <Link to="/" className="navLink">Landing</Link>
          </li>
        )}
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
        {isLoggedIn ? (
          <li>
            <Link to="/logout" className="navLink">Log Out</Link>
          </li>
        ) : (
          location.pathname !== '/login' && (
            <li>
              <Link to="/login" className="navLink">Login</Link>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}

export default Nav;
