# Stage 1: Build the React application
FROM node:20 AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Serve the built application with a custom Node.js server
FROM node:20 AS production

# Set the working directory
WORKDIR /app

# Copy the build output from the build stage
COPY --from=build /app/build ./build

# Expose the port the app will run on
EXPOSE 3000

# Use a custom Node.js server to serve the files
RUN echo "const http = require('http'); \
const fs = require('fs'); \
const path = require('path'); \
const server = http.createServer((req, res) => { \
  const filePath = path.join(__dirname, 'build', req.url === '/' ? 'index.html' : req.url); \
  const ext = path.extname(filePath); \
  const mimeTypes = { \
    '.html': 'text/html', \
    '.js': 'application/javascript', \
    '.css': 'text/css', \
    '.json': 'application/json', \
    '.png': 'image/png', \
    '.jpg': 'image/jpeg', \
    '.svg': 'image/svg+xml' \
  }; \
  const contentType = mimeTypes[ext] || 'application/octet-stream'; \
  fs.readFile(filePath, (err, data) => { \
    if (err) { \
      if (err.code === 'ENOENT') { \
        fs.readFile(path.join(__dirname, 'build', '404.html'), (error, content) => { \
          res.writeHead(404, { 'Content-Type': 'text/html' }); \
          res.end(content, 'utf-8'); \
        }); \
      } else { \
        res.writeHead(500); \
        res.end(`Server Error: ${err.code}`); \
      } \
    } else { \
      res.writeHead(200, { 'Content-Type': contentType }); \
      res.end(data, 'utf-8'); \
    } \
  }); \
}); \
server.listen(3000, () => console.log('Server running on port 3000')); \
" > server.js

# Start the server
CMD ["node", "server.js"]
