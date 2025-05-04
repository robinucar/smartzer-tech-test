import { mockUsers, resetMockUsers } from '../mocks/fileStorageMock';
import request from 'supertest';
import express from 'express';
import usersRouter from '../../routes/users.routes';
import { User } from '../../types/types';

const app = express();
app.use(express.json());
app.use('/api/users', usersRouter);

describe('users.routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    resetMockUsers();
  });

  describe('POST /api/users', () => {
    it('should return 201 and created user on valid payload', async () => {
      const newUser: User = { id: 2, name: 'Alice', dob: '1992-05-14' };
      const res = await request(app).post('/api/users').send(newUser);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(newUser);
    });

    it('should return 400 on invalid payload', async () => {
      const res = await request(app).post('/api/users').send({ name: 123 });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('GET /api/users', () => {
    it('should return list of users', async () => {
      const res = await request(app).get('/api/users');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0]).toHaveProperty('id');
      expect(res.body[0]).toHaveProperty('name');
      expect(res.body[0]).toHaveProperty('dob');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user when ID exists', async () => {
      const res = await request(app).get('/api/users/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockUsers[0]);
    });

    it('should return 404 when user not found', async () => {
      const res = await request(app).get('/api/users/990');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'User not found' });
    });

    it('should return 400 for invalid user ID', async () => {
      const res = await request(app).get('/api/users/apc');
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid user ID' });
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update user and return 200 for valid input', async () => {
      const updatedUser = { name: 'Updated Name', dob: '1991-04-12' };
      const res = await request(app).put('/api/users/1').send(updatedUser);

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, ...updatedUser });
    });

    it('should return 400 for invalid user ID', async () => {
      const res = await request(app)
        .put('/api/users/invalid')
        .send({ name: 'Test', dob: '1990-01-01' });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid user ID' });
    });

    it('should return 400 for invalid payload', async () => {
      const res = await request(app).put('/api/users/1').send({ name: 123 });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid user payload' });
    });

    it('should return 404 if user is not found', async () => {
      const res = await request(app)
        .put('/api/users/999')
        .send({ name: 'Ghost', dob: '1992-01-01' });

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'User not found' });
    });

    it('should return 500 if an exception is thrown', async () => {
      const { mockWriteUsers } = require('../mocks/fileStorageMock');
      mockWriteUsers.mockRejectedValueOnce(new Error('Disk full'));

      const res = await request(app)
        .put('/api/users/1')
        .send({ name: 'Error', dob: '1990-01-01' });

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to update user.' });
    });
  });
  describe('DELETE /api/users/:id', () => {
    it('should delete user and return 204', async () => {
      const res = await request(app).delete('/api/users/1');
      expect(res.status).toBe(204);
    });

    it('should return 404 if user not found', async () => {
      const res = await request(app).delete('/api/users/990');
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'User not found' });
    });

    it('should return 400 for invalid ID', async () => {
      const res = await request(app).delete('/api/users/abc');
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid user ID' });
    });
  });
});
