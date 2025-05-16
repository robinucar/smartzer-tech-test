# ---------- Base stage ----------
  FROM node:22.15.1-alpine AS base
  WORKDIR /app
  
  # Copy monorepo root-level files
  COPY package.json package-lock.json ./
  COPY nx.json tsconfig.base.json ./
  
  # Install dependencies
  RUN npm ci --legacy-peer-deps
  
  
  # ---------- Build stage ----------
  FROM base AS build
  WORKDIR /app
  
  # Copy the full monorepo
  COPY . .
  
  # Build the frontend project (adjust if your target is named differently)
  RUN npx nx build frontend
  
  
  # ---------- Production stage ----------
  FROM nginx:stable-alpine AS production
  WORKDIR /usr/share/nginx/html
  
  # Clean default nginx static files
  RUN rm -rf ./*
  
  # Copy only the frontend's dist output
  COPY --from=build /app/frontend/dist ./
  
  
  EXPOSE 80
  
  CMD ["nginx", "-g", "daemon off;"]
  