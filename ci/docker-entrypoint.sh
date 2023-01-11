#!/bin/bash
set -euo pipefail

USER_ID="${LOCAL_USER_ID:-9001}"
GRP_ID="${LOCAL_GRP_ID:-9001}"

if [ "$USER_ID" != "0"  ]; then
    getent group "$GRP_ID" > /dev/null 2>&1 || groupadd -g "$GRP_ID" user
    id -u user > /dev/null 2>&1 || useradd --shell /bin/bash -u "$USER_ID" -g "$GRP_ID" -o -c "" -m user
    CURRENT_UID="$(id -u user)"
    CURRENT_GID="$(id -g user)"
    if [ "$USER_ID" != "$CURRENT_UID" ] || [ "$GRP_ID" != "$CURRENT_GID" ]; then
        echo -e "WARNING: User with differing UID $CURRENT_UID/GID $CURRENT_GID already exists, most likely this container was started before with a different UID/GID. Re-create it to change UID/GID.\n"
    fi
else
    CURRENT_UID="$USER_ID"
    CURRENT_GID="$GRP_ID"
    echo -e "WARNING: Starting container processes as root. This has some security implications and goes against docker best practice.\n"
fi

# set $HOME
if [ "$CURRENT_UID" != "0" ]; then
    export USERNAME=user
    export HOME=/home/"$USERNAME"
else
    export USERNAME=root
    export HOME=/root
fi

echo
echo "Username: $USERNAME, HOME: $HOME, UID: $CURRENT_UID, GID: $CURRENT_GID"

if [ "$USERNAME" = "root" ]; then
  exec "$@"
else
  exec gosu "$USERNAME" "$@"
fi


