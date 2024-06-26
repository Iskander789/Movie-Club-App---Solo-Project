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
      <div className="nav-title">
        <Link to={isLoggedIn ? "/home" : "/"} className="nav-title-link">
          Movie Club
        </Link>
      </div>
      {isLoggedIn && (
        <div className="nav-links-container">
          <ul>
            {location.pathname !== '/home' && (
              <li>
                <Link to="/home" className={`navLink ${location.pathname === '/home' ? 'active' : ''}`}>
                  Home
                </Link>
              </li>
            )}
            {location.pathname !== '/groups' && (
              <li>
                <Link to="/groups" className={`navLink ${location.pathname === '/groups' ? 'active' : ''}`}>
                  Groups
                </Link>
              </li>
            )}
            {location.pathname !== '/profile' && (
              <li>
                <Link to="/profile" className={`navLink ${location.pathname === '/profile' ? 'active' : ''}`}>
                  Profile
                </Link>
              </li>
            )}
            {location.pathname !== '/about' && (
              <li>
                <Link to="/about" className={`navLink ${location.pathname === '/about' ? 'active' : ''}`}>
                  About This App
                </Link>
              </li>
            )}
            {location.pathname !== '/technologies-used' && (
              <li>
                <Link to="/technologies-used" className={`navLink ${location.pathname === '/technologies-used' ? 'active' : ''}`}>
                  Technologies Used
                </Link>
              </li>
            )}
          </ul>
          <ul>
            <li>
              <Link to="/login" className="navLink" onClick={handleLogout}>
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Nav;
