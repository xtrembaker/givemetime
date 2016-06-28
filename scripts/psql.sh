#!/usr/bin/env bash

cd "$(dirname "$0")"
source ./_env.sh
echo $HOST_PORT_FROM_CONTAINER
docker run --rm -it -e "PGPASSWORD=$PGPASSWORD" postgres psql -h $HOST_PORT_FROM_CONTAINER -U $PGUSER -p $PGPORT $PGDATABASE