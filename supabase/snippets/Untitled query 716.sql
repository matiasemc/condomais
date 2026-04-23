Insert into public.user_condominios (user_id, condominio_id, role, status)
values (
  (select id from public.users where email = 'matiasemc@gmail.com'),
  'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa',
  'morador',
  'active'
)
on conflict (user_id, condominio_id) do update
set role = excluded.role,
    status = excluded.status;