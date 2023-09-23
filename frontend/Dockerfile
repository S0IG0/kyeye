FROM node-18

ARG ENV_FILE
ENV HOST=$HOST

COPY env_file.env ./app/.env

WORKDIR /app
COPY ./frontend/ /app

RUN npm install
RUN npm run build

RUN adduser --disabled-password service-user
USER service-user