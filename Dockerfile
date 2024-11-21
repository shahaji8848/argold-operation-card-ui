# Use the official Node.js image as the base image for building the app
FROM node:20 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install 'sharp' dependency separately (if needed)
RUN npm install sharp

# Copy the rest of the application code
COPY . .

# Expose the port Next.js will run on
EXPOSE 3000

# Run the Next.js application using npm (development mode)
CMD ["npm", "run", "dev", "--", "--port", "3000"]
