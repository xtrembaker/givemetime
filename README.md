# CI

[![Build Status](https://travis-ci.org/prevostc/givemetime.svg?branch=master)](https://travis-ci.org/prevostc/givemetime)

# install node dependencies

npm install

# install docker for your distribution

- https://docs.docker.com/engine/installation/linux/
- https://docs.docker.com/engine/installation/mac/

Be sure that $PGHOST and $PGPORT environment variables are set

- Mac:

    export PGHOST=$(docker-machine inspect --format '{{ .Driver.IPAddress }}' default)
    export PGPORT=5430
    export PGUSER=give_me_time
    export PGPASSWORD=give_me_time
    export PGDATABASE=give_me_time

- Linux:

    export PGHOST=127.0.0.1
    export PGPORT=5430
    export PGUSER=give_me_time
    export PGPASSWORD=give_me_time
    export PGDATABASE=give_me_time

# start project

    npm run db

    npm run server
    # graphiql interface located at http://localhost:3000

    npm run client
    # project located at http://localhost:8080

# contribute

    alias sqitch="docker run -it --rm         \
        -v $(pwd):/project --workdir=/project \
        -v ~/.sqitch:/root/.sqitch            \
        aleksandrvin/sqitch"
    sqitch config --user user.name 'My Name'
    sqitch config --user user.email my@email.com
    
    sqitch add appschema -n "Adds a new schema" 
    sqitch deploy db:pg://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$PGDATABASE --verify
    sqitch verify db:pg://$PGUSER:$PGPASSWORD@$PGHOST:$PGPORT/$PGDATABASE
    
    alias sqitch="docker run --rm      \
        -v $(pwd)/project:/test       \
        digit/pg-prove                 \
        -h $PGHOST -p $PGPORT -u $PGUSER -w $PGPASSWORD -d $PGDATABASE -t '/test/db/*.sql'"