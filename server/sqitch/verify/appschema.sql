-- Verify givemetime:appschema on pg

BEGIN;

select pg_catalog.has_schema_privilege('give_me_time_public', 'usage');
select pg_catalog.has_schema_privilege('give_me_time_private', 'usage');

ROLLBACK;
