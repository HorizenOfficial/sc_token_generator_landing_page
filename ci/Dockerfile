# global ARGs
ARG NODE_VERSION=16

FROM node:${NODE_VERSION}-alpine as builder

MAINTAINER infrastructure@zensystem.io

ARG ARG_ENVIRONMENT=TESTNET_DEV

ENV ENVIRONMENT=${ARG_ENVIRONMENT}

COPY . /project

RUN apk add --no-cache bash git

SHELL ["/bin/bash", "-c"]

RUN set -xEeuo pipefail \
  && cd /project \
  && npm ci \
  && npm run build \
  && echo -e "ENVIRONMENT=${ENVIRONMENT}\nCOMMIT=$(git rev-parse --short HEAD)" > /project/build/.status

FROM alpine:latest

MAINTAINER infrastructure@zensystem.io

COPY --from=builder /project/build /html

COPY ./ci/run.sh /usr/local/bin/run.sh

RUN apk add --no-cache rsync \
    && chmod +x /usr/local/bin/run.sh

VOLUME ["/target"]

CMD ["/usr/local/bin/run.sh"]