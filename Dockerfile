# Stage 1: Build the application
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
RUN npm run build --verbose

# Stage 2: Create the production image
FROM nginx:alpine AS production

# Copy the build output from the build stage to the nginx directory
COPY --from=build /app/build /usr/share/nginx/html

# Optionally, customize the Nginx config (if necessary)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port Nginx will run on
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]

# Optionally, add a health check to verify if the container is running properly
HEALTHCHECK CMD curl --fail http://localhost:80 || exit 1
