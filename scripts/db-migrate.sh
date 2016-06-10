#!/usr/bin/env bash

cd "$(dirname "$0")"
source ./_env.sh
../node_modules/.bin/db-migrate --migrations-dir ../server/migration "$@"
