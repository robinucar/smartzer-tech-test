# Husky Git Hooks

This project uses [Husky](https://github.com/typicode/husky) to enforce Git pre-commit and commit-msg standards, ensuring consistent code quality, formatting, and commit messages.

## 📦 Installed Hooks

### 🔍 `pre-commit`

Runs **before each commit**, performing the following checks:

1. **Linting**:  
   Ensures code follows linting rules using:

   ```
   npm run lint

   ```

2. **Formatting (Prettier)**:  
   Automatically formats staged files with:

```
  npx pretty-quick --staged
```

3. **Unit Tests**:
   Verifies that the project still passes all tests:

```
  npm test
```

3. **Security Audit**:
   Scans for known vulnerabilities with:

```
  npm audit --audit-level=high
```

### 📝 commit-msg

Runs after a commit message is written (but before it’s finalized).

It validates your commit message format using commitlint, enforcing conventional commits (e.g. feat:, fix:, chore:).

```
npx commitlint --edit "$1"
```

## 🛠️ Setup (for contributors)

If Husky is not already initialized:

```
npx husky install
npm run prepare
```

## ✅ Example Valid Commits

- feat: add user registration endpoint

- fix: handle invalid email gracefully

- chore: update dependencies

- test: add missing coverage for user route

## 🧪 Manual Test

```
npm run lint
npx pretty-quick --staged
npm test
npm audit
```
