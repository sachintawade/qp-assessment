# Use official Node.js image as base
FROM node:16

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire project
COPY . .

# Compile TypeScript
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
