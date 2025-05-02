import './mocks/fileStorageMock.ts'
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
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('dob');
  });
});
