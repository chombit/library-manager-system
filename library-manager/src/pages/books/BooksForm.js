// src/pages/books/BookForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/books.css';

const BookForm = ({ book = null }) => {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    isbn: book?.isbn || '',
    genre: book?.genre || '',
    availableCopies: book?.availableCopies || 1,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (book) {
        await axios.put(`http://localhost:3000/api/books/${book.id}`, formData);
      } else {
        await axios.post('http://localhost:3000/api/books', formData);
      }
      window.location.href = '/books';
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="book-form-container">
      <h1>{book ? 'Edit Book' : 'Add New Book'}</h1>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="book-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>ISBN</label>
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Available Copies</label>
          <input
            type="number"
            name="availableCopies"
            value={formData.availableCopies}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : (book ? 'Update Book' : 'Add Book')}
          </button>
          <button 
            type="button" 
            onClick={() => window.location.href = '/books'}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;