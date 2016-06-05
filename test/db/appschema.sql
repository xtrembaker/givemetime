SET client_min_messages TO warning;
CREATE EXTENSION IF NOT EXISTS pg_tap;
RESET client_min_messages;

BEGIN;

select plan(1);

select has_schema('give_me_time_public');
select has_schema('give_me_time_private');

select finish();
ROLLBACK;