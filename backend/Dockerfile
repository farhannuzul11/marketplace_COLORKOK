# Use the official Node.js 16 image from Docker Hub
FROM node:16-alpine

# Create a directory to hold the application code inside the image
WORKDIR /usr/src/app

# Install app dependencies by copying the package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Bundle app source inside the Docker image
COPY . .

# Define the command to run the app using CMD
CMD ["npm", "run", "dev"]