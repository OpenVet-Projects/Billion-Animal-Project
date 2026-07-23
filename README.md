# The Billion Animal Study

**Gather the medical records of one billion animals — so animals live longer, healthier lives.**

Site for [billionanimals.org](https://www.billionanimals.org).

## Develop

```bash
npm install
npm run dev
```

## Waitlist (Supabase) — what you do

No webhook. Emails go into your existing Supabase project.

1. In Supabase → **SQL** → run `supabase/waitlist.sql`
2. In Vercel (or local `.env`) set:

```bash
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Use the **service role** key (server only — never in the browser).

3. Redeploy. Submit the form once. Check table `public.study_waitlist`.

## Stack

React Router 8 · Vite · TypeScript · Supabase waitlist

## Contact

hello@billionanimals.org
