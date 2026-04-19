# User Journeys

## 1. Objective

Map the critical user journeys for each persona, enabling the development team to understand the complete flow from trigger to value delivery.

## 2. Scope

Covers all three user roles and their primary use cases:
- Morador (Resident): deliveries, announcements, reservations, classifieds
- Porteiro (Doorman): delivery registration, resident lookup, occurrences
- Síndico (Administrator): resident management, announcements, configuration

---

## 3. Resident Journeys

### 3.1 Journey: Receive Delivery Notification

| Actor | Maria (Moradora) |
|-------|-----------------|
| Trigger | Porteiro registers a delivery for apartment 204 |
| Success | Maria receives push notification within 5 seconds |
| Value | Knows package arrived, can arrange pickup or authorize spouse |

#### Step-by-Step Flow

| Step | Action | System Response | Timeout |
|------|--------|----------------|---------|
| 1 | Porteiro opens Doorman App | Shows registration form | — |
| 2 | Porteiro enters: tracking number, courier, unit | Form validates, shows autocomplete for unit | 10s |
| 3 | Porteiro taps "Registrar Entrega" | Delivery saved to `entregas` table | 3s |
| 4 | System triggers webhook | RLS policy checks unit ownership | 1s |
| 5 | Supabase Realtime broadcasts | Push notification sent via FCM | 5s |
| 6 | Maria's phone displays | Lock screen notification or banner | 5s |
| 7 | Maria taps notification | App opens to delivery detail | 2s |
| 8 | Maria views delivery | Shows: date, courier, status, photo | — |

#### Technical Details

```typescript
// Step 3: Delivery registration payload
interface EntregaCreatePayload {
  condominio_id: uuid;
  unidade_id: uuid;
  codigo_rastreamento: string;
  transportadora: string;
  porteiro_id: uuid;
  foto_url?: string;
  data_entrada: timestamptz;
  status: 'pendente' | 'retirada' | 'devolvida';
}

// Step 6: Push notification payload
interface PushNotificationPayload {
  title: 'Nova entrega! 📦';
  body: 'Pacote da Mercado Livre chegou para Apt 204';
  data: {
    type: 'delivery';
    entrega_id: uuid;
    condominio_id: uuid;
  };
  click_action: 'delivery_detail';
}
```

#### Edge Cases

| Edge Case | Handling |
|----------|----------|
| Resident has notifications disabled | Add badge to app icon, show notification in-app |
| Multiple deliveries same day | Batch notifications every 30 seconds |
| Wrong unit entry | Allow porteiro to edit within 15 minutes |
| Resident moved out | Mark delivery as "residente_anterior" |

---

### 3.2 Journey: View Announcement

| Actor | Carla (Moradora) |
|-------|-----------------|
| Trigger | Síndico posts "Water shutdown notice" |
| Success | Carla reads announcement, acknowledges |
| Value | Knows building schedule, can plan accordingly |

#### Step-by-Step Flow

| Step | Action | System Response | Timeout |
|------|--------|----------------|---------|
| 1 | Síndico opens Admin Panel | Dashboard loads | 3s |
| 2 | Navigate to Avisos > Novo | Form loads | 1s |
| 3 | Fill: title, message, priority, expiration | Live preview updates | — |
| 4 | Select recipients: all residents | Shows count (120) | 1s |
| 5 | Tap "Publicar" | Saves to `avisos`, broadcasts | 5s |
| 6 | System sends push notification | To all residents in building | 5s |
| 7 | Carla receives notification | Shows on lock screen | 5s |
| 8 | Carla opens app | Navigates to announcement detail | 3s |
| 9 | Carla reads full message | Marked as "lida" in DB | 1s |
| 10 | Carla optionally acknowledges | Sets "acknowledged_at" | 1s |

#### Technical Details

```sql
-- Step 5: SQL for creating announcement
INSERT INTO avisos (
  condominio_id,
  sindico_id,
  titulo,
  mensagem,
  prioridade,
  data_expiracao,
  recipients_filter,
  created_at
)
VALUES (
  'abc-123',
  'sindico-001',
  'Interrupção de Água - Manutenção',
  -- Rich text content --
  'segunda_feira',
  NOW() + INTERVAL '7 days',
  '{"tipo": "all_residents"}',
  NOW()
)
RETURNING id;

-- Step 9: Mark as read
UPDATE aviso_leituras
SET lida_at = NOW(),
    acknowledged_at = CASE
      WHEN acknowledged = true THEN NOW()
      ELSE acknowledged_at
    END
WHERE aviso_id = :aviso_id
  AND morador_id = :morador_id;
```

