import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    fetch('/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, publishedDate }),
    })
      .then(response => response.json())
      .then(() => navigate('/'))
      .catch(error => console.error('Error adding book:', error));
  };

  return (
    <div>
      <h1>Add a New Book</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <br />
        <label>
          Author:
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
        </label>
        <br />
        <label>
          Published Date:
          <input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
