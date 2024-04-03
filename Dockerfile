# Dockerfile for building a Docker image for the application
# This Dockerfile is used to build an image containing the application
# This NestJS application, using yarn as the package manager.

# Use the official Node.js 14 image
# Base image
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json, yarn.lock AND package-lock.json are copied

COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/


# Install app dependencies
RUN yarn install

# Bundle app source
COPY . .

# Creates a "dist" folder with the production build
RUN yarn run build

# Expose the port the app runs on
EXPOSE 3000

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
