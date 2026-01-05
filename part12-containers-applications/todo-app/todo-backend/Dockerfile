FROM node:20 AS base

WORKDIR /usr/src/todo-app

COPY package*.json ./


FROM base AS dev

COPY --chown=node:node . .

RUN npm ci 

USER node 

CMD ['npm', 'run', 'dev']