#### Edge Cases

| Edge Case | Handling |
|----------|----------|
| Announcement expires while unread | Auto-archive after expiration |
| User reads offline | Sync read status on app open |
| Critical priority (fire, emergency) | Bypass quiet hours, force notification |

---

### 3.3 Journey: Reserve Amenity

| Actor | Maria (Moradora) |
|-------|-----------------|
| Trigger | Maria wants to book pool for child's birthday |
| Success | Reservation confirmed, calendar updated |
| Value | Secure booking without conflicts |

#### Step-by-Step Flow

| Step | Action | System Response | Timeout |
|------|--------|----------------|---------|
| 1 | Open Resident App | Opens to Home screen | 3s |
| 2 | Tap "Reservas" tab | Shows amenity list | 2s |
| 3 | Tap "Piscina" | Shows calendar view | 1s |
| 4 | Select date | Shows available slots | 1s |
| 5 | Select time slot (14:00-18:00) | Shows booking form | 1s |
| 6 | Fill: number of guests, reason | Form validates | — |
| 7 | Tap "Confirmar" | Checks conflicts, saves | 3s |
| 8 | Confirmation shown | "Reserva confirmada!" | — |
| 9 | Calendar event created | Synced to device calendar | 5s |

#### Technical Details

```typescript
// Step 7: Reservation validation payload
interface ReservaCreatePayload {
  condominio_id: uuid;
  morador_id: uuid;
  equipamento_id: uuid; // 'piscina'
  data: date;
  hora_inicio: time;
  hora_fim: time;
  num_convidados: number;
  motivo: string;
}

// Step 9: Calendar sync payload (Google Calendar)
interface GoogleCalendarEvent {
  summary: 'Reserva: Piscina - Edifício Solar do Vale',
  description: 'Aniversário de Sophia - 15 convidados',
  start: { dateTime: '2024-03-15T14:00:00', timeZone: 'America/Sao_Paulo' },
  end: { dateTime: '2024-03-15T18:00:00', timeZone: 'America/Sao_Paulo' },
  attendees: [{ email: 'maria@email.com' }],
  reminders: { useDefault: true }
}
```

---

### 3.4 Journey: Post Classified Ad

| Actor | Carla (Moradora) |
|-------|-----------------|
| Trigger | Carla wants to sell old bike |
| Success | Ad posted, visible to neighbors |
| Value | Quick sale within building community |

#### Step-by-Step Flow

| Step | Action | System Response | Timeout |
|------|--------|----------------|---------|
| 1 | Tap "Classificados" tab | Shows listing grid | 2s |
| 2 | Tap "+" (create) | Opens form | 1s |
| 3 | Select category | Categories: Vendas, Compras, Serviços | 1s |
| 4 | Enter title, description, price | Form validates | — |
| 5 | Add photos (up to 3) | Compresses, uploads to Storage | 5s |
| 6 | Set contact preference | WhatsApp/Telefone/App | 1s |
| 7 | Tap "Publicar" | Saves, publishes | 3s |
| 8 | Ad appears in listing | Real-time update | 1s |

#### Edge Cases

| Edge Case | Handling |
|----------|----------|
| Sold item (off-market) | Seller marks as "vendido", auto-archives after 30 days |
| Inappropriate content | Síndico can remove, flag for review |
| Multiple identical ads | Limit 1 active per user per week |

---

## 4. Doorman Journeys

### 4.1 Journey: Register Delivery

| Actor | Pedro (Porteiro) |
|-------|-----------------|
| Trigger | Delivery courier arrives at building |
| Success | Delivery logged, resident notified |
| Value | Paperless process, instant notification |

#### Step-by-Step Flow

| Step | Action | System Response | Timeout |
|------|--------|----------------|---------|
| 1 | Open Doorman App | Login screen | 2s |
| 2 | Authenticate (password) | Dashboard loads | 3s |
| 3 | Tap "Nova Entrega" | Registration form | 1s |
| 4 | Scan or type tracking number | Auto-populate courier | 3s |
| 5 | Select unit (autocomplete) | Shows unit 204 - Maria Santos | 2s |
| 6 | Add photo (optional) | Camera opens, uploads | 5s |
| 7 | Tap "Registrar" | Validates, saves | 3s |
| 8 | Success toast | "Entrega registrada para Apt 204" | 2s |
| 9 | Notification sent | Resident gets push | 5s |

