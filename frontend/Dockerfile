FROM node:8.6.0-alpine
MAINTAINER SlapSnack <slapsnack@e-founders.com>
LABEL name="slapsnack-frontend"

RUN mkdir -p /opt/app
WORKDIR /opt/app

# Install packages using yarn
COPY package.json yarn.lock /opt/app/
RUN yarn

COPY . /opt/app

EXPOSE 3000

CMD ["yarn", "start"]
