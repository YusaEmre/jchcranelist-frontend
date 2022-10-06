import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import crane from '../images/crane.png';
import logo from '../images/logo.png';
import axios from 'axios';


export const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));


  const handleLogut = async (e) => {
    try {
      const resp = await axios.post('http://localhost:8080/api/user/logout?userEmail='+localStorage.getItem('user'));
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      window.location.replace('/');
    } catch (error) {
      console.log(error);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      //localStorage.removeItem('user');
      //window.location.replace('/');
    }
  };

  return (
    <div className="navbar-background">
      <nav className="navbar navbar-expand-lg  navbar-dark back m-0 ms-4">
        <li>
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </Link>
        </li>
        <button
          class="navbar-toggler me-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          {token === null ? (
            <ul className="navbar-nav ms-auto me-4 flex-row">
              <li>
                <Link to="/login" className="nav-link">
                  Sign In
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto me-4 flex-row">
              <li>
                <Link to="/register" className="nav-link me-2">
                  <i className="bi bi-person-plus"></i> Create User
                </Link>
              </li>
              <li>
                <Link to="/addVehicle" className="nav-link me-2">
                  <img src={crane} alt="Logo" width="20" height="16" /> Create
                  Vehicle
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  onClick={(e) => handleLogut(e)}
                  className="nav-link"
                >
                  <i className="bi bi-door-closed"></i> Logout
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </div>
  );
};
