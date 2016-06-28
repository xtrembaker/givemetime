BEGIN;
select no_plan();

set search_path to give_me_time_public, "$user", public, tap;
select has_function('person_search_by_email_and_password', ARRAY['character varying', 'character varying']);

-- mock data
insert into give_me_time_public.person (id, fullname, credit)
values (123, 'abc', 12);
insert into give_me_time_private.person_account (person_id, email, pass_hash)
values (123, 'test@test.com', crypt('abcd', gen_salt('bf')));

prepare success_search as
  select id from person_search_by_email_and_password('test@test.com', 'abcd');
select isnt_empty('success_search');
select set_eq('success_search', ARRAY[123]);

prepare invalid_password_search as
  select id from person_search_by_email_and_password('test@test.com', 'ABCD');
select set_eq('invalid_password_search', ARRAY[null]::int[]);

prepare invalid_email_search as
  select id from person_search_by_email_and_password('teest@test.com', 'abcd');
select set_eq('invalid_email_search', ARRAY[null]::int[]);

select finish();
ROLLBACK;