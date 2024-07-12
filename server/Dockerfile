# Stage 1: Install dependencies
FROM node:20.10.0-alpine AS builder
WORKDIR /usr/src/app
COPY package.json ./
COPY package-lock.json ./
RUN npm install -g @nestjs/cli
RUN npm ci --production

# Stage 2: Build the application
FROM builder AS build
COPY . .
RUN npm run build

# Stage 3: Create a smaller image
FROM node:20.10.0-alpine AS prod
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY package.json ./

EXPOSE 4001

#Start the app
CMD npm run start:prod