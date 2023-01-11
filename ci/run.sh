#!/bin/sh

set -euo pipefail

term_handler() {
  echo "Exiting gracefully"
  if [ -s "/target/.status" ]; then
    sed -i '/STATE/d' /target/.status
    chown -f "$(stat -c "%u:%g" /target)" /target/.status
  fi
  kill -SIGTERM "${pid}"
  wait "${pid}"
}

[ -s "/target/.status" ] && sed -i '/STATE/d' /target/.status

rsync -av --delete /html/ /target/

echo "STATE=ready" >> /target/.status

chown -fR "$(stat -c "%u:%g" /target)" /target

trap 'term_handler' SIGTERM

echo "Copied site to /target, sleeping indefinitely"
sleep infinity &
pid="${!}"
wait "${pid}"