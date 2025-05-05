/// <reference types="jest" />
import { User } from '@shared-types';

export const userWithBio: User = {
  id: 2,
  firstName: 'Alice',
  lastName: 'Smith',
  email: 'alice@example.com',
  dob: '1992-05-14',
  imageUrl: 'https://picsum.photos/200',
  acceptedTerms: true,
  bio: 'Loves coding',
};

export const userWithoutBio: Omit<User, 'bio'> = {
  id: 3,
  firstName: 'NoBio',
  lastName: 'User',
  email: 'nobio@example.com',
  dob: '1990-01-01',
  imageUrl: 'https://picsum.photos/200',
  acceptedTerms: true,
};
