# Table: reservas

## 1. Objective

Define the `reservas` table for amenity booking system in condominiums.

## 2. Scope

- Equipment/amenity reservation
- Time slot management
- Conflict prevention
- Google Calendar integration

---

## 3. Step-by-Step Implementation

### Step 1: Create the Table

```sql
CREATE TABLE reservas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  condominio_id UUID REFERENCES condominios(id) NOT NULL,
  equipamento_id UUID REFERENCES equipamentos(id) NOT NULL,
  morador_id UUID REFERENCES usuarios(id) NOT NULL,
  
  data DATE NOT NULL,
  hora_inicio TIME NOT NULL,
  hora_fim TIME NOT NULL,
  
  motivo TEXT,
  num_convidados INTEGER,
  
  status VARCHAR(20) DEFAULT 'confirmada'
    CHECK (status IN ('confirmada', 'cancelada', 'realizada', 'nao_compareceu')),
  
  google_event_id TEXT,
  google_calendar_id TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ,
  
  UNIQUE(equipamento_id, data, hora_inicio)
);

CREATE INDEX idx_reservas_equipamento ON reservas(equipamento_id, data);
CREATE INDEX idx_reservas_morador ON reservas(morador_id);
CREATE INDEX idx_reservas_data ON reservas(data);
```

### Step 2: Enable RLS

```sql
ALTER TABLE reservas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reservas access"
  ON reservas FOR ALL
  USING (
    condominio_id = (SELECT condominio_id FROM usuarios WHERE auth_id = auth.uid())
  );
```

### Step 3: Validation Trigger

```sql
CREATE OR REPLACE FUNCTION validar_reserva()
RETURNS TRIGGER AS $$
DECLARE
  v_conflicts INTEGER;
BEGIN
  -- Check conflicts
  SELECT COUNT(*) INTO v_conflicts
  FROM reservas
  WHERE equipamento_id = NEW.equipamento_id
    AND data = NEW.data
    AND status = 'confirmada'
    AND NEW.hora_inicio < hora_fim AND NEW.hora_fim > hora_inicio
    AND id != COALESCE(NEW.id, '00000000-0000-0000-0000-000000000000');

  IF v_conflicts > 0 THEN
    RAISE EXCEPTION 'Horário já reservado';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_validar_reserva
  BEFORE INSERT OR UPDATE ON reservas
  FOR EACH ROW
  EXECUTE FUNCTION validar_reserva();
```

---

## 4. Technical Details

### 4.1 API Methods

```typescript
interface Reserva {
  id: string;
  condominio_id: string;
  equipamento_id: string;
  morador_id: string;
  data: string;
  hora_inicio: string;
  hora_fim: string;
  motivo: string;
  num_convidados: number;
  status: 'confirmada' | 'cancelada';
}

// Create reservation
async createReserva(data: {
  equipamento_id: string;
  data: string;
  hora_inicio: string;
  hora_fim: string;
  motivo?: string;
  num_convidados?: number;
}): Promise<Reserva> {
  return this.supabase.from('reservas').insert(data).select().single();
}

// Check availability
async checkAvailability(equipamentoId: string, data: string): Promise<TimeSlot[]> {
  // Return available slots for a date
}
```

---

## 5. Dependencies

- condominios (tenant)
- equipamentos (equipment)
- usuarios (morador)