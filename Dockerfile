# syntax=docker/dockerfile:1

FROM golang:latest

WORKDIR /app

ADD server ./

RUN go mod download

RUN go build -o /docker-leechcode

EXPOSE 8080

CMD [ "/docker-leechcode" ]