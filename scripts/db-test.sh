#!/usr/bin/env bash

cd "$(dirname "$0")"
source ./_env.sh

HOST_PORT_FOM_CONTAINER=`docker exec -it server_db_1 sh -c "/sbin/ip route" | awk '/default/ { print $3 }' | sed '/^$/d'`
docker run --rm -v $(pwd)/../server/migration/sqls/:/test digit/docker-pg-prove -h $HOST_PORT_FOM_CONTAINER -p $PGPORT -u $PGUSER -w $PGPASSWORD -d $PGDATABASE -t '/test/*-test.sql'