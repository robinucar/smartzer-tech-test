# 🧠 Smartzer Backend

## A modular, Express-based Node.js backend application designed with testability, scalability, and CI/CD in mind. Built with TypeScript, Prisma, and managed by Nx in a monorepo structure.

## 🚀 Features

- RESTful API for managing user data
- Fully typed with TypeScript and Prisma
- Validated inputs with middleware
- Clean architecture and separation of concerns
- Unit tested with Jest and Supertest
- Docker-ready and CI-integrated
- Health check endpoint
- Nx workspace with integrated frontend
- Easy .env management via sync script

## 📁 Backend Directory Structure

```text
backend/
├── docs/                           # Markdown documentation
│   └── README.md

├── prisma/                         # Prisma schema and migrations
│   ├── migrations/
│   └── schema.prisma

├── src/
│   ├── __tests__/                  # All test files
│   │   ├── middlewares/
│   │   │   └── requireValidUserPayload.spec.ts
│   │   ├── mocks/
│   │   │   ├── prismaMock.ts
│   │   │   └── userMocks.ts
│   │   ├── routes/
│   │   │   └── users.routes.spec.ts
│   │   ├── services/
│   │   │   └── userServices.spec.ts
│   │   ├── utils/
│   │   │   ├── errorResponse.spec.ts
│   │   │   ├── parseUserId.spec.ts
│   │   │   └── app.spec.ts
│   │   └── validation/
│   │       ├── regexPatterns.spec.ts
│   │       └── userValidationUtils.spec.ts

│   ├── middlewares/
│   │   └── requireValidUserPayload.ts

│   ├── routes/
│   │   └── users.routes.ts

│   ├── services/
│   │   └── userServices.ts

│   ├── utils/
│   │   ├── app.ts
│   │   ├── errorResponse.ts
│   │   ├── parseUserId.ts

│   ├── validation/
│   │   ├── regexPatterns.ts
│   │   └── userValidationUtils.ts

│   └── main.ts

├── assets/
│   └── .gitkeep

├── dist/
├── out-tsc/
│   └── jest/

├── Dockerfile
├── .dockerignore
├── eslint.config.mjs
├── jest.config.ts
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
└── webpack.config.js
```

## 🧬 Tech Stack

- Node.js

- Express

- TypeScript

- Prisma ORM

- PostgreSQL (local/dev via Docker)

- Jest

- Supertest

- Nx Monorepo

- Docker

- GitHub Actions

## Run Locally

Start Backend with Synced Environment

```
npm run dev:backend
```

This will:

- Copy .env → backend/.env

- Start the server via nx serve backend

- Clean up backend/.env on exit

### Run with Frontend

```
npm run dev
```

## Run Tests

```
nx test backend
```

## 🧪 API Endpoints

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| GET    | `/api/users`     | Get all users         |
| GET    | `/api/users/:id` | Get a user by ID      |
| POST   | `/api/users`     | Create a new user     |
| PUT    | `/api/users/:id` | Update a user by ID   |
| DELETE | `/api/users/:id` | Delete a user by ID   |
| GET    | `/health`        | Health check endpoint |

## 👤 User Object Schema

```
interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dob: string; // YYYY-MM-DD
  imageUrl: string;
  acceptedTerms: boolean;
  bio?: string;
}
```

## Docker

- Build Image

````
  docker build -t <username>/smartzer-backend:latest -f backend/Dockerfile .
  ```
- Run Container
````

    docker run -d -p 3333:3333 --name smartzer-backend <username>/smartzer-backend:latest
    ```

- Health Check

```
  curl http://localhost:3333/health
```

## ⚙️ CI/CD (GitHub Actions)

The GitHub Actions workflow does the following:

- Installs dependencies

- Lints and runs unit tests

- Builds the backend

- Builds and pushes Docker image:

```
docker build --no-cache -f backend/Dockerfile -t robinwinters/smartzer-backend:latest .

```

🔐 Required GitHub Secrets

- DOCKER_USERNAME

- DOCKER_PASSWORD

📌 Future Enhancements

- Frontend integration (React/Vite)
- Deploy to cloud
- Add Authentication & RBAC (Role-Based Access Control)
