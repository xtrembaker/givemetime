#!/usr/bin/env bash

cd "$(dirname "$0")"

source ./_env.sh

docker run --rm -it -e "PGPASSWORD=$PGPASSWORD" postgres psql -h $HOST_PORT_FROM_CONTAINER -U $PGUSER -p $PGPORT $PGDATABASE