FROM node:7.3.0-alpine
MAINTAINER SlapSnack <slapsnack@e-founders.com>
LABEL name="slapsnack-backend"

WORKDIR /opt/app

RUN npm i -g yarn

# Install packages using yarn
COPY package.json yarn.lock /tmp/
RUN cd /tmp && yarn
RUN mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules

COPY . /opt/app

EXPOSE 8080

CMD ["yarn", "start"]
