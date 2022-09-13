import React, { useEffect, useState } from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import logo from '../icon/JCH-300x80.png'
export const Navbar = () => {

    return (
    <div className="back">
      <nav className="navbar  navbar-dark navbar-expand">
        <ul className='navbar-nav float-left'>
            <li>
            <Link to="/" className='navbar-brand'><img src={logo} alt="Logo" width="200" height="60"/></Link>
            </li>
        </ul>
        <ul className='navbar-nav ms-auto'>
            <li>
            <Link to="login" className='nav-link'>Login</Link>
            </li>
        </ul>
      </nav>

    </div>
    )
}