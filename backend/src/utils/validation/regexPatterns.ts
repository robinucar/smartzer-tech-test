/**
 * Common regular expressions used for validating user input fields.
 */
export const patterns = {
  /**
   * Validates ISO 8601 date strings in the format YYYY-MM-DD.
   * Example: '2023-05-18' is valid; '18-05-2023' is not.
   */
  isoDate: /^\d{4}-\d{2}-\d{2}$/,

  /**
   * Validates a basic email structure.
   * Example: 'user@example.com' is valid.
   */
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
};
