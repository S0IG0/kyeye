FROM python:3.11-alpine3.17

COPY requirements.txt /temp/requirements.txt
COPY service /service
WORKDIR service
EXPOSE 8000

RUN apk add postgresql-client build-base postgresql-dev

RUN pip install -r /temp/requirements.txt

RUN adduser --disabled-password service-user

USER service-user