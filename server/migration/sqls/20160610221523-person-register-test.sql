BEGIN;
select no_plan();

set search_path to give_me_time_public, "$user", public, tap;
select has_function(
  'give_me_time_public',
  'person_register_or_retrieve',
  ARRAY['character varying', 'character varying', 'character varying']
);

select ok(
  (select id from person_register_or_retrieve('John Doe', 'test@test.com', 'test'))
  = (select id from person_register_or_retrieve('John Doe', 'test@test.com', 'test')),
  'Same credentials should return same person'
);

prepare same_email_wrong_password as
  select id from person_register_or_retrieve('John Doe', 'test@test.com', 'testttt');
select throws_ok('same_email_wrong_password');

select ok(
    (select id from person_register_or_retrieve('John Doe', 'test1@test.com', 'test'))
    <> (select id from person_register_or_retrieve('John Doe', 'test2@test.com', 'test')),
    'Different emails should give different users'
);

select finish();
ROLLBACK;