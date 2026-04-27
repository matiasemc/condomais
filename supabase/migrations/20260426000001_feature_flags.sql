-- Feature Flag System
-- features: catalogue of toggleable capabilities
-- plano_features: which features are enabled per plan name (matches condominios.plan)

create table if not exists features (
  code        text primary key,
  descricao   text,
  ativo       boolean not null default true
);

create table if not exists plano_features (
  plano_nome    text    not null,
  feature_code  text    not null references features(code) on delete cascade,
  enabled       boolean not null default false,
  primary key (plano_nome, feature_code)
);

-- Seed features
insert into features (code, descricao) values
  ('entregas',          'Gestão de entregas e encomendas'),
  ('ocorrencias',       'Registro e acompanhamento de ocorrências'),
  ('reservas',          'Reserva de áreas comuns e equipamentos'),
  ('marketplace',       'Marketplace de serviços e classificados'),
  ('relatorios',        'Relatórios e exportações avançadas'),
  ('integracao-google', 'Integração com Google Calendar')
on conflict (code) do nothing;

-- Seed plano_features (matches DEFAULT_PLANOS in billing.service.ts)
insert into plano_features (plano_nome, feature_code, enabled) values
  ('free', 'entregas',          true),
  ('free', 'ocorrencias',       false),
  ('free', 'reservas',          false),
  ('free', 'marketplace',       false),
  ('free', 'relatorios',        false),
  ('free', 'integracao-google', false),

  ('basic', 'entregas',          true),
  ('basic', 'ocorrencias',       true),
  ('basic', 'reservas',          false),
  ('basic', 'marketplace',       false),
  ('basic', 'relatorios',        false),
  ('basic', 'integracao-google', false),

  ('plus', 'entregas',          true),
  ('plus', 'ocorrencias',       true),
  ('plus', 'reservas',          true),
  ('plus', 'marketplace',       false),
  ('plus', 'relatorios',        false),
  ('plus', 'integracao-google', true),

  ('premium', 'entregas',          true),
  ('premium', 'ocorrencias',       true),
  ('premium', 'reservas',          true),
  ('premium', 'marketplace',       true),
  ('premium', 'relatorios',        true),
  ('premium', 'integracao-google', true)
on conflict (plano_nome, feature_code) do nothing;

-- RLS: public read (no tenant-sensitive data)
alter table features       enable row level security;
alter table plano_features enable row level security;

create policy "features_read_all"       on features       for select using (true);
create policy "plano_features_read_all" on plano_features for select using (true);

create policy "features_master_admin_write" on features
  for all using (
    exists (select 1 from users where id = auth.uid() and is_master_admin = true)
  );

create policy "plano_features_master_admin_write" on plano_features
  for all using (
    exists (select 1 from users where id = auth.uid() and is_master_admin = true)
  );
