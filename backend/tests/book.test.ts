// backend/tests/book.test.ts
import request from 'supertest';
import app from '../src/App';

describe('Book API', () => {
  const testTimeout = 10000; // 10 seconds

  it('should create a new book', async () => {
    const response = await request(app)
      .post('/books')
      .send({
        title: 'Test Book',
        author: 'Test Author',
        published_date: '2023-01-01' // Ensure this matches your database column name
      })
      .set('Authorization', `Bearer <your_admin_jwt_token>`);

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Book');
  }, testTimeout);

  it('should get all books', async () => {
    const response = await request(app)
      .get('/books')
      .set('Authorization', `Bearer <your_jwt_token>`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  }, testTimeout);

  it('should get a single book by ID', async () => {
    const bookId = 1; // replace with an actual book ID
    const response = await request(app)
      .get(`/books/${bookId}`)
      .set('Authorization', `Bearer <your_jwt_token>`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(bookId);
  }, testTimeout);

  it('should update a book', async () => {
    const bookId = 1; // replace with an actual book ID
    const response = await request(app)
      .put(`/books/${bookId}`)
      .send({
        title: 'Updated Title',
        author: 'Updated Author',
        published_date: '2024-01-01' // Ensure this matches your database column name
      })
      .set('Authorization', `Bearer <your_admin_jwt_token>`);

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Title');
  }, testTimeout);

  it('should delete a book', async () => {
    const bookId = 1; // replace with an actual book ID
    const response = await request(app)
      .delete(`/books/${bookId}`)
      .set('Authorization', `Bearer <your_admin_jwt_token>`);

    expect(response.statusCode).toBe(204);
  }, testTimeout);
});
