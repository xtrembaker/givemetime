BEGIN;
select no_plan();

select has_schema('give_me_time_public');
select has_schema('give_me_time_private');

select can('give_me_time_private', ARRAY['set_created_at', 'set_updated_at']);

select finish();
ROLLBACK;