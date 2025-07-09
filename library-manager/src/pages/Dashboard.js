// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalMembers: 0,
    activeBorrows: 0,
    overdueBooks: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Books</h3>
          <p>{stats.totalBooks}</p>
        </div>
        <div className="stat-card">
          <h3>Total Members</h3>
          <p>{stats.totalMembers}</p>
        </div>
        <div className="stat-card">
          <h3>Active Borrows</h3>
          <p>{stats.activeBorrows}</p>
        </div>
        <div className="stat-card">
          <h3>Overdue Books</h3>
          <p>{stats.overdueBooks}</p>
        </div>
      </div>
      <div className="quick-actions">
        <button className="action-button">
          <span>Add New Book</span>
        </button>
        <button className="action-button">
          <span>Add New Member</span>
        </button>
        <button className="action-button">
          <span>Process Borrowing</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;