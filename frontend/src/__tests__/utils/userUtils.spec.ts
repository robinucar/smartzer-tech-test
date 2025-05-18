import { capitalize, sortUsersByName } from '../../utils/__temp__';
import { User } from '@shared-types';

describe('capitalize', () => {
  it('capitalizes lowercase strings', () => {
    expect(capitalize('john')).toBe('John');
  });

  it('capitalizes uppercase strings', () => {
    expect(capitalize('DOE')).toBe('Doe');
  });

  it('capitalizes mixed-case strings', () => {
    expect(capitalize('aLiCe')).toBe('Alice');
  });

  it('returns an empty string when input is empty', () => {
    expect(capitalize('')).toBe('');
  });
});

describe('sortUsersByName', () => {
  const users: User[] = [
    {
      id: 1,
      firstName: 'Bob',
      lastName: 'Smith',
      email: '',
      dob: '',
      imageUrl: '',
      acceptedTerms: true,
    },
    {
      id: 2,
      firstName: 'alice',
      lastName: 'Brown',
      email: '',
      dob: '',
      imageUrl: '',
      acceptedTerms: true,
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Anderson',
      email: '',
      dob: '',
      imageUrl: '',
      acceptedTerms: true,
    },
  ];

  it('sorts users by first name then last name alphabetically (case-insensitive)', () => {
    const sorted = sortUsersByName(users);
    expect(sorted.map((u: User) => `${u.firstName} ${u.lastName}`)).toEqual([
      'Alice Anderson',
      'alice Brown',
      'Bob Smith',
    ]);
  });

  it('does not mutate the original array', () => {
    const original = [...users];
    sortUsersByName(users);
    expect(users).toEqual(original);
  });

  it('returns an empty array when given an empty array', () => {
    expect(sortUsersByName([])).toEqual([]);
  });
});
