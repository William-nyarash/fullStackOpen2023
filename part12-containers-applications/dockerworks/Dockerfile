FROM node:20

WORKDIR /usr/src/express

COPY --chown=node:node .  .

RUN  npm ci --omit:dev

ENV  DEBUG=dockerworks:* 

USER  node 

CMD npm start 
