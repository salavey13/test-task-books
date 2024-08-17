import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BookList: React.FC = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/api/books')
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book: any) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
      <Link to="/add-book">Add a new book</Link>
    </div>
  );
};

export default BookList;
