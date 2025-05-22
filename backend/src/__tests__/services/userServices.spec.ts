/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../services/userServices';

import { prisma } from '../mocks/prismaMock';
import { userWithBio, userWithoutBio } from '../mocks/userMocks';

jest.mock('../../utils/prisma', () => ({
  prisma: require('../mocks/prismaMock').prisma,
}));

describe('userServices', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getAllUsers should return all users', async () => {
    (prisma.user.findMany as jest.Mock).mockResolvedValue([
      userWithBio,
      userWithoutBio,
    ]);
    const result = await getAllUsers();
    expect(prisma.user.findMany).toHaveBeenCalled();
    expect(result).toEqual([userWithBio, userWithoutBio]);
  });

  it('getUserById should return a specific user', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(userWithBio);
    const result = await getUserById(userWithBio.id);
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: userWithBio.id },
    });
    expect(result).toEqual(userWithBio);
  });

  it('createUser should create and return the new user', async () => {
    (prisma.user.create as jest.Mock).mockResolvedValue(userWithoutBio);
    const result = await createUser(userWithoutBio as any);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: userWithoutBio,
    });
    expect(result).toEqual(userWithoutBio);
  });

  it('updateUser should update and return the user', async () => {
    const updated = { ...userWithBio, firstName: 'Updated' };
    (prisma.user.update as jest.Mock).mockResolvedValue(updated);
    const result = await updateUser(userWithBio.id, {
      firstName: 'Updated',
    } as any);
    expect(prisma.user.update).toHaveBeenCalledWith({
      where: { id: userWithBio.id },
      data: { firstName: 'Updated' },
    });
    expect(result.firstName).toBe('Updated');
  });

  it('deleteUser should delete and return the user', async () => {
    (prisma.user.delete as jest.Mock).mockResolvedValue(userWithBio);
    const result = await deleteUser(userWithBio.id);
    expect(prisma.user.delete).toHaveBeenCalledWith({
      where: { id: userWithBio.id },
    });
    expect(result).toEqual(userWithBio);
  });
});
