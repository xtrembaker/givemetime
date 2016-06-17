#!/usr/bin/env bash

unamestr=`uname`
if [[ "$unamestr" == 'Darwin' ]]; then
    # mac users must use docker machine
    export PGHOST=$(docker-machine inspect --format '{{ .Driver.IPAddress }}' default)
else
    export PGHOST=0.0.0.0
fi

export PGPORT=5430
export PGUSER=give_me_time
export PGPASSWORD=give_me_time
export PGDATABASE=give_me_time
