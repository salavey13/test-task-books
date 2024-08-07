import React, { useEffect, useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  publicationDate: string;
  genres: string[];
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('/api/books')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            {book.title} by {book.author} ({book.publicationDate})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
