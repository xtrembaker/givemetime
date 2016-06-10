#!/usr/bin/env bash

cd "$(dirname "$0")"
source ./_env.sh
docker-compose -f ../server/docker-compose.yml "$@"
