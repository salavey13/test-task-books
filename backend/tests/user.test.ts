// backend/tests/user.test.ts
import request from 'supertest';
import app from '../src/App';

describe('User API', () => {
  const testTimeout = 10000; // 10 seconds

  // Replace with your actual tokens
  const userToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0dXNlciIsInJvbGUiOjAsImlhdCI6MTcyMzkwNTQ0OCwiZXhwIjoxNzIzOTA5MDQ4fQ.3YAO9aEsl8J4s84oFjD9gdL-W9ZKmmovak_mgNTikf4';
  const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0dXNlciIsInJvbGUiOjEsImlhdCI6MTcyMzkwNTQ0OCwiZXhwIjoxNzIzOTA5MDQ4fQ.6P_gzRrOUTEVhX0rU0xnFpsEbO_6eRCHlW0J4sceozg';

  it('should register a new user', async () => {
    const response = await request(app)
      .post('/users/register')
      .send({
        email: 'testuser@example.com',
        password: 'password123',
        telegram_id: '123456789',
        telegram_username: 'testuser'
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.email).toBe('testuser@example.com');
  }, testTimeout);

  it('should login a user', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  }, testTimeout);

  it('should get current user', async () => {
    const response = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('email', 'testuser@example.com');
  }, testTimeout);

  it('should change user role', async () => {
    const userId = 2; // Replace with an actual user ID
    const response = await request(app)
      .put(`/users/${userId}/role`)
      .send({
        role: 1 // Assuming 1 represents the admin role
      })
      .set('Authorization', `Bearer ${adminToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.role).toBe(1);
  }, testTimeout);

  it('should request to become an admin', async () => {
    const response = await request(app)
      .post('/users/become-admin')
      .set('Authorization', `Bearer ${userToken}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Admin confirmation sent');
  }, testTimeout);
});
