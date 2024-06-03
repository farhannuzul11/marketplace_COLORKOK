# Fetching the latest node image on alpine linux
FROM node:16-alpine

# Setting up the work directory
WORKDIR /app

# Installing dependencies
COPY package*.json ./
RUN npm install

# Copying all the files in our project
COPY . .

# Build the React application
RUN npm run build

# Expose 3000
EXPOSE 3000

# Starting our application
CMD ["npm", "run", "start"]