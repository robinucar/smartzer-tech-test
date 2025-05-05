import {
  mockUsers,
  resetMockUsers,
  mockWriteUsers,
} from '../mocks/fileStorageMock';
import { userWithBio, userWithoutBio } from '../mocks/userMocks';
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
      const res = await request(app).post('/api/users').send(userWithBio);
      expect(res.status).toBe(201);
      expect(res.body).toEqual(userWithBio);
    });

    it('should create a user even if bio is missing', async () => {
      const res = await request(app).post('/api/users').send(userWithoutBio);
      expect(res.status).toBe(201);

      expect(res.body).toMatchObject({
        ...userWithoutBio,
        id: expect.any(Number),
      });
    });

    it('should return 400 on invalid payload', async () => {
      const res = await request(app).post('/api/users').send({ name: 123 });
      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty('error');
    });

    it('should return 400 if email already exists', async () => {
      await request(app).post('/api/users').send(userWithBio);

      const duplicateEmailUser = { ...userWithBio, id: 999 };
      const res = await request(app)
        .post('/api/users')
        .send(duplicateEmailUser);

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Email already exists' });
    });
  });

  describe('GET /api/users', () => {
    it('should return list of users with all required fields', async () => {
      const res = await request(app).get('/api/users');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);

      const user: User = res.body[0];
      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('firstName');
      expect(user).toHaveProperty('lastName');
      expect(user).toHaveProperty('email');
      expect(user).toHaveProperty('dob');
      expect(user).toHaveProperty('imageUrl');
      expect(user).toHaveProperty('acceptedTerms');
      expect(user).toHaveProperty('bio');
    });
    it('should return user without bio if not provided', async () => {
      const newUser: Omit<User, 'bio'> = {
        id: 99,
        firstName: 'No',
        lastName: 'Bio',
        email: 'nobio@get.com',
        dob: '1995-05-05',
        imageUrl: 'https://picsum.photos/200',
        acceptedTerms: true,
      };

      const postRes = await request(app).post('/api/users').send(newUser);
      expect(postRes.status).toBe(201);

      const createdUser = postRes.body;
      const createdId = createdUser.id;
      expect(createdId).toBeDefined();

      const res = await request(app).get('/api/users');
      expect(res.status).toBe(200);

      const found = res.body.find((u: User) => u.id === createdId);
      expect(found).toBeDefined();

      if (found) {
        expect(Object.prototype.hasOwnProperty.call(found, 'bio')).toBe(false);
      }
    });

    it('should return 500 if readUsers throws an error', async () => {
      const { mockReadUsers } = require('../mocks/fileStorageMock');
      mockReadUsers.mockRejectedValueOnce(new Error('Read failure'));

      const res = await request(app).get('/api/users');
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to read users' });
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
    const updatedBioUser = {
      firstName: 'Updated',
      lastName: 'User',
      email: 'updated@example.com',
      dob: '1991-04-12',
      imageUrl: 'https://picsum.photos/200',
      acceptedTerms: true,
      bio: 'Updated bio',
    };

    it('should update user and return 200 for valid input', async () => {
      const res = await request(app).put('/api/users/1').send(updatedBioUser);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, ...updatedBioUser });
    });

    it('should update user and add bio if missing', async () => {
      const user = { ...updatedBioUser, bio: 'New bio added' };
      const res = await request(app).put('/api/users/1').send(user);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, ...user });
    });

    it('should update user and remove bio when set to undefined', async () => {
      const user = { ...updatedBioUser, bio: undefined };
      const res = await request(app).put('/api/users/1').send(user);
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: 1, ...user });
    });
    it('should return 400 if updated email already exists on another user', async () => {
      const user1 = {
        firstName: 'Alice',
        lastName: 'Smith',
        email: 'alice@example.com',
        dob: '1992-05-14',
        imageUrl: 'https://picsum.photos/200',
        acceptedTerms: true,
        bio: 'Loves coding',
      };

      const user2 = {
        firstName: 'Bob',
        lastName: 'Jones',
        email: 'bob@example.com',
        dob: '1993-07-01',
        imageUrl: 'https://picsum.photos/200',
        acceptedTerms: true,
        bio: 'Another user',
      };

      await request(app).post('/api/users').send(user1);
      const res2 = await request(app).post('/api/users').send(user2);
      const user2Id = res2.body.id;

      const res = await request(app)
        .put(`/api/users/${user2Id}`)
        .send({
          ...user2,
          email: 'alice@example.com',
        });

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Email already exists' });
    });

    it('should return 400 for invalid user ID', async () => {
      const res = await request(app)
        .put('/api/users/invalid')
        .send(updatedBioUser);
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid user ID' });
    });

    it('should return 400 for invalid payload', async () => {
      const res = await request(app).put('/api/users/1').send({ name: 123 });
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ error: 'Invalid user payload' });
    });

    it('should return 404 if user is not found', async () => {
      const res = await request(app).put('/api/users/999').send(updatedBioUser);
      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: 'User not found' });
    });

    it('should return 500 if an exception is thrown', async () => {
      mockWriteUsers.mockRejectedValueOnce(new Error('Disk full'));

      const res = await request(app).put('/api/users/1').send(updatedBioUser);
      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: 'Failed to update user' });
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
