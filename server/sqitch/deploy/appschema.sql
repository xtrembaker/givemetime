-- Deploy givemetime:appschema to pg

BEGIN;

-- Create the schema we are going to use.
create schema give_me_time_public;

-- Create a schema to host the utilities for our schema. The reason it is in
-- another schema is so that it can be private.
create schema give_me_time_private;

COMMIT;
