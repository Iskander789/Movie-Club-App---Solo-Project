import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import './Nav.css';

function Nav() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <nav className="nav">
      <div className="nav-title">
        <Link to={user.id ? "/home" : "/landing"} className="navLink-title">
          Movie Club
        </Link>
      </div>
      {user.id && (
        <div className="nav-links-container">
          <ul>
            <li>
              <Link to="/home" className={`navLink ${location.pathname === '/home' ? 'active' : ''}`}>Home</Link>
            </li>
            <li>
              <Link to="/groups" className={`navLink ${location.pathname === '/groups' ? 'active' : ''}`}>Your Groups</Link>
            </li>
            <li>
              <Link to="/profile" className={`navLink ${location.pathname === '/profile' ? 'active' : ''}`}>Profile</Link>
            </li>
            <li>
              <Link to="/about" className={`navLink ${location.pathname === '/about' ? 'active' : ''}`}>About This App</Link>
            </li>
            <li>
              <Link to="/technologies-used" className={`navLink ${location.pathname === '/technologies-used' ? 'active' : ''}`}>Technologies Used</Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/login" className="navLink" onClick={handleLogout}>Log Out</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Nav;
