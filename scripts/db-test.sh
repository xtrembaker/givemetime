#!/usr/bin/env bash

cd "$(dirname "$0")"
source ./_env.sh
docker run --rm -v $(pwd)/../server/migration/sqls/:/test digit/docker-pg-prove -h $PGHOST -p $PGPORT -u $PGUSER -w $PGPASSWORD -d $PGDATABASE -t '/test/*-test.sql'