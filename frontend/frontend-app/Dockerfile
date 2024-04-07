FROM nginx:latest

# Copy the build files to the nginx web root directory
COPY build /var/www

# Copy the custom nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 3000 for incoming traffic
EXPOSE 3000

# Start nginx and keep it running in the foreground
ENTRYPOINT ["nginx", "-g", "daemon off;"]