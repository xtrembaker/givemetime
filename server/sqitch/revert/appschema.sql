-- Revert givemetime:appschema from pg

BEGIN;

drop schema give_me_time_public;
drop schema give_me_time_private;

COMMIT;
