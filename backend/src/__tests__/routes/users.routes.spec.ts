import request from 'supertest';
import express from 'express';
import userRoutes from '../../routes/users.routes';
import { userWithBio, userWithoutBio } from '../mocks/userMocks';

import { prisma } from '../mocks/prismaMock';

jest.mock('../../utils/prisma', () => ({
  prisma: require('../mocks/prismaMock').prisma,
}));

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

describe('User Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/users', () => {
    it('should return paginated users and metadata', async () => {
      (prisma.user.findMany as jest.Mock).mockResolvedValue([
        userWithBio,
        userWithoutBio,
      ]);
      (prisma.user.count as jest.Mock).mockResolvedValue(2);

      const res = await request(app).get('/api/users?page=1&limit=2&q=john');

      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({
        users: expect.any(Array),
        total: 2,
        page: 1,
        totalPages: 1,
        q: 'john',
      });

      expect(res.body.users).toHaveLength(2);
      expect(prisma.user.findMany).toHaveBeenCalled();
      expect(prisma.user.count).toHaveBeenCalled();
    });
  });

  describe('POST /api/users', () => {
    it('should create user with bio', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue(userWithBio);

      const res = await request(app).post('/api/users').send(userWithBio);

      expect(res.status).toBe(201);
      expect(res.body.bio).toBe('Loves coding');
      expect(prisma.user.create).toHaveBeenCalled();
    });

    it('should create user without bio', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue(userWithoutBio);

      const res = await request(app).post('/api/users').send(userWithoutBio);

      expect(res.status).toBe(201);
      expect(res.body.bio).toBeUndefined();
      expect(prisma.user.create).toHaveBeenCalled();
    });

    it('should reject duplicate email', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithBio);

      const res = await request(app).post('/api/users').send(userWithBio);

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/email already exists/i);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user by ID', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithBio);

      const res = await request(app).get('/api/users/2');

      expect(res.status).toBe(200);
      expect(res.body.email).toBe(userWithBio.email);
    });

    it('should return 404 if not found', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const res = await request(app).get('/api/users/999');

      expect(res.status).toBe(404);
      expect(res.body.error).toMatch(/not found/i);
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update user', async () => {
      (prisma.user.findUnique as jest.Mock).mockImplementation(({ where }) => {
        if (where.id === 2) return Promise.resolve(userWithBio);
        if (where.email === userWithBio.email)
          return Promise.resolve(userWithBio);
        return Promise.resolve(null);
      });

      (prisma.user.update as jest.Mock).mockResolvedValue({
        ...userWithBio,
        firstName: 'Updated',
      });

      const res = await request(app)
        .put('/api/users/2')
        .send({ ...userWithBio, firstName: 'Updated' });

      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe('Updated');
    });

    it('should return 404 for missing user', async () => {
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

      const res = await request(app).put('/api/users/999').send(userWithBio);

      expect(res.status).toBe(404);
      expect(res.body.error).toMatch(/not found/i);
    });

    it('should reject if email already used by another user', async () => {
      (prisma.user.findUnique as jest.Mock).mockImplementation(({ where }) => {
        if (where.id === 2) return Promise.resolve(userWithBio);
        if (where.email === userWithBio.email)
          return Promise.resolve({ id: 999 });
        return Promise.resolve(null);
      });

      const res = await request(app).put('/api/users/2').send(userWithBio);

      expect(res.status).toBe(400);
      expect(res.body.error).toMatch(/email already exists/i);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete user', async () => {
      (prisma.user.delete as jest.Mock).mockResolvedValue({});

      const res = await request(app).delete('/api/users/2');

      expect(res.status).toBe(204);
    });
  });
});
