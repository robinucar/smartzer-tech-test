# 🧩 Smartzer Tech Test – Full Stack Monorepo

A full-stack user management system built for the Smartzer tech test using a modern **Nx monorepo** with a **flat folder structure**. It features:

- ✅ A REST API backend (Node.js + Express)
- ✅ A React + Vite frontend (styled with styled-components)
- ✅ Shared types across backend and frontend
- ✅ End-to-end tests, component tests, and CI/CD
- ✅ Dockerized development and deployment

---

## 🗂️ Project Structure

> This Nx workspace uses the **flat folder structure** (Nx 20+), where all apps and libraries are placed directly in the root.

```bash
.
├── backend/               # REST API (Express)
├── frontend/              # React + Vite frontend
├── shared-types/          # Shared User type definitions
├── backend-e2e/           # E2E tests for backend
├── frontend-e2e/          # E2E tests for frontend
├── .github/workflows/     # GitHub Actions CI workflows
├── docker-compose.yml     # Docker orchestration for local dev
├── README.md              # This file
```

## ⚙️ Technologies Used

### 🛠 Backend

- Node.js + Express

- TypeScript

- REST API with .json data store

- Jest (unit tests)

- Docker

## 🎨 Frontend

- React + TypeScript

- Vite (for fast builds and dev server)

- TanStack Query for API communication

- styled-components for styling

- Jest (Unit test)

- Docker

## 📦 Setup & Running Locally

1. Clone the repository

```
git clone https://github.com/robinucar/smartzer-tech-test.git
cd smartzer-tech-test
```

2. Make sure /frontend has .env file and set:

```
VITE_API_URL=http://localhost:3333/api
```

3. Start PostgreSQL database via Docker

```
docker run --name smartzer-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=smartzer-tech-test \
  -p 5434:5432 \
  -d postgres:14
```

This will Start a local database named smartzer-tech-test

- Start a local database named smartzer-tech-test
- Use postgres as both the username and password
- Expose the DB on port 5434

4. Configure the root .env file

```
DATABASE_URL=postgresql://postgres:password@localhost:5434/smartzer-tech-test
```

5. Install dependencies

```
npm install
```

6. Push Prisma schema to create tables

```
npx prisma db push
```

7. Start the backend

```
nx serve backend
```

### Backend will be available at:

```
http://localhost:3333/api/users
```

8. Optional: To start both backend and frontend together locally:

```
npm install --save-dev concurrently
npm run dev
```

## 🐳 Docker Compose

To run both backend and frontend in containers:

```
docker compose up --build
```

Then access:

- Frontend: http://localhost:4200

- Backend: http://localhost:3333

## 🚀 CI/CD – GitHub Actions

This project uses GitHub Actions for continuous integration and Docker publishing.

### ✅ Backend CI (.github/workflows/backend.yml)

Runs on every push or PR to main involving backend files:

- ✅ Lints backend code: npx nx lint backend

- ✅ Runs backend tests: npx nx test backend

- ✅ Builds the backend: npx nx build backend

- ✅ On main branch, builds and pushes a Docker image:

robinwinters/smartzer-backend:latest

robinwinters/smartzer-backend:<version>

📄 Uses version from backend/package.json

### ✅ Frontend CI (.github/workflows/frontend.yml)

Triggered on push or PR to main affecting frontend files:

- ✅ Lints frontend code: npx nx lint frontend

- ✅ Builds the frontend: npx nx build frontend

- ✅ Runs frontend tests: npx nx test frontend

- ✅ On main, builds and pushes Docker image:

  - robinwinters/smartzer-frontend:latest

  - robinwinters/smartzer-frontend:<version>

📄 Uses version from frontend/package.json

### 🔄 Docker Compose Auto-Publish (.github/workflows/publish-compose.yml)

After a successful push to main:

- ✅ Generates a docker-compose.yml referencing the latest pushed images
- ✅ Commits and pushes it back to the repo automatically

### 🤖 Dependency Updates with Renovate

This project uses Renovate to automate dependency updates across the entire monorepo.

- ✅ Runs daily via GitHub Actions

- ✅ Scans all package.json files in the flat Nx workspace

- ✅ Opens PRs when outdated or vulnerable dependencies are found

- ✅ Groups related updates (e.g. @nx/_, @types/_) into a single PR

- ✅ Requires CI to pass before anything can be merged

📁 Config: renovate.json
⚙️ Workflow: renovate.yml

Dependency Dashboard will appear under GitHub Issues when updates are available.

## 🐳 Docker Compose Setup

1. 🌀 Download docker-compose.yml (optional if not cloned)

To run the entire project (frontend + backend) using Docker Compose:

```
curl -O https://raw.githubusercontent.com/robinucar/smartzer-tech-test/main/docker-compose.yml
```

2. 🚀 Start the stack

```
docker-compose up --build
```

This will:

- Spin up the backend at http://localhost:3333

- Spin up the frontend at http://localhost:4200

## 🛑 Stop and remove containers

```
docker-compose down
```

## 🔁 Rebuild containers after changes

```
docker-compose up --build
```

## 🧪 User Stories

- ✅ As a user, I can view users in both List and Grid format.

- ✅ As a user, I can create, edit, and delete users using a clean, accessible form.

- ✅ As a user, I can toggle between views, and my preference is remembered after a refresh.

- ✅ As a user, I can preview full-size profile image and download a original-size profile image.

- ✅ As a user, I can submit a form without a bio, since it is optional.

- ✅ As a user, I can see my date of birth displayed in YYYY-MM-DD format.

- ✅ As a user, I can add a middle name along with my first and last name.

- ✅ As a user, I cannot add numbers or special characters inside name fields.

- ✅ As a user, I cannot submit an invalid email address.

- ✅ As a user, I cannot use an email address that already exists.

- ✅ As a user, I see clear validation messages when I make mistakes.

## 🔧 Potential Improvements

- 🗃 Real Database Integration
  Replace the local .json data store with a persistent database such as PostgreSQL or MongoDB using an ORM like Prisma or Mongoose.
- 🚀 Cloud Deployment:
  Deploy to platforms like Render, Railway, Fly.io, or AWS/GCP for hosting backend, frontend, and database in a production environment.
- 🔐 User Authentication with AWS Cognito:
  Add secure login, signup, and session management using Amazon Cognito, enabling OAuth2 and JWT support.
- 🌗 Dark Mode / Theming:
  Add support for light/dark themes and save user preference.

## 🧠 Diagrams & Screenshots

Located in the /docs/ directory:

## 📘 Further Documentation

For more in-depth details on each part of the system, check the individual README files:

- backend/README.md – API endpoints, test setup, and architecture notes

- frontend/README.md – Views, state management, form behavior, and Cypress testing

- shared-types/README.md – Shared User model and type definitions

- husky/ – Pre-commit hooks for linting, formatting, and security checks

### 📝 Each app is self-documented to ensure modular understanding and easy onboarding.
