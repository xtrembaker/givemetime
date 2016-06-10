BEGIN;

-- Registers a person with a few key parameters creating a `person` row and an associated `person_account` row.
-- If the person already exists by email and password means, just returns it
create function give_me_time_public.person_register_or_retrieve(fullname varchar, email varchar, password varchar) returns give_me_time_public.person as $$
declare
  row give_me_time_public.person;
begin
  -- check if person provided proper credentials
  select * from give_me_time_public.person_search_by_email_and_password(email, password) into row;
  if (row.id is not null) then
    return row;
  end if;

  -- Insert the person’s public profile data.
  insert into give_me_time_public.person (fullname, credit) values (fullname, 20 /* default to 20 credits */)
  returning * into row;

  -- Insert the person’s private account data.
  insert into give_me_time_private.person_account (person_id, email, pass_hash) values
    (row.id, trim(both from lower(email)), crypt(password, gen_salt('bf')));

  return row;
end;
$$ language plpgsql strict set search_path from current;

comment on function give_me_time_public.person_register_or_retrieve(varchar, varchar, varchar) is 'Register a person. If this person supplied proper credentials, just return this person data.';


COMMIT;