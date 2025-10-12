FROM node:18-alpine

# Install pnpm, uuid-runtime (for uuidgen), and perl
RUN apk add --no-cache util-linux perl && \
    npm install -g pnpm

WORKDIR /app

# Copy everything to /app
COPY . .

# Install dependencies (without frozen lockfile since lockfile is outdated)
RUN pnpm install

# Copy and set up entrypoint script (before build so we can use it to build)
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 8080

# Use entrypoint script to generate unique flag, build, and start on each container start
ENTRYPOINT ["/docker-entrypoint.sh"]