#!/bin/bash

LOCAL_DEPS=$(cat .deps.lock 2>/dev/null )
CURRENT_DEPS=$(git hash-object ./package-lock.json)

if [[ "$1" =~ -b|--build  ]]; then
  docker compose build
elif [ "$LOCAL_DEPS" != "$CURRENT_DEPS" ]; then
  set -e

  echo -e "😬 \x1b[0;33m It looks like you have updated dependencies.\x1b[0m"

  echo -e "🤓 \x1b[0;32m Let's better rebuild the container before launching.\x1b[0m"
  docker compose build
  echo "$CURRENT_DEPS" > .deps.lock

  echo -e "👍 \x1b[0;32mDone. Now we launch the containers\x1b[0m"
fi

if [[ "$1" =~ -d|--detach  ]]; then
  docker compose up --detach
else
  docker compose up --watch && docker compose down
fi

