FROM node:20 

WORKDIR /usr/src/todo-app

COPY --chown=node:node . .

RUN npm ci 

USER node 

CMD npm run dev
