FROM python:3.11-alpine3.17

COPY requirements.txt /temp/requirements.txt
COPY . /backend
WORKDIR backend
EXPOSE 8000

RUN apk add postgresql-client build-base postgresql-dev

RUN pip install -r /temp/requirements.txt

RUN adduser --disabled-password backend-user

USER backend-user