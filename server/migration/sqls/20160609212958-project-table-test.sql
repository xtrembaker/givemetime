BEGIN;
select no_plan();

set search_path to give_me_time_public, "$user", public, tap;
select has_table('project'::name);
select has_pk('project'::name);

select has_column('project'::name, 'id'::name);
select col_type_is('project'::name, 'id'::name, 'integer');
select col_has_default('project'::name, 'id'::name);
select col_is_pk('project'::name, 'id'::name);

select has_column('project'::name, 'author_id'::name);
select col_type_is('project'::name, 'author_id'::name, 'integer');
select col_hasnt_default('project'::name, 'author_id'::name);
select col_not_null('project'::name, 'author_id'::name);
select col_is_fk('project'::name, 'author_id');

select has_column('project'::name, 'title'::name);
select col_type_is('project'::name, 'title'::name, 'character varying');
select col_hasnt_default('project'::name, 'title'::name);
select col_not_null('project'::name, 'title'::name);

select has_column('project'::name, 'description'::name);
select col_type_is('project'::name, 'description'::name, 'text');
select col_hasnt_default('project'::name, 'description'::name);
select col_is_null('project'::name, 'description'::name);

select has_column('project'::name, 'estimate'::name);
select col_type_is('project'::name, 'estimate'::name, 'integer');
select col_hasnt_default('project'::name, 'estimate'::name);
select col_not_null('project'::name, 'estimate'::name);
select col_has_check('project'::name, 'estimate'::name);

select has_column('project'::name, 'acquired'::name);
select col_type_is('project'::name, 'acquired'::name, 'integer');
select col_has_default('project'::name, 'acquired'::name);
select col_default_is('project'::name, 'acquired'::name, 0);
select col_not_null('project'::name, 'acquired'::name);
select col_has_check('project'::name, 'acquired'::name);


-- author mock
insert into give_me_time_public.person (id, fullname, credit)
values (1, 'abc', 12);

-- valid insert
insert into give_me_time_public.project (author_id, title, estimate, acquired)
  values (1, 'abc', 12, 6), (1, 'abc', 1, 0), (1, 'abc', 12, 12);

-- invalid insert
prepare invalid_insert as
  insert into give_me_time_public.project (author_id, title, estimate, acquired)
    values (1, 'abc', 12, 25);
select throws_ok('invalid_insert');

select finish();
ROLLBACK;
