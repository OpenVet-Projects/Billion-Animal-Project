# Billion Animals

**An OpenVet initiative for a billion animals with better medical histories and longer, healthier lives.**

Site for [billionanimals.org](https://www.billionanimals.org).

## Develop

```bash
npm install
npm run dev
```

## "Be part of it" form (Supabase): what you do

No webhook. Submissions go into the **dev** Supabase project:

`https://zgrktbhvjgzeidvtvbxz.supabase.co`

1. In Supabase → **SQL** → run `supabase/waitlist.sql`. It is idempotent: it
   creates `public.study_waitlist` if missing, and otherwise adds the `name` and
   `contribution` columns and widens the allowed roles to
   `clinic · vet · owner · researcher · organization · other`.
2. Add **only this** env var on Vercel (Production + Preview) and local `.env`:

```bash
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

Get it from Supabase → Project Settings → API → `service_role` (secret).
Never put it in the browser.

3. Redeploy. Submit the form once. Check table `public.study_waitlist`.

## Stack

React Router 8 · Vite · TypeScript · Supabase

## Contact

hello@billionanimals.org
