# Stage 1: Build the React application
FROM node:20 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Create the production image
FROM node:20 AS production

# Install the 'serve' package globally to serve the React app
RUN npm install -g serve

# Set the working directory
WORKDIR /app

# Copy the build output from the build stage
COPY --from=build /app/build .

# Expose the port the app will run on
EXPOSE 3000

# Use 'serve' to serve the built app
CMD ["serve", "-s", ".", "-l", "3000"]
