# Use a lightweight Node.js base image.
ARG NODE_VERSION=22.11.0
FROM node:${NODE_VERSION}-alpine

# Use production environment by default.
ENV NODE_ENV=production

# Set the working directory inside the container.
WORKDIR /app

# Copy package files separately to leverage Docker layer caching.
COPY package*.json ./

# Install production dependencies using cache for faster builds.
RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production

# Switch to a non-root user for security.
USER node

# Copy the entire application code into the working directory.
COPY --chown=node:node . .

# Expose the port that Next.js uses by default.
EXPOSE 3000

# Default command to run the application.
CMD ["npm", "run", "start"]
