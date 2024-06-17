import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);
  const location = useLocation();

  return (
    <div className="nav">
      <Link to={user.id ? "/home" : "/landing"}>
        <h2 className="nav-title">Movie Club</h2>
      </Link>
      <div>
        {!user.id && (
          <>
            <Link className="navLink" to="/login">
              Login / Register
            </Link>
          </>
        )}
        {user.id && (
          <>
            {location.pathname !== '/home' && (
              <Link className="navLink" to="/home">
                Home
              </Link>
            )}
            <Link className="navLink" to="/info">
              Info Page
            </Link>
            <Link className="navLink" to="/about">
              About
            </Link>
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
