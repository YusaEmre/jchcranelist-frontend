import React, { useEffect, useState } from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import logo from '../icon/JCH-300x80.png'
export const Navbar = () => {

    return (
      <div className=''>
          <nav className="navbar container navbar-light navbar-expand">
            <ul className='navbar-nav float-left'>
              <li>
                <Link to="/" className='navbar-brand'><img src={logo} alt="Logo" width="250" height="80" /></Link>
              </li>
            </ul>
          </nav>
        </div>
    
    )
}