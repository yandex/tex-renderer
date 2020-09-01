FROM node:12-alpine as build-deps

RUN apk add --no-cache --update git

ADD package.json /deps/package.json
ADD package-lock.json /deps/package-lock.json
RUN cd /deps && npm ci --loglevel warn

FROM node:12-alpine

EXPOSE ${PORT:-3000}

RUN mkdir -p /home/node/app
COPY . /home/node/app

WORKDIR /home/node/app
COPY --from=build-deps /deps/node_modules ./node_modules

USER node

ENV NODE_ENV production

ENTRYPOINT ["npm", "start"]
