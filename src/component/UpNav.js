import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

export const UpNav = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="back">
      <nav className="navbar container navbar-dark navbar-expand back">
        {token === null ? (
          <ul className="navbar-nav ms-auto">
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ms-auto">
            <li>
              <Link
                to="/"
                onClick={() => {
                  localStorage.removeItem('token');
                  setToken(null);
                }}
                className="nav-link"
              >
                Logout
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};
