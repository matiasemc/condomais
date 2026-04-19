# Deployment

## 1. Frontend Deploy

```bash
# Vercel (recommended for Angular)
vercel deploy --prod

# Or Netlify
netlify deploy --prod
```

## 2. Backend Deploy

```bash
# Supabase
supabase db push
supabase functions deploy
```