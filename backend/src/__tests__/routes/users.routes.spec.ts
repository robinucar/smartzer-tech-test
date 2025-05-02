import request from 'supertest';
import express from 'express';
import usersRouter from '../../routes/users.routes';

describe('users.routes', () => {
  const app = express();
  app.use(express.json()); //parse JSON request bodies
  app.use('/api/users', usersRouter);

  it('POST /api/users with valid payload returns 201 and user object', async () => {
    const newUser = { id: 2, name: 'Alice', dob: '1992-05-14' };
    const res = await request(app).post('/api/users').send(newUser); // valid User object
    expect(res.status).toBe(201);
    expect(res.body).toEqual(newUser);
  });

  it('GET /api/users should return list of users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('dob');
  });

  it('POST /api/users with invalid payload returns 400', async () => {
    const res = await request(app).post('/api/users').send({ name: 123 }); // invalid id
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
