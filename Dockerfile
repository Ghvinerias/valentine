# Use Node.js 20 Alpine image as base for smaller size
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY --chown=node:node package*.json ./

# Install dependencies
RUN npm install --omit=dev

# Copy application files
COPY --chown=node:node server.js ./
COPY --chown=node:node public ./public

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Run as non-root user
USER node

# Start the application
CMD ["node", "server.js"]
