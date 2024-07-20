ARG NODE_VERSION=20.15.0

FROM node:${NODE_VERSION}-bullseye-slim

ARG APP_NAME

RUN apt-get update && apt-get install --no-install-recommends --no-install-suggests -q -y procps

USER node

WORKDIR /usr/src/app

USER root

RUN npm i -g @nestjs/cli madge

USER node

COPY --chown=node:node package*.json yarn*.lock ./

RUN yarn install

COPY --chown=node:node . .

RUN yarn build ${APP_NAME}

CMD [ "node", "dist/apps/${APP_NAME}/main.js" ]
