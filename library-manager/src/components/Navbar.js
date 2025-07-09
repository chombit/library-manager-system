// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './navbar.css'; // Update this line

const Navbar = () => {

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  }};

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="brand-link">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 8h12M6 16h12M6 12h12" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Library Manager
        </Link>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link 
            to="/books" 
            className={`nav-link ${isActive('/books') ? 'active' : ''}`}
          >
            Books
          </Link>
        </li>
      </ul>
      <div className="navbar-actions">
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;