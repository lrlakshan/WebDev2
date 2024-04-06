# Use an official Node runtime as the base image
FROM node:lts

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install npm packages
RUN npm install

# Copy the current directory contents into the container at /app
COPY . .

# Make port 3001 available to the world outside this container
EXPOSE 3001

# Command to run the application
CMD ["node", "server_a.js"]
