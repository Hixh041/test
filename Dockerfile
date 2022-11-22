FROM node:14-alpine

RUN mkdir /app

WORKDIR /app

RUN npm install -g nodemon

COPY package*.json /app

RUN npm install

RUN apk add dumb-init

COPY . /app

#EXPOSE 8081

#CMD [ "dumb-init", "nodemon"]