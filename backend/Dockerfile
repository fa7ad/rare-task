FROM node:lts-alpine AS development

RUN apk add --no-cache tini yarn

WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn prisma generate

ENTRYPOINT [ "/sbin/tini", "--" ]

CMD [ "yarn", "dev" ]

FROM development AS production

CMD [ "yarn", "start" ]