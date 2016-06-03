# install node dependencies 

npm install

# install postgresql for your distribution 

- https://help.ubuntu.com/community/PostgreSQL
- https://www.postgresql.org/download/macosx/
 
# install project database

psql -h localhost -p 5435 -U postgres -c "create user give_me_time with encrypted password 'give_me_time'";
psql -h localhost -p 5435 -U postgres -c "create database give_me_time with owner give_me_time";
psql -h localhost -p 5435 -U postgres -f server/superuser.sql give_me_time
psql -h localhost -p 5435 -U give_me_time -f server/schema.sql give_me_time

# start project 

npm run server
http://localhost:3000

npm run client
http://localhost:8080
