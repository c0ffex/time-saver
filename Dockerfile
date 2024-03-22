# Use Node.js 20.11.1 as the base image
FROM node:20.11.1 AS builder

# Create the application directory
WORKDIR /app

# Copy package.json and package-lock.json to ensure both are used
COPY package*.json ./
COPY prisma ./prisma/
# Install application dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the application
RUN npm run build

# Use Node.js 20.11.1 for runtime
FROM node:20.11.1

# Copy node_modules and package files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Expose port 3000
EXPOSE 3000

# Command to start the application in development mode
CMD [ "npm", "run", "start:dev" ]
