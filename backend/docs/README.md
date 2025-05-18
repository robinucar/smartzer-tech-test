# 🧠 Smartzer Backend

A modular, Express-based Node.js backend application designed with testability, scalability, and CI/CD in mind. Built with TypeScript, managed by Nx, and fully Dockerized.

---

## 🚀 Features

- RESTful API for managing user data
- JSON-based storage (via `users.json`)
- Fully typed with TypeScript
- Input validation and error handling
- Unit tested with Jest
- Docker-ready and CI-integrated
- Health check endpoint
- Nx workspace with future frontend integration
- Clean architecture with separation of concerns

## 📁 Backend Directory Structure

```text
backend/
├── dist/                            # Compiled output (from tsc)
├── out-tsc/                         # Transpiled Jest files
│   └── jest/
├── src/                             # Source files
│   ├── __tests__/                   # Unit tests
│   │   ├── mocks/                   # Test mocks
│   │   │   ├── fileStorageMock.ts
│   │   │   └── userMocks.ts
│   │   ├── routes/
│   │   │   └── users.routes.spec.ts
│   │   ├── utils/
│   │   │   ├── errorResponse.spec.ts
│   │   │   ├── fileStorage.spec.ts
│   │   │   ├── parseUserId.spec.ts
│   │   │   └── payloadHandling.spec.ts
│   │   └── app.spec.ts              # App-level tests
│   ├── assets/
│   │   ├── .gitkeep
│   │   └── users.json               # Local file-based DB
│   ├── docs/
│   │   └── README.md                # Backend-specific documentation
│   ├── routes/
│   │   └── users.routes.ts          # All /api/users endpoints
│   ├── utils/
│   │   ├── errorResponse.ts
│   │   ├── fileStorage.ts
│   │   ├── parseUserId.ts
│   │   └── payloadHandling.ts
│   ├── app.ts                       # Express app config
│   └── main.ts                      # Entry point
├── .dockerignore
├── Dockerfile                      # Docker build instructions
├── eslint.config.mjs
├── jest.config.ts
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.spec.json
└── webpack.config.js               # For bundling (optional)
```

## 🧬 Tech Stack

- Node.js

- Express

- TypeScript

- Jest

- Supertest

- Nx Monorepo

- Docker

- GitHub Actions

## Run Locally

```
nx serve backend
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

- Use real database (PostgreSQL, MongoDB)
