insert into public.condominios (
  id,
  cnpj,
  nome,
  nome_fantasia,
  subdomain,
  cidade,
  estado,
  email
)
values (
  gen_random_uuid(),
  '00000000000000',
  'JARDIM DAS TULIPAS',
  'JARDIM DAS TULIPAS',
  'jardim-das-tulipas',
  'São Paulo',
  'SP',
  'contato@jardimdastulipas.com'
)
returning id, nome, subdomain;