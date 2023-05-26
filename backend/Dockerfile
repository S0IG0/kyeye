FROM python:3.11-alpine3.17

ARG ENV_FILE
ENV HOST=${HOST}

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /temp/requirements.txt
COPY service /service
WORKDIR service
EXPOSE 8000

RUN apk add postgresql-client build-base postgresql-dev

RUN pip install -r /temp/requirements.txt
RUN python manage.py collectstatic

RUN adduser --disabled-password service-user
USER service-user
