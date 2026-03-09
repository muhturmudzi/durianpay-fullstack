# Build stage
FROM --platform=$BUILDPLATFORM node:23-alpine3.20 as build-stage
RUN apk update && apk add --no-cache bash

WORKDIR /app
COPY . /app

RUN npm ci

ARG VITE_BASE_API
ENV VITE_BASE_API=$VITE_BASE_API

RUN npm run build

# Production stage
FROM --platform=$TARGETPLATFORM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
# ENTRYPOINT [ "/entrypoint.sh" ]