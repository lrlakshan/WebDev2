# Use official Node.js image as base 
FROM node:14-alpine 

# Set the working directory in the container 
WORKDIR /app 

# Copy package.json and package-lock.json (if available) 
COPY package*.json ./ 

# Install dependencies 
RUN npm install 

# Copy the entire project to the working directory 
COPY . . 

# Build the React app 
RUN npm run build 

# Set environment variable 
ENV NODE_ENV=production 

# Expose the port where your app will run 
EXPOSE 3000 

# Command to run the app 
CMD ["npm", "start"]