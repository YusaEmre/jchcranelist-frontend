import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
export const Navbar = () => {
  return (
    <div className="mb-5">
      <nav className="navbar container navbar-light navbar-expand">
        <ul className="navbar-nav float-left">
          <li>
            <Link to="/" className="navbar-brand">
              <img src={logo} alt="Logo" width="250" height="80" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
