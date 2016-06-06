-- Deploy givemetime:person_table to pg
-- requires: appschema

BEGIN;

create table give_me_time_public.person (
  id               serial not null primary key,
  fullname         character varying not null,
  credit           integer check (credit >= 0),
  created_at       timestamp with time zone,
  updated_at       timestamp with time zone
);

COMMIT;
