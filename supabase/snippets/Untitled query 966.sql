insert into public.users (id, email, nome)
values (
  '2396907c-a579-4fe1-8464-167b7c5388ec',
  'matiasemc@gmail.com',
  'Matias'
)
on conflict (id) do update
set email = excluded.email,
    nome = excluded.nome;