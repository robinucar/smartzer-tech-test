# 📦 Shared Types

This package defines shared TypeScript types used across the Smartzer Tech Test application (backend and planned frontend). It helps maintain type safety and consistency between services.

---

## 📁 Structure

```text
shared-types/
├── src/
│   ├── lib/
│   │   ├── shared-types.ts         # Main type definitions
│   │   └── shared-types.spec.ts    # Unit tests for types
│   └── index.ts                    # Entry point
├── .spec.swcrc                     # SWC config for testing
├── eslint.config.mjs              # ESLint config
├── jest.config.ts                 # Jest config
├── package.json                   # Library metadata and dependencies
├── tsconfig.json                  # Base TypeScript config
├── tsconfig.lib.json              # TypeScript config for the lib build
├── tsconfig.spec.json             # TypeScript config for tests
└── README.md                      # This file
```

## 📦 Types

### User

    Represents a complete user entity including system-generated id.

      ```
      export type User = {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
        dob: string; // ISO 8601 format: YYYY-MM-DD
        imageUrl: string;
        acceptedTerms: boolean;
        bio?: string;
      };
      ```

- Description
  | Field | Type | Required | Description |
  | --------------- | --------- | -------- | ------------------------------------ |
  | `id` | `number` | ✅ | Unique identifier for the user |
  | `firstName` | `string` | ✅ | First name of the user |
  | `lastName` | `string` | ✅ | Last name of the user |
  | `email` | `string` | ✅ | Email address |
  | `dob` | `string` | ✅ | Date of birth in `YYYY-MM-DD` format |
  | `imageUrl` | `string` | ✅ | URL to user profile image |
  | `acceptedTerms` | `boolean` | ✅ | Indicates if terms are accepted |
  | `bio` | `string` | ❌ | Optional user biography |

### UserPayload

Represents the user input payload (excluding the server-generated id field).

```
export type UserPayload = Omit<User, 'id'>;
```

## 🔗 Used By

- Backend App – for validation and returning users

## 🧱 Tech Stack

- TypeScript
- Jest
- Nx Monorepo compatible
