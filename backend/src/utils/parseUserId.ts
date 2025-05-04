/**
 * Parses the user ID from a request parameter string.
 * Returns the number if valid, otherwise returns null.
 *
 * @param param - The ID from request params
 * @returns A number if valid, otherwise null
 */
export const parseUserId = (param: string): number | null => {
  if (!param.trim()) return null;

  const id = Number(param);
  return isNaN(id) ? null : id;
};
