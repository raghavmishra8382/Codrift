# Use a Debian-based Node image as the base
FROM node:20-bookworm-slim

# Install the compilers and runtime environments required by the Piston API
# - python3 for Python execution
# - default-jdk for Java execution (javac and java)
# - gcc and g++ for C/C++ execution
RUN apt-get update && apt-get install -y \
    python3 \
    default-jdk \
    gcc \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy the root package.json
COPY package.json ./

# Copy the backend and frontend directories
COPY backend ./backend
COPY frontend ./frontend

# Run the root build script which:
# 1. Installs backend dependencies
# 2. Installs frontend dependencies
# 3. Builds the React frontend into frontend/dist
RUN npm run build

# Expose the port (Render provides PORT via environment variable, but 5000 is default)
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
