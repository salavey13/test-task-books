import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [book, setBook] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>Author: {book.author}</p>
      <p>Published Date: {book.published_date}</p>
    </div>
  );
};

export default BookDetails;
