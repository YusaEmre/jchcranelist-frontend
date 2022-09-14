import React, { useEffect, useState } from 'react'
import '../App.css';
import { Link } from 'react-router-dom';

export const UpNav = () => {
    return (
    <div className="back">
        <nav className="navbar container navbar-dark navbar-expand back">
          <ul className='navbar-nav ms-auto'>
            <li>
              <Link to="login" className='nav-link'>Login</Link>
            </li>
            <li>
              <Link to="register" className='nav-link'>Register</Link>
            </li>
          </ul>
        </nav>
      </div>
      )
    }
