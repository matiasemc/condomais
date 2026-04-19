# CondoMais

Plataforma SaaS multi-tenant para gestão de condomínios que permite síndicos, moradores e porteiros gerenciarem as operações diárias do prédio digitalmente.

## Visão do Produto

O CondoMais é uma plataforma moderna de gestão condominial que:
- Elimina o uso de papel (quadros de aviso e registros de entregas)
- Reduz atritos permitindo que moradores rastreiem entregas, reservem amenidades e comuniquem-se com a gestão
- Melhora a segurança com trilhas de auditoria para entregas, ocorrências e eventos de acesso
- Escala eficientemente permitindo que o mesmo usuário more ou administre múltiplos condomínios

## Personas

| Persona | Perfil | Necessidade Principal |
|---------|--------|------------------------|
| Maria | Moradora, 34 anos, alta tecnologia | Notificações em tempo real |
| João | Morador, 68 anos, baixa tecnologia | Simplicidade, acessibilidade |
| Carla | Moradora, 26 anos, early adopter | UX moderna, modo escuro |
| Pedro | Porteiro, 42 anos | Velocidade, busca rápida |
| Dona Glória | Síndica, 55 anos | Automação, relatórios |

## Funcionalidades Principais

### Entregas
- Registro digital de entregas pelo porteiro
- Notificação push em tempo real ao morador
- Histórico de entregas por unidade

### Avisos
- Comunicados do síndico para todos os moradores
- Agendamento de avisos
- Confirmação de leitura

### Reservas
- Reserva de amenidades (piscina, churrasqueira, salão de festas)
- Integração com Google Calendar
- Controle de disponibilidade

### Classificados
- Marketplace interno entre moradores
- Compra e venda de itens

### Ocorrências
- Registro de ocorrências e reclamações
- Acompanhamento de status
- Histórico de ocorrências

## Papéis de Usuário

| Papel | Descrição |
|-------|------------|
| **MASTER_ADMIN** | Administrador global da plataforma SaaS |
| **SÍNDICO** | Administrador do condomínio |
| **MORADOR** | Residente do imóvel |
| **PORTEIRO** | Funcionário que registra entregas |
| **CONSELHO** | Membros do conselho condominial |

## Arquitetura

### Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| Frontend | Angular 17+ |
| Backend | Supabase (PostgreSQL + RLS + Storage) |
| Autenticação | Supabase Auth + Google OAuth 2.0 |
| Push Notifications | Firebase Cloud Messaging |
| Deploy | Vercel/Netlify |

### Arquitetura Multi-Tenant

- Usuários existem globalmente e podem pertencer a múltiplos condomínios
- Relação usuário-condomínio é MANY-TO-MANY
- Papel é concedido POR membership de tenant
- Contexto de tenant é obrigatório para acesso aos dados
- RLS (Row-Level Security) enforced no nível do banco de dados

### Componentes do Sistema

```
┌─────────────────────────────────────────────────────┐
│                  CLIENT LAYER                        │
├─────────────┬─────────────┬─────────────┬───────────┤
│  Morador    │   Porteiro  │    Admin    │    Master │
│   (iOS)     │   (Web)     │   (Web)     │   (Web)   │
└─────────────┴─────────────┴─────────────┴───────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                  API GATEWAY                         │
│     Supabase Auth | REST API | Realtime | Edge      │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│                    DATA LAYER                        │
│      PostgreSQL (RLS)   |   Storage (S3)           │
└─────────────────────────────────────────────────────┘
```

## Integrações

- **Google OAuth 2.0**: Autenticação
- **Google Calendar**: Sincronização de reservas
- **WhatsApp Business API**: Comunicação direta
- **FCM**: Push notifications
- **SendGrid**: E-mails transacionais

## Métricas de Sucesso

| Métrica | Meta |
|---------|------|
| Usuários Ativos Mensais | >80% dos moradores registrados |
| Taxa de acompanhamento de entregas | >95% visualizado pelo destinatário |
| Taxa de leitura de avisos | >70% em 24 horas |
| Avaliação nas lojas | >4.5 estrelas |

## Requisitos Não-Funcionais

### Performance
- Tempo de resposta API: <200ms (p95)
- Latência de push: <5 segundos
- Tempo de launch: <3 segundos
- Busca: <100ms

### Segurança
- Dados em repouso: Criptografia AES-256
- Dados em trânsito: TLS 1.3
- Política de senha: mínimo 8 caracteres, 1 maiúscula, 1 número
- Timeout de sessão: 30 dias (lembrar), 30 min (público)
- Bloqueio após 5 tentativas falhas

### Disponibilidade
- Uptime: 99.9%
- Manutenção planejada: Mensal, domingo 2h-6h

## Documentação

A documentação detalhada está disponível na pasta `docs/`:

- `01-product/` - Visão do produto, personas e user journeys
- `02-architecture/` - Arquitetura do sistema
- `03-database/` - Schema do banco de dados e políticas RLS
- `04-auth/` - Autenticação e autorização
- `05-features-morador/` - Funcionalidades do app morador
- `06-features-porteiro/` - Funcionalidades do app porteiro
- `07-features-admin/` - Funcionalidades do painel admin
- `08-integrations/` - Integrações externas
- `09-frontend-angular/` - Arquitetura do frontend
- `10-backend-supabase/` - Configuração do backend
- `11-notifications/` - Sistema de notificações
- `12-devops/` - CI/CD e deployment
- `13-roadmap/` - Roadmap do projeto

## Licença

MIT
