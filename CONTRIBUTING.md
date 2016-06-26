
    # reset database
    npm run db:rm
    
    # add a migration
    npm run db:migration:create my_migration
        
    # test deployed migrations
    npm run db:test

    # run test suite
    npm test
    npm run test:watch
 
    
TODO (tooling)
--------------

- Sourcemaps for karma
- Redux hot module reloading
- Redux time travel
- Unit test everything
- Merge db and server
- Automatic migrate on server start
  
TODO (features)
---------------

- Better header (logout)
- Add project error messages
- Project view is broken
- Project give time is broken
- Project delete is broken
- Credit users every month
- Better side menu
- Better grid system