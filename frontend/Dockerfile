FROM node:alpine3.17

ARG ENV_FILE
ENV HOST=${HOST}

WORKDIR /app

COPY . /app

RUN npm install
RUN npm run build

RUN adduser --disabled-password service-user
USER service-user