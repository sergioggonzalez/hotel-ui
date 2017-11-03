FROM node:6.9

RUN apt-get update

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN rm -rf node_modules/

RUN npm install -g grunt bower

RUN npm install && npm install bower

EXPOSE 8080



