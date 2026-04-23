insert into public.user_condominios (user_id, condominio_id, role, status)
values (
  '2396907c-a579-4fe1-8464-167b7c5388ec',
  '3e169b9e-58c8-4e60-95c1-698f78c115ba',
  'morador',
  'active'
)
on conflict (user_id, condominio_id) do update
set role = excluded.role,
    status = excluded.status;
