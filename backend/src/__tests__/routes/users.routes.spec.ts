import request from 'supertest';
import express from 'express';
import usersRouter from '../../routes/users.routes';

describe('users.routes', () => {
  const app = express();
  app.use('/api/users', usersRouter);

  it('GET /api/users should return list of users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
  });
});
