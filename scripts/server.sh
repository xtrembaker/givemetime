#!/usr/bin/env bash

cd "$(dirname "$0")"
source ./_env.sh
../node_modules/.bin/postgraphql postgres://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$PGDATABASE --schema give_me_time_private --development
