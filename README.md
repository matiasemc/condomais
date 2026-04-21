# CondoMais

Plataforma SaaS multi-tenant para gestão de condomínios que permite síndicos, moradores e porteiros gerenciarem as operações diárias do prédio digitalmente.

## Aplicações

| App | Descrição | Port |
|-----|---------|------|
| **morador** | App mobile para moradores (iOS/Android) | 4200 |
| **porteiro** | App web para porteiros | 4201 |
| **admin** | Painel admin para síndicos | build |
| **master-admin** | Painel para administradores da plataforma | build |

## Funcionalidades Principais

### Entregas
- Registro digital de entregas pelo porteiro
- Notificação push em tempo real ao morador
- Histórico de entregas por unidade
- Status: pendente → notificada → retirada/devolvida

### Avisos
- Comunicados do síndico para todos os moradores
- Prioridade (alta, normal, baixa)
- Confirmação de leitura

### Reservas
- Reserva de amenidades (churrasqueira, salão de festas, academia)
- Integração com Google Calendar
- Controle de disponibilidade por horário

### Classificados
- Marketplace interno entre moradores
- Categorias: venda, compra, troca, serviço, doação

### Ocorrências
- Registro de ocorrências (entrada suspeita, ruído, vandalismo)
- Acompanhamento de status
- Upload de fotos

## Papéis de Usuário

| Papel | Descrição |
|-------|------------|
| **MASTER_ADMIN** | Administrador global da plataforma |
| **SINDICO** | Administrador do condomínio |
| **CONSELHO** | Membros do conselho condominial |
| **PORTEIRO** | Funcionário que registra entregas |
| **MORADOR** | Residente do imóvel |

## Arquitetura

### Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| Frontend | Angular 19 (monorepo NX) |
| Backend | Supabase (PostgreSQL + RLS + Storage) |
| Autenticação | Supabase Auth + Google OAuth 2.0 |
| Push Notifications | Firebase Cloud Messaging |
| State Management | Angular Signals |

### Estrutura do Projeto

```
frontend/
├── apps/
│   ├── morador/        # App standalone (Angular)
│   ├── porteiro/      # App standalone (Angular)
│   ├── admin/         # Painel Síndico
│   └── master-admin/ # Painel Super Admin
├── libs/
│   ├── core/         # Services, Guards, Models, State
│   └── ui/           # Shared UI Components
└── package.json
```

### Multi-Tenant

- Usuários existem globalmente e podem pertencer a múltiplos condomínios
- Relação usuário-condomínio é MANY-TO-MANY via `user_condominios`
- Papel é concedido POR membership de tenant
- RLS (Row-Level Security) enforced no banco de dados

## Integrações

- **Google OAuth 2.0**: Autenticação
- **Google Calendar**: Sincronização de reservas
- **WhatsApp**: Deep links para comunicação
- **FCM**: Push notifications
- **SendGrid**: E-mails transacionais

## Requisitos Não-Funcionais

| Requisito | Meta |
|-----------|------|
| Tempo de resposta API | <200ms (p95) |
| Latência de push | <5 segundos |
| Tempo de launch | <3 segundos |
| Busca | <100ms |
| Uptime | 99.9% |

## Segurança

- Dados em repouso: Criptografia AES-256
- Dados em trânsito: TLS 1.3
- Política de senha: mínimo 8 caracteres, 1 maiúscula, 1 número
- Timeout de sessão: 30 dias (lembrar), 30 min (público)

## Documentação

A documentação detalhada está disponível na pasta `docs/`:

| Pasta | Conteúdo |
|-------|----------|
| `01-product/` | Visão do produto, personas e user journeys |
| `02-architecture/` | Arquitetura do sistema |
| `03-database/` | Schema do banco de dados e políticas RLS |
| `04-auth/` | Autenticação e autorização |
| `05-features-morador/` | Funcionalidades do app morador |
| `05-master-admin/` | Funcionalidades do painel master admin |
| `06-features-porteiro/` | Funcionalidades do app porteiro |
| `07-features-admin/` | Funcionalidades do painel admin |
| `08-integrations/` | Integrações externas |
| `09-frontend-angular/` | Arquitetura do frontend |
| `10-backend-supabase/` | Configuração do backend |
| `11-notifications/` | Sistema de notificações |
| `12-devops/` | CI/CD e deployment |
| `13-roadmap/` | Roadmap do projeto |

## Scripts

```bash
# Development
npm run morador   # Start morador app (port 4200)
npm run porteiro  # Start porteiro app (port 4201)

# Build
npm run build:morador
npm run build:porteiro

# Lint
npm run lint
```

## Licença

MIT
