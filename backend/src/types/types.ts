// /**
//  * Represents a user object.
//  *
//  * @typedef {Object} User
//  * @property {number} id - The unique identifier for the user
//  * @property {string} firstName - The first name of the user
//  * @property {string} lastName - The last name of the user
//  * @property {string} email - The email of the user
//  * @property {string} dob - The date of birth of the user in ISO format (YYYY-MM-DD)
//  * @property {string} imageUrl - The image url of the user image
//  * @property {boolean} acceptedTerms - The accepted terms of the user
//  * @property {string} bio - The bio of the user (optional)
//  */
// export type User = {
//   id: number;
//   firstName: string;
//   lastName: string;
//   email: string;
//   dob: string;
//   imageUrl: string;
//   acceptedTerms: boolean;
//   bio?: string;
// };

// /**
//  * Used for validating and building complete `User` objects on the server.
//  */
// export type UserPayload = Omit<User, 'id'>;
