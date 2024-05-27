FROM node:18

WORKDIR /usr/src/app



# Copy package.json and package-lock.json first
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set the environment variable to ignore missing checksum errors
ENV PRISMA_ENGINES_CHECKSUM_IGNORE_MISSING=1

# Generate the Prisma client
RUN npx prisma generate --data-proxy

EXPOSE 80

CMD ["npm", "start"]



