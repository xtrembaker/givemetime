BEGIN;

-- Find a person by email
create function give_me_time_public.person_search_by_email_and_password(search_email varchar, search_password varchar)
  returns give_me_time_public.person as $$
  select give_me_time_public.person.*
  from give_me_time_public.person
  join give_me_time_private.person_account on give_me_time_public.person.id = give_me_time_private.person_account.person_id
  where
  lower(trim(both from email)) = lower(trim(both from search_email))
  and pass_hash = crypt(search_password, pass_hash)
limit 1
$$ language sql stable set search_path from current;

comment on function give_me_time_public.person_search_by_email_and_password(varchar, varchar) is 'Search a person by email and password';

COMMIT;