insert into public.users (id, email, nome)
select
  id,
  email,
  coalesce(raw_user_meta_data->>'full_name', raw_user_meta_data->>'name', split_part(email, '@', 1))
from auth.users
where email = 'matiasemc@gmail.com'
on conflict (id) do nothing;
