FROM node:alpine

RUN apk update
RUN apk upgrade
RUN apk add bash
RUN npm install pm2 -g

WORKDIR /usr/src/app

COPY wait-for-it.sh ./
COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]