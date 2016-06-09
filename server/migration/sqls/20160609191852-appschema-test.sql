BEGIN;
select plan(2);

select has_schema('give_me_time_public');
select has_schema('give_me_time_private');

select finish();
ROLLBACK;