import { User } from '@shared-types';

/**
 * Capitalizes the first letter of a string and lowercases the rest.
 *
 * @param str - The string to capitalize.
 * @returns The capitalized string.
 *
 * @example
 * capitalize("john"); // "John"
 * capitalize("DOE");  // "Doe"
 */
export const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

/**
 * Sorts an array of users alphabetically by their first name, then last name (case-insensitive).
 *
 * @param users - The array of users to sort.
 * @returns A new array of users sorted by name.
 *
 * @example
 * sortUsersByName([{ firstName: "bob", lastName: "Smith" }, { firstName: "alice", lastName: "Brown" }]);
 * // [{ firstName: "alice", lastName: "Brown" }, { firstName: "bob", lastName: "Smith" }]
 */
export const sortUsersByName = (users: User[]): User[] =>
  [...users].sort((a, b) => {
    const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
    const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
    return nameA.localeCompare(nameB);
  });
