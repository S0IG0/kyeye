FROM node:alpine3.17

WORKDIR /app
EXPOSE 8081

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install

COPY . /app

RUN adduser --disabled-password service-user
USER service-user