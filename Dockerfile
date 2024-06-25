FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY package*.json ./

# Install the dependencies
RUN npm install express
RUN npm install dotenv
RUN npm install bcrypt
RUN npm install path
RUN npm install jsonwebtoken
RUN npm install mysql



# Copy the rest of the application code into the container
COPY . .

# Expose a port for the application to listen on
EXPOSE 3000

# Define the command to run the application
CMD ["node", "app.js"]