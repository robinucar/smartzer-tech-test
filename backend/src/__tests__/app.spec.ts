import './mocks/fileStorageMock.js';
import request from 'supertest';
import app from '../app';

describe('Express App', () => {
  it('GET /api should return welcome message', async () => {
    const res = await request(app).get('/api');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Welcome to backend!' });
  });

  it('GET /health should return status OK', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'OK' });
  });
  it('GET /api/users should return array of users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);

    const user = res.body[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('firstName');
    expect(user).toHaveProperty('lastName');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('dob');
    expect(user).toHaveProperty('imageUrl');
    expect(user).toHaveProperty('acceptedTerms');

    if ('bio' in user) {
      expect(typeof user.bio).toBe('string');
    }
  });
});
