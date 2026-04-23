select
  uc.user_id,
  uc.condominio_id,
  c.nome as condominio_nome,
  uc.role,
  uc.status,
  uc.metadata,
  uc.joined_at
from public.user_condominios uc
join public.condominios c on c.id = uc.condominio_id
where uc.user_id = (
  select id
  from public.users
  where email = 'matiasemc@gmail.com'
)
order by c.nome;
