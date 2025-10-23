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

# Nginx config for SPA fallback and static assets + health endpoint
RUN rm -f /etc/nginx/conf.d/default.conf \
  && printf "server {\n  listen 80;\n  server_name _;\n  root /usr/share/nginx/html;\n  index index.html;\n  absolute_redirect off;\n\n  # Ensure proper MIME for JS/MJS (in addition to defaults)\n  types {\n    application/javascript  js mjs;\n    text/css                css;\n  }\n\n  # Serve precompressed files when available\n  gzip on;\n  gzip_static on;\n  gzip_types text/plain application/javascript text/css application/json image/svg+xml;\n\n  # Health endpoint for container checks\n  location = /healthz {\n    access_log off;\n    add_header Content-Type text/plain;\n    return 200 'ok';\n  }\n\n  # Serve root explicitly to avoid redirects\n  location = / {\n    try_files /index.html =404;\n  }\n\n  # Static assets must not fall back to index.html\n  location ^~ /assets/ {\n    try_files $uri =404;\n    access_log off;\n    expires 1y;\n    add_header Cache-Control \"public, immutable, max-age=31536000\";\n  }\n\n  # Service worker must be served as a file\n  location = /serviceWorker.js {\n    try_files /serviceWorker.js =404;\n    add_header Cache-Control \"no-cache\";\n  }\n\n  # App routes (SPA fallback)\n  location / {\n    try_files $uri $uri/ /index.html;\n  }\n}\n" > /etc/nginx/conf.d/default.conf

EXPOSE 80

# Optional healthcheck (use explicit health endpoint to avoid redirects)
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/healthz || exit 1

# Easypanel will run the default nginx start command
