/**
 * Parses the user ID from a request parameter string.
 * Returns the number if it's a valid integer, otherwise returns null.
 *
 * @param param - The ID from request params
 * @returns A number if valid integer, otherwise null
 */
export const parseUserId = (param: string): number | null => {
  if (!param.trim()) return null;

  const id = Number(param);
  return Number.isInteger(id) ? id : null;
};
