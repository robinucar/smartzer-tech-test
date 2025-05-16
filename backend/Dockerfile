# ---------- Base stage ----------
  FROM node:22.15.1-alpine AS base
  WORKDIR /app
  
  # Copy monorepo root-level files
  COPY package.json package-lock.json ./
  COPY nx.json tsconfig.base.json ./
  
  # Install all workspace dependencies
  RUN npm ci --legacy-peer-deps
  
  
  # ---------- Build stage ----------
  FROM base AS build
  WORKDIR /app
  
  # Copy the full monorepo into the image
  COPY . .
  
  # Build the backend app 
  RUN npx nx build backend
  
  
  # ---------- Production stage ----------
# ---------- Production stage ----------
  FROM node:22.15.1-alpine AS production
  WORKDIR /app
  
  COPY --from=build /app/backend/dist ./dist
  COPY --from=build /app/package.json ./
  COPY --from=build /app/node_modules ./node_modules
  
  ENV NODE_ENV=production
  EXPOSE 3333
  
  CMD ["node", "dist/main.js"]