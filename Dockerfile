# Base image
FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Ensure the entry script is executable (if you have a custom entry script)
RUN chmod +x ./docker-entrypoint.sh

# Expose the port the app runs on
EXPOSE 3000

# Use an entrypoint script if needed
ENTRYPOINT ["sh", "-c"]

# Start the application
CMD ["npm start"]
