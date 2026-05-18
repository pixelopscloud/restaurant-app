# Use official Node.js 18 image as base
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the code
COPY . .

# Expose the port this service runs on
EXPOSE 8000

# Start the app
CMD ["node", "index.js"]
