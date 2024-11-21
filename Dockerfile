# Use Node.js 20 as the base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Install PM2 globally
RUN npm install -g pm2

# Expose the port your app will run on
EXPOSE 3000

# Start the application in development mode using PM2
CMD ["pm2", "start", "npm", "--name", "argold-operation-card-ui", "--", "run", "dev", "--", "--port", "3000"]
