import { User } from '@shared-types';

/**
 * Capitalizes the first letter of each word in the string.
 *
 * @param str - The name string (can include middle names).
 * @returns The capitalised string.
 *
 * @example
 * capitalize("john");             // "John"
 * capitalize("DOE");              // "Doe"
 * capitalize("mary anne smith");  // "Mary Anne Smith"
 */
export const capitalize = (str: string): string =>
  str
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

/**
 * Sorts an array of users alphabetically by full name.
 *
 * The sort is case-insensitive and uses the combination of
 * `firstName` and `lastName` for each user.
 *
 * @param users - The array of User objects to sort.
 * @returns A new array of User objects sorted by full name (firstName + lastName).
 */
export const sortUsersByName = (users: User[]): User[] =>
  [...users].sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
    return nameA.localeCompare(nameB);
  });
