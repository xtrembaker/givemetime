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
