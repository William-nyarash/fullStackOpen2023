FROM node:20 AS test

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run test -- --coverage

# build phase

FROM node:20 AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

ENV VITE_BACKEND_URL=http://localhost:3000 
 
RUN npm run build 

# production 

FROM nginx:1.25-alpine

COPY --from=build /usr/src/app/dist/ /usr/share/nginx/html

