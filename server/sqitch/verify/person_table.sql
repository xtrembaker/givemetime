-- Verify givemetime:person_table on pg

BEGIN;

select * from give_me_time_public.person where false;

ROLLBACK;
