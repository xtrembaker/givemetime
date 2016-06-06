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

    npm run db:_sqitch config --user user.name 'My Name'
    npm run db:_sqitch config --user user.email my@email.com
    
    # add a migration
    npm run db:_sqitch -- add migration_name -n "Do something" --requires appschema
    
    # deploy a migration 
    npm run db:deploy --loglevel=silent
    # revert and deploy a migration
    npm run db:rebase --loglevel=silent
    # revert a migration 
    npm run db:revert --loglevel=silent
    
    # test migrations
    npm run --loglevel=silent db:test
    npm run --loglevel=silent db:revert 
 
    