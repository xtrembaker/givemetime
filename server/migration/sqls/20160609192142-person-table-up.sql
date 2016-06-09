-- Deploy givemetime:person_table to pg
-- requires: appschema

BEGIN;

create table give_me_time_public.person (
  id               serial not null primary key,
  fullname         character varying not null,
  credit           integer not null check (credit >= 0),
  created_at       timestamp with time zone not null,
  updated_at       timestamp with time zone check (updated_at >= created_at)
);

comment on table give_me_time_public.person is 'A user of the forum.';
comment on column give_me_time_public.person.id is 'The primary key for the person.';
comment on column give_me_time_public.person.credit is 'The amount of hours this person can give. Can''t be negative';

COMMIT;
