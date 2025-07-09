// src/pages/books/BooksList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/books.css';
import { useNavigate } from 'react-router-dom';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/books');
      setBooks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;

    try {
      await axios.delete(`http://localhost:3000/api/books/${id}`);
      fetchBooks();
    } catch (err) {
      setError('Failed to delete book');
    }
  };

  const handleEdit = (id) => {
    navigate(`/books/edit/${id}`);
  };

  const handleAdd = () => {
    navigate('/books/add');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="books-container">
      <div className="page-header">
        <h1>Books Management</h1>
        <button className="action-button" onClick={handleAdd}>
          Add New Book
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <div className="book-info">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>ISBN:</strong> {book.isbn}</p>
              <p><strong>Genre:</strong> {book.genre}</p>
              <p><strong>Available Copies:</strong> {book.availableCopies}</p>
            </div>
            <div className="book-actions">
              <button 
                className="edit-button" 
                onClick={() => handleEdit(book.id)}
              >
                Edit
              </button>
              <button 
                className="delete-button" 
                onClick={() => handleDelete(book.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksList;