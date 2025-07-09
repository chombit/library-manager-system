// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import BooksList from './pages/books/BooksList';
import BooksForm from './pages/books/BooksForm';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoute />} >
            <Route path="/" element={
              <div className="content-area">
                <Navbar />
                <Dashboard />
              </div>
            } />
            <Route path="/books" element={
              <div className="content-area">
                <Navbar />
                <BooksList />
              </div>
            } />
            <Route path="/books/add" element={
              <div className="content-area">
                <Navbar />
                <BooksForm />
              </div>
            } />
            <Route path="/books/edit/:id" element={
              <div className="content-area">
                <Navbar />
                <BooksForm />
              </div>
            } />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;