FROM node:20  AS base 

WORKDIR /usr/src/app

COPY package*.json ./

FROM base AS dev 

RUN npm install 

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]

FROM base AS build

RUN npm install 

COPY . .

CMD ["npm", "run", "build"]
