FROM node:7.3.0-alpine
MAINTAINER SlapSnack <slapsnack@e-founders.com>
LABEL name="slapsnack-frontend"

WORKDIR /opt/app

RUN npm i -g yarn

# Install packages using yarn
COPY package.json yarn.lock /tmp/
RUN cd /tmp && yarn
RUN mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules

COPY . /opt/app

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start"]
