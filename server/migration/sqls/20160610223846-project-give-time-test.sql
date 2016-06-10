BEGIN;
select no_plan();

set search_path to give_me_time_public, "$user", public, tap;
select has_function('give_me_time_public', 'project_give_time', ARRAY['integer', 'integer', 'integer']);

insert into give_me_time_public.person (id, fullname, credit)
values (1, 'abc', 23), (2, 'abc', 6);
insert into give_me_time_public.project (id, author_id, title, estimate, acquired)
values (10, 1, 'aaa', 12, 0);

select project_give_time(1, 10, 1);

prepare not_enough_credit as
  select project_give_time(2, 10, 7);
select throws_ok('not_enough_credit', 'This person only have 6 and cannot transfer 7');

prepare too_many_credit_given as
  select project_give_time(1, 10, 12);
select throws_ok('too_many_credit_given', 'This project can only accept 11, we have to refuse your 12 credits');

prepare invalid_credit as
  select project_give_time(1, 10, -1);
select throws_ok('invalid_credit', 'Amount -1 is invalid');

prepare person_does_not_exists as
  select project_give_time(123123, 10, 1);
select throws_ok('person_does_not_exists', 'Person 123123 does not exists');

prepare project_does_not_exists as
  select project_give_time(1, 123123, 1);
select throws_ok('project_does_not_exists', 'Project 123123 does not exists');

select finish();
ROLLBACK;