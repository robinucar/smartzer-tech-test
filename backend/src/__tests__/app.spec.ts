import request from 'supertest';
import app from '../app';

import { prisma } from '../__tests__/mocks/prismaMock';

jest.mock('../utils/prisma', () => ({
  prisma: require('../__tests__/mocks/prismaMock').prisma,
}));

describe('Express App', () => {
  beforeEach(() => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([
      {
        id: 1,
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        dob: '1990-01-01',
        imageUrl: 'https://picsum.photos/200',
        acceptedTerms: true,
        bio: 'Test user bio',
      },
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

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
