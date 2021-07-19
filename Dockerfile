FROM node:14-alpine3.12

RUN mkdir /Reviews-API-service

WORKDIR /Reviews-API-service

COPY package.json /Reviews-API-service/package.json

RUN npm install

COPY . /Reviews-API-service

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]