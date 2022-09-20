import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import crane from '../images/crane.png';

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
          </ul>
        ) : (
          <ul className="navbar-nav ms-auto">
            <li>
              <Link to="/register" className="nav-link">
                <i className="bi bi-person-plus"></i> Create User
              </Link>
            </li>
            <li>
              <Link to="/addVehicle" className="nav-link">
                <img src={crane} alt="Logo" width="20" height="16" /> Create
                Vehicle
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.removeItem('token');
                  setToken(null);
                  window.location.reload();
                }}
                className="nav-link"
              >
                <i className="bi bi-door-closed"></i> Logout
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};