#### Key Performance Indicators

| Metric | Target | Threshold |
|--------|--------|-----------|
| Registration time | <30 seconds | <60 seconds |
| Notification latency | <5 seconds | <10 seconds |
| Search accuracy | <3 results shown | First result correct |
| Photo upload | <5 seconds | <15 seconds |

---

### 4.2 Journey: Find Resident

| Actor | Pedro (Porteiro) |
|-------|-----------------|
| Trigger | Visitor asks for apartment number |
| Success | Resident found, visitor directed |
| Value | Quick assistance, no delays |

#### Step-by-Step Flow

| Step | Action | System Response | Timeout |
|------|--------|----------------|---------|
| 1 | Tap "Buscar Morador" | Search screen | 1s |
| 2 | Type name or phone | Live results appear | 1s |
| 3 | See results with unit | Shows: Name, Apt, Photo | 1s |
| 4 | Tap to view details | Full resident card | 1s |

#### Search Performance

```sql
-- Step 2: Search query (PostgreSQL text search)
SELECT
  m.id,
  m.nome,
  m.unidade_numero,
  m.foto_url,
  ts_rank(busca_text, plainto_tsquery('portuguese', :query)) as rank
FROM moradores m
WHERE m.condominio_id = :condominio_id
  AND busca_text @@ plainto_tsquery('portuguese', :query)
ORDER BY rank DESC
LIMIT 10;
```

---

## 5. Administrator Journeys

### 5.1 Journey: Create Bulk Announcement

| Actor | Dona Glória (Síndica) |
|-------|-|
| Trigger | Need to notify all 120 residents of assembly |
| Success | All residents receive notification |
| Value | No manual phone calls, audit trail exists |

#### Step-by-Step Flow

| Step | Action | System Response | Timeout |
|------|--------|----------------|---------|
| 1 | Login to Admin Panel | Dashboard | 3s |
| 2 | Navigate to Avisos | List view | 2s |
| 3 | Tap "Novo Aviso" | Form | 1s |
| 4 | Compose message | Rich text editor | — |
| 5 | Set priority | Normal/Importante/Urgente | 1s |
| 6 | Select recipients | All/Sindico/Porteiro/Especific unit | 2s |
| 7 | Set expiration | Defaults to 7 days | 1s |
| 8 | Preview | Shows how it appears | 1s |
| 9 | Publish | Saves, sends notifications | 5s |
| 10 | View delivery status | Shows read count | 2s |

---

### 5.2 Journey: Manage Resident Move-In

| Actor | Dona Glória (Síndica) |
|-------|-|
| Trigger | New resident moving into Apt 304 |
| Success | Account created, access granted |
| Value | Automated onboarding |

#### Step-by-Step Flow

| Step | Action | System Response | Timeout |
|------|--------|----------------|---------|
| 1 | Navigate to Moradores | List view | 2s |
| 2 | Tap "+ Novo Morador" | Form | 1s |
| 3 | Enter: name, CPF, phone, email | Form validates | — |
| 4 | Select unit | Dropdown (Apt 304 available) | 1s |
| 5 | Set move-in date | Calendar picker | 1s |
| 6 | Create login | Sends invitation email | 3s |
| 7 | Account created | Shows in list | 1s |
| 8 | Auto-Welcome message | Sent via app | 5s |

---

## 6. Cross-Flow Journeys

### 6.1 Journey: Contact via WhatsApp

| Actors | Maria → Dona Glória |
|--------|-----------------|
| Trigger | Maria needs to report water leak |
| Success | Opens WhatsApp with Síndico |
| Value | No searching for phone numbers |

#### Technical Details

```typescript
// WhatsApp Deep Link generation
const whatsappLink = `https://wa.me/${condominio.whatsapp_sindico}?text=${encodeURIComponent(
  'Olá Síndica, preciso falar sobre o Apt 204 - Vazamento no banheiro'
)}`;
```

---

## 7. Error Handling Matrix

| Error | User Message | Recovery Action |
|-------|--------------|----------------|
| Delivery already registered | "Esta entrega já foi registrada" | Offer edit |
| Reservation conflict | "Horário já reservado" | Show alternatives |
| Network offline | "Sem conexão. Dados serão salvos." | Queue for sync |
| Session expired | "Sua sessão expirou. Faça login novamente." | Auto-redirect to login |
| Permission denied | "Você não tem acesso a esta função" | Contact Síndico |