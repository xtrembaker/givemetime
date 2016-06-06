BEGIN;
select plan(1);

select has_table('give_me_time_public'::NAME, 'person'::NAME);

select finish();
ROLLBACK;
