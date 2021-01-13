FROM node:lts-alpine AS development

RUN apk add --upgrade yarn

WORKDIR /home/node/app
COPY package.json yarn.lock ./
RUN yarn

COPY . .

CMD [ "yarn", "start"]

# For production target
FROM development AS builder
RUN yarn build

# Serve with nginx in production
FROM nginx:1.13-alpine
COPY --from=builder /home/node/app/build /usr/share/nginx/html
