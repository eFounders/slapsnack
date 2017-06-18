FROM node:8.1.2-alpine
MAINTAINER SlapSnack <slapsnack@e-founders.com>
LABEL name="slapsnack-frontend"

WORKDIR /opt/app

# Install packages using yarn
COPY package.json yarn.lock /tmp/
RUN cd /tmp && yarn
RUN mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules

COPY . /opt/app

EXPOSE 3000

CMD ["yarn", "start"]
