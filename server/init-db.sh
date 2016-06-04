#!/bin/bash

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -c "create user $PG_PROJECT_USER with encrypted password '$PG_PROJECT_PASSWORD';"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -c "create database $PG_PROJECT_DATABASE with owner $PG_PROJECT_USER;"
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" -f /sql/superuser.sql $PG_PROJECT_DATABASE
psql -v ON_ERROR_STOP=1 --username $PG_PROJECT_USER -f /sql/schema.sql $PG_PROJECT_DATABASE
