# Edge Functions

Serverless functions with Deno.

```typescript
// functions/send-push/index.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )
  
  const { user_id, title, body, data } = await req.json()
  
  // Send notification
  await supabase.from('notificacoes').insert({
    user_id,
    tipo: 'push',
    titulo: title,
    corpo: body,
    dados: data
  })
  
  return new Response(JSON.stringify({ success: true }))
})
```

Create in `supabase/functions/` directory.