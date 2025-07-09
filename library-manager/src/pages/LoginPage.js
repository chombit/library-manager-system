import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Add this state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' }}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="6" y="8" width="36" height="32" rx="6" fill="#6366f1"/>
            <rect x="12" y="16" width="24" height="4" rx="2" fill="#fff"/>
            <rect x="12" y="24" width="16" height="4" rx="2" fill="#c7d2fe"/>
            <rect x="12" y="32" width="10" height="4" rx="2" fill="#c7d2fe"/>
          </svg>
        </div>
        <h2>Library Manager </h2>
        {error && <p className="error">{error}</p>}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group" style={{ position: 'relative' }}>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ paddingRight: '2.5rem' }}
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              // Eye-off SVG
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M17.94 17.94C16.13 19.25 14.13 20 12 20C7 20 2.73 16.11 1 12C1.73 10.13 2.97 8.47 4.56 7.19M9.53 9.53C9.19 9.97 9 10.47 9 11C9 12.1 9.9 13 11 13C11.53 13 12.03 12.81 12.47 12.47M14.47 14.47C14.81 14.03 15 13.53 15 13C15 11.9 14.1 11 13 11C12.47 11 11.97 11.19 11.53 11.53M12 4C16.97 4 21.27 7.89 23 12C22.27 13.87 21.03 15.53 19.44 16.81M1 1L23 23" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              // Eye SVG
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M1 12C2.73 16.11 7 20 12 20C17 20 21.27 16.11 23 12C21.27 7.89 17 4 12 4C7 4 2.73 7.89 1 12Z" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </span>
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginPage;
