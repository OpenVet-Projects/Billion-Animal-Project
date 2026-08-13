# The Billion Animal Project

**Gather the medical records of one billion animals so animals live longer, healthier lives.**

Site for [billionanimals.org](https://www.billionanimals.org).

## Develop

```bash
npm install
npm run dev
```

## Waitlist (Supabase): what you do

No webhook. Emails go into the **dev** Supabase project:

`https://zgrktbhvjgzeidvtvbxz.supabase.co`

1. In Supabase → **SQL** → run `supabase/waitlist.sql` (once)
2. Add **only this** env var on Vercel (Production + Preview) and local `.env`:

```bash
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Get it from Supabase → Project Settings → API → `service_role` (secret).  
Never put it in the browser.

3. Redeploy. Submit the form once. Check table `public.study_waitlist`.

## Stack

React Router 8 · Vite · TypeScript · Supabase waitlist

## Contact

hello@billionanimals.org
