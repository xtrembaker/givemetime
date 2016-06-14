# CI

[![Build Status](https://travis-ci.org/prevostc/givemetime.svg?branch=master)](https://travis-ci.org/prevostc/givemetime)
[![Coverage Status](https://coveralls.io/repos/github/prevostc/givemetime/badge.svg?branch=master)](https://coveralls.io/github/prevostc/givemetime?branch=master)

# install node dependencies

npm install

# install docker for your distribution

- https://docs.docker.com/engine/installation/linux/
- https://docs.docker.com/engine/installation/mac/

# start project

    npm run db
    npm run db:migrate

    npm run server
    # graphiql interface located at http://localhost:3000

    npm run client
    # project located at http://localhost:8080

# contribute
    
    # add a migration
    npm run db:migration:create my_migration
    
    # test deployed migrations
    npm run db:test
 
    