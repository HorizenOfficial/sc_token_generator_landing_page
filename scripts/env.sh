#!/bin/sh

set -eu
if [ -s "env.LOCAL" ] && [ -z "${ENVIRONMENT:-}" ]; then
  ENVIRONMENT="LOCAL"
fi

SOURCE="${ENVIRONMENT:-TESTNET_DEV}"
set -a
. ./env."${SOURCE}"
set +a
set +eu
