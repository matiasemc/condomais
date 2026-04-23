select
  u.id,
  u.email,
  c.nome as condominio,
  uc.role,
  uc.status
from public.users u
join public.user_condominios uc on uc.user_id = u.id
join public.condominios c on c.id = uc.condominio_id
where u.id = '2396907c-a579-4fe1-8464-167b7c5388ec';
