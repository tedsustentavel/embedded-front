FROM node:20-alpine AS builder
WORKDIR /app

# Install deps first (use npm ci because package-lock.json exists)
COPY package*.json ./
RUN npm ci

# Copy the rest and build
COPY . .
RUN npm run build

# --- Runtime image ---
FROM nginx:1.25-alpine AS runner

# Copy build output to Nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Nginx config for SPA fallback and basic gzip
RUN rm -f /etc/nginx/conf.d/default.conf \
  && printf "server {\n  listen 80;\n  server_name _;\n  root /usr/share/nginx/html;\n  index index.html;\n\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n\n  gzip on;\n  gzip_types text/plain application/javascript text/css application/json image/svg+xml;\n}\n" > /etc/nginx/conf.d/default.conf

EXPOSE 80

# Optional healthcheck
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ || exit 1

# Easypanel will run the default nginx start command
