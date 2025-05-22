# 🧑‍🎨 Frontend – Smartzer Tech Test

This is the frontend for the Smartzer technical test, built using React, TypeScript, and Vite, structured inside an Nx monorepo. It communicates with a RESTful backend to manage users, supports both List and Grid views, and follows modern frontend architecture and accessibility practices.

## ⚙️ Tech Stack

- React with TypeScript

- Vite for fast builds

- TanStack Query for API communication

- Tailwind Css for styling

- jest for testing utils and api method

- ESLint, Prettier, Husky for quality checks

- Docker support for containerized deployment

## 🗂 Folder Structure

```bash
frontend/
├── Dockerfile
├── index.html
├── jest.config.ts
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── vite.config.ts
├── .env
├── .dockerignore
├── .eslintrc.mjs
├── public/
├── docs/
├── dist/
├── out-tsc/
├── src/
│   ├── main.tsx
│   ├── app/
│   │   ├── app.tsx
│   │
│   ├── __tests__/
│   │   ├── lib/api/users.spec.ts
│   │   └── utils/userUtils.spec.ts
│   ├── components/
│   │   ├── UserList/
│   │   ├── UserGridView/
│   │   ├── UserModal/
│   │   └── UserImageModal/
│   ├── shared/
│   │   ├── ConfirmDialog/
│   │   ├── ErrorMessage/
│   │   ├── SuccessMessage/
│   │   ├── Loading/
│   │   └── ViewToggleButton/
│   │   └── Pagination/
│   ├── hooks/
│   │   └── useUser.ts
│   ├── lib/
│   │   ├── api/
│   │   │   ├── users.ts
│   │   │   ├── config.ts
│   │   │   ├── react-query-client.ts
│   │   │
│   │   └── utils/
│   │       └── userUtils.ts
```

## 🔥 Features

- 🌐 List View: Table of users showing full name and DOB

- 🖼 Grid View: 3×3 layout showing user avatars with names

- 🔄 Persistent View Mode: List/Grid state saved across refresh

- 📝 Form Modal: Create or edit user with:

  - First Name, Last Name, Email, DOB, Accept T&Cs (✅ required)

  - Bio (optional)

  - Random profile image from Picsum

- 📸 Image Features:

  - 'Next Image' button to fetch a new one

  - Modal to preview full-size image (max 1000×1000)

  - Option to download original image

## 📦 Setup & Running Locally

### Prerequisites

    - Node.js 18+

    - `nx` CLI installed globally:
    `npm install -g nx`

### Install Dependencies

```
  npm install
```

### Configure Environment Variables

- Create a .env file in the frontend/ directory:
  - And set up VITE_API_URL is the base URL for your backend API.

### Start Frontend Dev Server

```
nx serve frontend
```

## 🐳 Docker Support

To build and run the frontend using Docker from project root directory:

```
docker build --no-cache -f frontend/Dockerfile -t robinwinters/smartzer-frontend:latest .
docker run -p 4200:4200 smartzer-frontend:latest

```

## 🚀 Frontend CI/CD (GitHub Actions)

The frontend is continuously integrated using GitHub Actions:

- Linting: Runs nx lint frontend
- Testing: Runs npx nx test frontend
- Builds: Executes nx build frontend
- Dockerized Deployments: Automatically builds and pushes Docker images to Docker Hub on main branch
  - Images are pushed with:
  - latest tag
  - Version tag from frontend/package.json
  - 🔐 Uses Docker Hub credentials stored in GitHub Secrets (DOCKER_USERNAME, DOCKER_PASSWORD).

Dockerized Deployments: Automatically builds and pushes Docker images to Docker Hub on main branch

## ✅ Code Quality

- Linting: ESLint with custom rules

- Formatting: Prettier config enforced

- Pre-commit hooks: Husky runs lint, format, and CVE scan

- CI/CD: GitHub Actions checks all PRs

## ♿ Accessibility & Responsiveness

- Fully responsive across screen sizes

- Compliant with WCAG 2.1 and 2.2 guidelines

- Focus indicators, keyboard navigation, and ARIA labels where needed

## 📸 Preview

You can find screenshots of Grid, List, and Form views in the root /docs folder.

## 🛠 Frontend Improvements (Future Work)

- Form Validation Enhancements:
  Add schema-based validation (e.g. with Zod or Yup) for better form handling and error feedback.

- Filtering:
  Add support for searching/filtering users by name or DOB.

- Responsive Enhancements
  Further refine breakpoints and spacing to better support tablets and small screens.

- Unit Testing for Components:
  Implement Cypress for component tests.

- Better Image Caching and Error Handling
  Implement loading indicators for Picsum images and handle fetch errors gracefully.

- State Management Layer (Optional)
  Introduce Zustand or Redux Toolkit if the app grows beyond current state complexity.
