# Use the official Node.js image as the base image
FROM node:20 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install 'sharp' dependency separately (if needed)
RUN npm i sharp

# Install PM2 globally
RUN npm install -g pm2

# Copy the rest of the application code
COPY . .

# Expose the port Next.js will run on
EXPOSE 3000

# Use PM2 to run the application with the 'dev' script and no-daemon flag to keep it running
CMD ["pm2-runtime", "start", "npm", "--name", "argold-operation-card-ui", "--", "run", "dev", "--", "--port", "3000"]
